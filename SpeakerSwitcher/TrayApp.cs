namespace SpeakerSwitcher;

/// <summary>Runs in the system tray, listens for Alt+A and switches speakers.</summary>
public sealed class TrayApp : ApplicationContext
{
    private readonly AppSettings _settings;
    private readonly Icon _icon;
    private readonly NotifyIcon _tray;
    private readonly HotkeyWindow _hotkey;
    private readonly SwitchPopup _popup;
    private readonly Control _invoker;
    private SettingsForm? _settingsForm;

    public TrayApp(EventWaitHandle showSettingsSignal)
    {
        _settings = AppSettings.Load();
        _icon = LoadIcon();

        _invoker = new Control();
        _ = _invoker.Handle; // create the handle so BeginInvoke works

        _popup = new SwitchPopup();

        _tray = new NotifyIcon
        {
            Icon = _icon,
            Text = "Speaker Switcher (Alt+A)",
            Visible = true,
            ContextMenuStrip = new ContextMenuStrip(),
        };
        _tray.ContextMenuStrip.Opening += (_, _) => BuildMenu();
        _tray.MouseDoubleClick += (_, e) =>
        {
            if (e.Button == MouseButtons.Left)
                ShowSettings();
        };
        BuildMenu();

        _hotkey = new HotkeyWindow();
        _hotkey.Pressed += (_, _) => SwitchToNext();
        if (!_hotkey.Register(HotkeyWindow.MOD_ALT, Keys.A))
        {
            MessageBox.Show(
                "Alt+A is already being used by another program, so it can't be used to switch speakers.\n\n" +
                "Close the other program and restart Speaker Switcher. You can still switch by clicking the tray icon.",
                "Speaker Switcher", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }

        // Another copy of the exe was started: just open the settings window here.
        ThreadPool.RegisterWaitForSingleObject(showSettingsSignal,
            (_, _) => _invoker.BeginInvoke(ShowSettings), null, Timeout.Infinite, executeOnlyOnce: false);

        UpdateTooltip();

        if (!AppSettings.Exists)
            ShowSettings();
    }

    /// <summary>The speakers you picked, in order, skipping "None".</summary>
    private List<SpeakerSlot> ConfiguredSlots() =>
        _settings.Slots.Where(s => s != null && !string.IsNullOrEmpty(s.Id)).Select(s => s!).ToList();

    private void SwitchToNext()
    {
        try
        {
            var connectedIds = AudioDevices.GetPlaybackDevices().Select(d => d.Id).ToHashSet();
            var slots = ConfiguredSlots();
            var available = slots.Where(s => connectedIds.Contains(s.Id)).ToList();

            if (available.Count == 0)
            {
                ShowPopup("Speaker Switcher",
                    slots.Count == 0 ? "No speakers picked yet - opening settings" : "None of your speakers are connected");
                if (slots.Count == 0)
                    ShowSettings();
                return;
            }

            string? currentId = AudioDevices.GetDefaultPlaybackDeviceId();
            int currentIndex = available.FindIndex(s => s.Id == currentId);
            var next = available[(currentIndex + 1) % available.Count];

            AudioDevices.SetDefaultPlaybackDevice(next.Id);

            int slotNumber = Array.FindIndex(_settings.Slots, s => s?.Id == next.Id) + 1;
            ShowPopup($"Speaker {slotNumber}", next.Name);
            UpdateTooltip();
        }
        catch (Exception ex)
        {
            ShowPopup("Couldn't switch speakers", ex.Message);
        }
    }

    private void SwitchTo(SpeakerSlot slot, int slotNumber)
    {
        try
        {
            AudioDevices.SetDefaultPlaybackDevice(slot.Id);
            ShowPopup($"Speaker {slotNumber}", slot.Name);
            UpdateTooltip();
        }
        catch (Exception ex)
        {
            ShowPopup("Couldn't switch speakers", ex.Message);
        }
    }

    private void ShowPopup(string title, string text)
    {
        if (_settings.ShowPopup)
            _popup.ShowMessage(title, text);
    }

    private void BuildMenu()
    {
        var menu = _tray.ContextMenuStrip!;
        menu.Items.Clear();

        string? currentId = null;
        HashSet<string> connected = new();
        try
        {
            currentId = AudioDevices.GetDefaultPlaybackDeviceId();
            connected = AudioDevices.GetPlaybackDevices().Select(d => d.Id).ToHashSet();
        }
        catch
        {
            // ignore: menu just won't show check marks
        }

        for (int i = 0; i < AppSettings.SlotCount; i++)
        {
            var slot = _settings.Slots[i];
            int number = i + 1;
            if (slot == null)
            {
                menu.Items.Add(new ToolStripMenuItem($"Speaker {number}: (None)") { Enabled = false });
                continue;
            }

            bool isConnected = connected.Contains(slot.Id);
            var item = new ToolStripMenuItem($"Speaker {number}: {slot.Name}" + (isConnected ? "" : " (not connected)"))
            {
                Checked = slot.Id == currentId,
                Enabled = isConnected,
            };
            item.Click += (_, _) => SwitchTo(slot, number);
            menu.Items.Add(item);
        }

        menu.Items.Add(new ToolStripSeparator());
        menu.Items.Add(new ToolStripMenuItem("Switch to next   (Alt+A)", null, (_, _) => SwitchToNext()));
        menu.Items.Add(new ToolStripMenuItem("Pick speakers...", null, (_, _) => ShowSettings()) { Font = new Font(menu.Font, FontStyle.Bold) });
        menu.Items.Add(new ToolStripSeparator());
        menu.Items.Add(new ToolStripMenuItem("Exit", null, (_, _) => ExitThread()));
    }

    private void UpdateTooltip()
    {
        string text = "Speaker Switcher (Alt+A)";
        try
        {
            string? id = AudioDevices.GetDefaultPlaybackDeviceId();
            var name = AudioDevices.GetPlaybackDevices().FirstOrDefault(d => d.Id == id)?.Name;
            if (name != null)
                text += "\nNow: " + name;
        }
        catch
        {
            // ignore
        }
        // NotifyIcon tooltips are limited to 127 characters.
        _tray.Text = text.Length > 127 ? text[..127] : text;
    }

    private void ShowSettings()
    {
        if (_settingsForm != null && !_settingsForm.IsDisposed)
        {
            _settingsForm.WindowState = FormWindowState.Normal;
            _settingsForm.Activate();
            return;
        }

        _settingsForm = new SettingsForm(_settings, _icon);
        _settingsForm.Saved += (_, _) =>
        {
            BuildMenu();
            UpdateTooltip();
        };
        _settingsForm.FormClosed += (_, _) => _settingsForm = null;
        _settingsForm.Show();
        _settingsForm.Activate();
    }

    private static Icon LoadIcon()
    {
        using var stream = typeof(TrayApp).Assembly.GetManifestResourceStream("SpeakerSwitcher.app.ico");
        return stream != null ? new Icon(stream) : (Icon)SystemIcons.Application.Clone();
    }

    protected override void ExitThreadCore()
    {
        _tray.Visible = false;
        _hotkey.Dispose();
        _settingsForm?.Close();
        _popup.Close();
        base.ExitThreadCore();
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            _tray.Dispose();
            _popup.Dispose();
            _invoker.Dispose();
            _icon.Dispose();
        }
        base.Dispose(disposing);
    }
}
