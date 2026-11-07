namespace SpeakerSwitcher;

/// <summary>The window where you pick your 4 speakers. Slots 3 and 4 can be set to "None".</summary>
public sealed class SettingsForm : Form
{
    private sealed class DeviceItem
    {
        public DeviceItem(string? id, string text)
        {
            Id = id;
            Text = text;
        }

        public string? Id { get; }
        public string Text { get; }
        public override string ToString() => Text;
    }

    private const string NoneText = "(None)";

    private readonly AppSettings _settings;
    private readonly ComboBox[] _combos = new ComboBox[AppSettings.SlotCount];
    private readonly CheckBox _startWithWindows = new() { Text = "Start Speaker Switcher when Windows starts", AutoSize = true };
    private readonly CheckBox _showPopup = new() { Text = "Show a popup when I switch", AutoSize = true };

    /// <summary>Raised after the user clicks Save.</summary>
    public event EventHandler? Saved;

    public SettingsForm(AppSettings settings, Icon? icon)
    {
        _settings = settings;

        Text = "Speaker Switcher - Settings";
        if (icon != null)
            Icon = icon;
        Font = new Font("Segoe UI", 10f);
        AutoScaleMode = AutoScaleMode.Dpi;
        FormBorderStyle = FormBorderStyle.FixedDialog;
        MaximizeBox = false;
        MinimizeBox = false;
        StartPosition = FormStartPosition.CenterScreen;
        AutoSize = true;
        AutoSizeMode = AutoSizeMode.GrowAndShrink;

        var root = new TableLayoutPanel
        {
            ColumnCount = 1,
            AutoSize = true,
            AutoSizeMode = AutoSizeMode.GrowAndShrink,
            Location = Point.Empty,
            Padding = new Padding(16),
        };

        root.Controls.Add(new Label
        {
            Text = "Pick your speakers below.\nPress  Alt + A  anywhere to switch to the next one.",
            AutoSize = true,
            Font = new Font("Segoe UI Semibold", 11f),
            Margin = new Padding(0, 0, 0, 12),
        });

        var grid = new TableLayoutPanel
        {
            ColumnCount = 3,
            AutoSize = true,
            AutoSizeMode = AutoSizeMode.GrowAndShrink,
            Margin = new Padding(0, 0, 0, 8),
        };
        grid.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        grid.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        grid.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));

        for (int i = 0; i < AppSettings.SlotCount; i++)
        {
            int slot = i;
            grid.Controls.Add(new Label
            {
                Text = $"Speaker {i + 1}:",
                AutoSize = true,
                Anchor = AnchorStyles.Left,
                Margin = new Padding(0, 6, 8, 6),
            }, 0, i);

            var combo = new ComboBox
            {
                DropDownStyle = ComboBoxStyle.DropDownList,
                Width = 360,
                Margin = new Padding(0, 4, 8, 4),
            };
            _combos[i] = combo;
            grid.Controls.Add(combo, 1, i);

            var test = new Button { Text = "Use now", AutoSize = true, Margin = new Padding(0, 3, 0, 3) };
            test.Click += (_, _) => UseNow(slot);
            grid.Controls.Add(test, 2, i);
        }
        root.Controls.Add(grid);

        root.Controls.Add(new Label
        {
            Text = "Speakers 3 and 4 are optional - set them to (None) if you only have 2 or 3.",
            AutoSize = true,
            ForeColor = SystemColors.GrayText,
            Margin = new Padding(0, 0, 0, 10),
        });

        var refresh = new Button { Text = "Refresh speaker list", AutoSize = true, Margin = new Padding(0, 0, 0, 12) };
        refresh.Click += (_, _) => FillCombos(keepCurrentSelection: true);
        root.Controls.Add(refresh);

        _startWithWindows.Margin = new Padding(0, 0, 0, 4);
        _showPopup.Margin = new Padding(0, 0, 0, 12);
        root.Controls.Add(_startWithWindows);
        root.Controls.Add(_showPopup);

        root.Controls.Add(new Label
        {
            Text = "Speaker Switcher keeps running in the system tray (by the clock).\nRight-click its icon to open this window again or to exit.",
            AutoSize = true,
            ForeColor = SystemColors.GrayText,
            Margin = new Padding(0, 0, 0, 12),
        });

        var buttons = new FlowLayoutPanel
        {
            FlowDirection = FlowDirection.RightToLeft,
            AutoSize = true,
            AutoSizeMode = AutoSizeMode.GrowAndShrink,
            Dock = DockStyle.Fill,
            Margin = Padding.Empty,
        };
        var cancel = new Button { Text = "Cancel", AutoSize = true, DialogResult = DialogResult.Cancel };
        var save = new Button { Text = "Save", AutoSize = true };
        save.Click += (_, _) => SaveAndClose();
        cancel.Click += (_, _) => Close();
        buttons.Controls.Add(cancel);
        buttons.Controls.Add(save);
        root.Controls.Add(buttons);

        AcceptButton = save;
        CancelButton = cancel;
        Controls.Add(root);

        _showPopup.Checked = _settings.ShowPopup;
        try { _startWithWindows.Checked = AppSettings.StartWithWindows; } catch { /* registry not readable */ }

        FillCombos(keepCurrentSelection: false);
    }

    private void FillCombos(bool keepCurrentSelection)
    {
        List<AudioDevice> devices;
        try
        {
            devices = AudioDevices.GetPlaybackDevices();
        }
        catch (Exception ex)
        {
            MessageBox.Show(this, "Could not read your speakers:\n" + ex.Message, "Speaker Switcher",
                MessageBoxButtons.OK, MessageBoxIcon.Warning);
            devices = new List<AudioDevice>();
        }

        bool firstRun = !AppSettings.Exists && !keepCurrentSelection;

        for (int i = 0; i < AppSettings.SlotCount; i++)
        {
            var combo = _combos[i];
            bool allowNone = i >= 2; // speakers 3 and 4 can be "None"

            string? wantedId;
            string? wantedName;
            if (keepCurrentSelection && combo.SelectedItem is DeviceItem current)
            {
                wantedId = current.Id;
                wantedName = current.Text;
            }
            else if (firstRun)
            {
                // First time: fill the slots with the speakers this PC has.
                wantedId = i < devices.Count ? devices[i].Id : null;
                wantedName = null;
            }
            else
            {
                wantedId = _settings.Slots[i]?.Id;
                wantedName = _settings.Slots[i]?.Name;
            }

            combo.BeginUpdate();
            combo.Items.Clear();
            if (allowNone)
                combo.Items.Add(new DeviceItem(null, NoneText));
            foreach (var d in devices)
                combo.Items.Add(new DeviceItem(d.Id, d.Name));

            // A saved speaker that is unplugged right now: keep it so the choice isn't lost.
            if (wantedId != null && devices.All(d => d.Id != wantedId))
            {
                string name = wantedName ?? "Unknown speaker";
                if (!name.EndsWith(" (not connected)"))
                    name += " (not connected)";
                combo.Items.Add(new DeviceItem(wantedId, name));
            }

            int index = -1;
            for (int k = 0; k < combo.Items.Count; k++)
            {
                if (((DeviceItem)combo.Items[k]!).Id == wantedId)
                {
                    index = k;
                    break;
                }
            }
            if (index < 0 && combo.Items.Count > 0)
                index = allowNone ? 0 : Math.Min(i, combo.Items.Count - 1);
            combo.SelectedIndex = index;
            combo.EndUpdate();
        }
    }

    private void UseNow(int slot)
    {
        if (_combos[slot].SelectedItem is not DeviceItem { Id: not null } item)
            return;
        try
        {
            AudioDevices.SetDefaultPlaybackDevice(item.Id);
        }
        catch (Exception ex)
        {
            MessageBox.Show(this, "Could not switch to that speaker:\n" + ex.Message, "Speaker Switcher",
                MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }
    }

    private void SaveAndClose()
    {
        for (int i = 0; i < AppSettings.SlotCount; i++)
        {
            if (_combos[i].SelectedItem is DeviceItem { Id: not null } item)
            {
                string name = item.Text.EndsWith(" (not connected)")
                    ? item.Text[..^" (not connected)".Length]
                    : item.Text;
                _settings.Slots[i] = new SpeakerSlot { Id = item.Id, Name = name };
            }
            else
            {
                _settings.Slots[i] = null;
            }
        }
        _settings.ShowPopup = _showPopup.Checked;

        try
        {
            _settings.Save();
        }
        catch (Exception ex)
        {
            MessageBox.Show(this, "Could not save settings:\n" + ex.Message, "Speaker Switcher",
                MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        try
        {
            AppSettings.StartWithWindows = _startWithWindows.Checked;
        }
        catch (Exception ex)
        {
            MessageBox.Show(this, "Could not change the start-with-Windows setting:\n" + ex.Message, "Speaker Switcher",
                MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }

        Saved?.Invoke(this, EventArgs.Empty);
        Close();
    }
}
