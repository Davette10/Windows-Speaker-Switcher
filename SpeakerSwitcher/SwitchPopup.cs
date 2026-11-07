namespace SpeakerSwitcher;

/// <summary>Small on-screen popup that shows which speaker you just switched to. Never steals focus.</summary>
public sealed class SwitchPopup : Form
{
    private readonly Label _title = new();
    private readonly Label _name = new();
    private readonly System.Windows.Forms.Timer _hideTimer = new() { Interval = 1600 };

    public SwitchPopup()
    {
        FormBorderStyle = FormBorderStyle.None;
        StartPosition = FormStartPosition.Manual;
        ShowInTaskbar = false;
        BackColor = Color.FromArgb(32, 32, 36);
        AutoScaleMode = AutoScaleMode.Dpi;
        AutoSize = true;
        AutoSizeMode = AutoSizeMode.GrowAndShrink;

        var layout = new FlowLayoutPanel
        {
            FlowDirection = FlowDirection.TopDown,
            WrapContents = false,
            AutoSize = true,
            AutoSizeMode = AutoSizeMode.GrowAndShrink,
            Padding = new Padding(18, 10, 18, 12),
            Margin = Padding.Empty,
            BackColor = BackColor,
        };

        _title.AutoSize = true;
        _title.ForeColor = Color.FromArgb(160, 190, 255);
        _title.Font = new Font("Segoe UI", 9f);
        _title.Margin = new Padding(0, 0, 0, 2);

        _name.AutoSize = true;
        _name.ForeColor = Color.White;
        _name.Font = new Font("Segoe UI Semibold", 14f);
        _name.MaximumSize = new Size(600, 0);
        _name.Margin = Padding.Empty;

        layout.Controls.Add(_title);
        layout.Controls.Add(_name);
        Controls.Add(layout);

        _hideTimer.Tick += (_, _) =>
        {
            _hideTimer.Stop();
            Hide();
        };
    }

    protected override bool ShowWithoutActivation => true;

    protected override CreateParams CreateParams
    {
        get
        {
            const int WS_EX_TOPMOST = 0x00000008;
            const int WS_EX_TOOLWINDOW = 0x00000080;
            const int WS_EX_NOACTIVATE = 0x08000000;
            var cp = base.CreateParams;
            cp.ExStyle |= WS_EX_TOPMOST | WS_EX_TOOLWINDOW | WS_EX_NOACTIVATE;
            return cp;
        }
    }

    public void ShowMessage(string title, string text)
    {
        _title.Text = title;
        _name.Text = text;
        PerformLayout();

        if (!Visible)
            Show();
        PerformLayout();

        // Bottom-center of the screen the mouse is on.
        var area = Screen.FromPoint(Cursor.Position).WorkingArea;
        Location = new Point(area.Left + (area.Width - Width) / 2, area.Bottom - Height - 80);
        _hideTimer.Stop();
        _hideTimer.Start();
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing)
            _hideTimer.Dispose();
        base.Dispose(disposing);
    }
}
