# Speaker Switcher

A tiny Windows app that lets you **switch between up to 4 speakers with `Alt + A`**.

- Pick **Speaker 1** and **Speaker 2** from a drop-down list.
- **Speaker 3** and **Speaker 4** are optional — set them to **(None)** if you don't need them.
- Press **`Alt + A`** anywhere (in a game, browser, anything) to jump to the next speaker:
  1 → 2 → 3 → 4 → 1 … (speakers set to *None* or unplugged are skipped).
- A small popup at the bottom of the screen shows which speaker is now playing.
- Lives in the system tray next to the clock. Right-click the icon to pick a speaker directly, open settings, or exit.
- Optional: start automatically with Windows.

## Download & run

1. Go to the **[Releases](../../releases)** page and download **`SpeakerSwitcher.exe`**.
   (Or: **Actions** tab → latest *Build SpeakerSwitcher.exe* run → **Artifacts** → `SpeakerSwitcher`.)
2. Double-click it. No install and no .NET download needed.
3. If Windows says *"Windows protected your PC"*, click **More info → Run anyway** (the exe just isn't code-signed).
4. The settings window opens the first time — choose your speakers and click **Save**.
5. Press **`Alt + A`** to switch!

To change your speakers later, **double-click the tray icon** (or right-click → *Pick speakers...*),
or just run the exe again.

## How it works

- Speakers are listed with the Windows Core Audio API.
- Switching sets the Windows **default playback device** (for normal sound *and* calls),
  the same thing the Windows Sound settings do.
- Settings are saved to `%APPDATA%\SpeakerSwitcher\settings.json`.
- "Start with Windows" adds an entry under `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`.

## Build it yourself

Needs the [.NET 8 SDK](https://dotnet.microsoft.com/download) on Windows:

```bash
dotnet publish SpeakerSwitcher/SpeakerSwitcher.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -p:EnableCompressionInSingleFile=true -o publish
```

The exe ends up in `publish/SpeakerSwitcher.exe`. Every push to GitHub also builds it automatically
(see `.github/workflows/build.yml`); pushing a tag like `v1.0.0` publishes it as a Release.
