using System.Runtime.InteropServices;

namespace SpeakerSwitcher;

/// <summary>A playback (output) device, e.g. speakers or headphones.</summary>
public sealed record AudioDevice(string Id, string Name);

/// <summary>
/// Lists Windows playback devices and changes the default one.
/// Uses the Core Audio COM API (IMMDeviceEnumerator) to list devices and
/// IPolicyConfig (the same interface the Windows Sound control panel uses) to set the default.
/// </summary>
public static class AudioDevices
{
    public static List<AudioDevice> GetPlaybackDevices()
    {
        var result = new List<AudioDevice>();
        var enumerator = CreateEnumerator();
        try
        {
            enumerator.EnumAudioEndpoints(EDataFlow.Render, DEVICE_STATE_ACTIVE, out var collection);
            collection.GetCount(out uint count);
            for (uint i = 0; i < count; i++)
            {
                collection.Item(i, out var device);
                try
                {
                    device.GetId(out string id);
                    result.Add(new AudioDevice(id, GetFriendlyName(device) ?? id));
                }
                finally
                {
                    Marshal.ReleaseComObject(device);
                }
            }
            Marshal.ReleaseComObject(collection);
        }
        finally
        {
            Marshal.ReleaseComObject(enumerator);
        }
        return result.OrderBy(d => d.Name, StringComparer.CurrentCultureIgnoreCase).ToList();
    }

    /// <summary>Returns the id of the current default playback device, or null if there is none.</summary>
    public static string? GetDefaultPlaybackDeviceId()
    {
        var enumerator = CreateEnumerator();
        try
        {
            enumerator.GetDefaultAudioEndpoint(EDataFlow.Render, ERole.Multimedia, out var device);
            try
            {
                device.GetId(out string id);
                return id;
            }
            finally
            {
                Marshal.ReleaseComObject(device);
            }
        }
        catch (COMException)
        {
            return null; // no playback device at all
        }
        finally
        {
            Marshal.ReleaseComObject(enumerator);
        }
    }

    /// <summary>Makes the given device the default for everything (games, music, calls).</summary>
    public static void SetDefaultPlaybackDevice(string deviceId)
    {
        var policy = (IPolicyConfig)new PolicyConfigClient();
        try
        {
            policy.SetDefaultEndpoint(deviceId, ERole.Console);
            policy.SetDefaultEndpoint(deviceId, ERole.Multimedia);
            policy.SetDefaultEndpoint(deviceId, ERole.Communications);
        }
        finally
        {
            Marshal.ReleaseComObject(policy);
        }
    }

    private static IMMDeviceEnumerator CreateEnumerator() => (IMMDeviceEnumerator)new MMDeviceEnumerator();

    private static string? GetFriendlyName(IMMDevice device)
    {
        device.OpenPropertyStore(STGM_READ, out var store);
        try
        {
            var key = PKEY_Device_FriendlyName;
            store.GetValue(ref key, out var value);
            try
            {
                return value.vt == VT_LPWSTR ? Marshal.PtrToStringUni(value.pointerValue) : null;
            }
            finally
            {
                PropVariantClear(ref value);
            }
        }
        finally
        {
            Marshal.ReleaseComObject(store);
        }
    }

    // ---------- COM interop ----------

    private const uint DEVICE_STATE_ACTIVE = 0x1;
    private const uint STGM_READ = 0x0;
    private const ushort VT_LPWSTR = 31;

    private static readonly PROPERTYKEY PKEY_Device_FriendlyName =
        new() { fmtid = new Guid("a45c254e-df1c-4efd-8020-67d146a850e0"), pid = 14 };

    private enum EDataFlow { Render = 0, Capture = 1, All = 2 }

    private enum ERole { Console = 0, Multimedia = 1, Communications = 2 }

    [StructLayout(LayoutKind.Sequential)]
    private struct PROPERTYKEY
    {
        public Guid fmtid;
        public uint pid;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct PROPVARIANT
    {
        public ushort vt;
        public ushort reserved1;
        public ushort reserved2;
        public ushort reserved3;
        public IntPtr pointerValue;
        public IntPtr extra;
    }

    [DllImport("ole32.dll")]
    private static extern int PropVariantClear(ref PROPVARIANT pvar);

    [ComImport, Guid("BCDE0395-E52F-467C-8E3D-C4579291692E")]
    private class MMDeviceEnumerator { }

    [ComImport, Guid("870AF99C-171D-4F9E-AF0D-E63DF40C2BC9")]
    private class PolicyConfigClient { }

    [ComImport, Guid("A95664D2-9614-4F35-A746-DE8DB63617E6"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    private interface IMMDeviceEnumerator
    {
        void EnumAudioEndpoints(EDataFlow dataFlow, uint stateMask, out IMMDeviceCollection devices);
        void GetDefaultAudioEndpoint(EDataFlow dataFlow, ERole role, out IMMDevice endpoint);
        void GetDevice([MarshalAs(UnmanagedType.LPWStr)] string id, out IMMDevice device);
        void RegisterEndpointNotificationCallback(IntPtr client);
        void UnregisterEndpointNotificationCallback(IntPtr client);
    }

    [ComImport, Guid("0BD7A1BE-7A1A-44DB-8397-CC5392387B5E"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    private interface IMMDeviceCollection
    {
        void GetCount(out uint count);
        void Item(uint index, out IMMDevice device);
    }

    [ComImport, Guid("D666063F-1587-4E43-81F1-B948E807363F"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    private interface IMMDevice
    {
        void Activate(ref Guid iid, uint clsCtx, IntPtr activationParams, [MarshalAs(UnmanagedType.IUnknown)] out object instance);
        void OpenPropertyStore(uint access, out IPropertyStore properties);
        void GetId([MarshalAs(UnmanagedType.LPWStr)] out string id);
        void GetState(out uint state);
    }

    [ComImport, Guid("886D8EEB-8CF2-4446-8D02-CDBA1DBDCF99"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    private interface IPropertyStore
    {
        void GetCount(out uint count);
        void GetAt(uint index, out PROPERTYKEY key);
        void GetValue(ref PROPERTYKEY key, out PROPVARIANT value);
        void SetValue(ref PROPERTYKEY key, ref PROPVARIANT value);
        void Commit();
    }

    // Undocumented but long-stable interface used by the Sound control panel (Windows 7 - 11).
    // Only SetDefaultEndpoint is called; the other slots just keep the vtable order correct.
    [ComImport, Guid("F8679F50-850A-41CF-9C72-430F290290C8"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    private interface IPolicyConfig
    {
        void GetMixFormat();
        void GetDeviceFormat();
        void ResetDeviceFormat();
        void SetDeviceFormat();
        void GetProcessingPeriod();
        void SetProcessingPeriod();
        void GetShareMode();
        void SetShareMode();
        void GetPropertyValue();
        void SetPropertyValue();
        void SetDefaultEndpoint([MarshalAs(UnmanagedType.LPWStr)] string deviceId, ERole role);
        void SetEndpointVisibility();
    }
}
