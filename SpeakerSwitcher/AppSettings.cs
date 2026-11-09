using System.Text.Json;
using Microsoft.Win32;

namespace SpeakerSwitcher;

/// <summary>One of the 4 speaker slots. Null in <see cref="AppSettings.Slots"/> means "None".</summary>
public sealed class SpeakerSlot
{
    public string Id { get; set; } = "";
    public string Name { get; set; } = "";
}

/// <summary>Saved in %APPDATA%\SpeakerSwitcher\settings.json</summary>
public sealed class AppSettings
{
    public const int SlotCount = 4;

    public SpeakerSlot?[] Slots { get; set; } = new SpeakerSlot?[SlotCount];
    public bool ShowPopup { get; set; } = true;

    private static string Folder =>
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "SpeakerSwitcher");

    private static string FilePath => Path.Combine(Folder, "settings.json");

    public static bool Exists => File.Exists(FilePath);

    public static AppSettings Load()
    {
        try
        {
            if (File.Exists(FilePath))
            {
                var loaded = JsonSerializer.Deserialize<AppSettings>(File.ReadAllText(FilePath));
                if (loaded != null)
                {
                    if (loaded.Slots.Length != SlotCount)
                    {
                        var fixedSlots = new SpeakerSlot?[SlotCount];
                        Array.Copy(loaded.Slots, fixedSlots, Math.Min(SlotCount, loaded.Slots.Length));
                        loaded.Slots = fixedSlots;
                    }
                    return loaded;
                }
            }
        }
        catch
        {
            // Broken file: fall back to defaults.
        }
        return new AppSettings();
    }

    public void Save()
    {
        Directory.CreateDirectory(Folder);
        File.WriteAllText(FilePath, JsonSerializer.Serialize(this, new JsonSerializerOptions { WriteIndented = true }));
    }

    // ---------- Start with Windows (HKCU Run key) ----------

    private const string RunKeyPath = @"Software\Microsoft\Windows\CurrentVersion\Run";
    private const string RunValueName = "SpeakerSwitcher";

    public static bool StartWithWindows
    {
        get
        {
            using var key = Registry.CurrentUser.OpenSubKey(RunKeyPath);
            return key?.GetValue(RunValueName) != null;
        }
        set
        {
            using var key = Registry.CurrentUser.CreateSubKey(RunKeyPath);
            if (value)
                key.SetValue(RunValueName, $"\"{Environment.ProcessPath ?? Application.ExecutablePath}\"");
            else
                key.DeleteValue(RunValueName, throwOnMissingValue: false);
        }
    }
}
