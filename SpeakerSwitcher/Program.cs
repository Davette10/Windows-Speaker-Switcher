namespace SpeakerSwitcher;

internal static class Program
{
    [STAThread]
    private static void Main()
    {
        // Only one copy runs at a time. Starting the exe again just opens the settings window.
        using var showSettings = new EventWaitHandle(false, EventResetMode.AutoReset,
            @"Local\SpeakerSwitcher_ShowSettings", out bool isFirstInstance);
        if (!isFirstInstance)
        {
            showSettings.Set();
            return;
        }

        ApplicationConfiguration.Initialize();
        using var app = new TrayApp(showSettings);
        Application.Run(app);
    }
}
