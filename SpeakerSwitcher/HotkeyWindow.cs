using System.Runtime.InteropServices;

namespace SpeakerSwitcher;

/// <summary>Hidden window that receives a global hotkey (works even when the app is in the background).</summary>
public sealed class HotkeyWindow : NativeWindow, IDisposable
{
    public const uint MOD_ALT = 0x0001;
    public const uint MOD_CONTROL = 0x0002;
    public const uint MOD_SHIFT = 0x0004;
    public const uint MOD_WIN = 0x0008;
    private const uint MOD_NOREPEAT = 0x4000;
    private const int WM_HOTKEY = 0x0312;
    private const int HotkeyId = 0x5150;

    private bool _registered;

    public event EventHandler? Pressed;

    public HotkeyWindow()
    {
        CreateHandle(new CreateParams());
    }

    /// <summary>Registers e.g. (MOD_ALT, Keys.A). Returns false if another app already uses that shortcut.</summary>
    public bool Register(uint modifiers, Keys key)
    {
        Unregister();
        _registered = RegisterHotKey(Handle, HotkeyId, modifiers | MOD_NOREPEAT, (uint)key);
        return _registered;
    }

    public void Unregister()
    {
        if (_registered)
        {
            UnregisterHotKey(Handle, HotkeyId);
            _registered = false;
        }
    }

    protected override void WndProc(ref Message m)
    {
        if (m.Msg == WM_HOTKEY && m.WParam.ToInt32() == HotkeyId)
            Pressed?.Invoke(this, EventArgs.Empty);
        base.WndProc(ref m);
    }

    public void Dispose()
    {
        Unregister();
        DestroyHandle();
    }

    [DllImport("user32.dll", SetLastError = true)]
    private static extern bool RegisterHotKey(IntPtr hWnd, int id, uint fsModifiers, uint vk);

    [DllImport("user32.dll", SetLastError = true)]
    private static extern bool UnregisterHotKey(IntPtr hWnd, int id);
}
