---
title: PRT Issuance
sidebar:
    order: 832
---
### PRT Issuance Process
Microsoft Entra Device registration is a prerequisite for device based authentication in Microsoft Entra ID. A PRT is issued to users only on registered devices. For more in-depth details on device registration, see the article [Windows Hello for Business and Device Registration](https://learn.microsoft.com/en-us/entra/identity/devices/device-registration-how-it-works). During device registration, the dsreg component generates two sets of cryptographic key pairs:
- Device key (dkpub/dkpriv)
- Transport key (tkpub/tkpriv)
The private keys are bound to the device's TPM if the device has a valid and functioning TPM, while the public keys are sent to Microsoft Entra ID during the device registration process. These keys are used to validate the device state during PRT requests.

:::danger[Notice]
- Microsoft Entra Conditional Access policies are not evaluated when PRTs are issued.
- Issuance and renewal of Microsoft Entra PRTs is performed only by Microsoft, there is no support for third party credential providers to perform these functions
- New PRTs are valid for 14 days and renewed continually thereafter, so long as the user actively uses the device.
:::
The PRT is issued during user authentication on a Windows 10 or newer device in two scenarios:
- **Microsoft Entra registered device**: A PRT is issued when a user adds a secondary work account to their Windows 10 or newer device. Users can add an account to Windows 10 or newer in two different ways:<ul><li>Adding an account via the Allow my organization to manage my device prompt after signing in to an app (for example, Outlook)</li><li>Adding an account from Settings > Accounts > Access Work or School > Connect</li></ul><br>In Microsoft Entra registered device scenarios, the Microsoft Entra WAM plugin is the primary authority for the PRT since Windows logon isn't happening with this Microsoft Entra account.

- **Microsoft Entra joined** or **Microsoft Entra hybrid joined**: A PRT is issued during Windows logon when a user signs in with their organization credentials. A PRT is issued with all Windows 10 or newer supported credentials, for example, password and Windows Hello for Business. In this scenario, Microsoft Entra CloudAP plugin is the primary authority for the PRT.

:::note
- To enable PRT issuance on Win10+ devices, 3<sup>rd</sup>-party IdPs **must support** the **WS-Trust protocol**.  A PRT cannot be issued to Win10+ devices that do not support WS-Trust.
- On AD FS **only usernamemixed endpoints** are required.
- On AD FS, if `smartcard/certificate` is used during Windows sign-in, then `certificatemixed` endpoints are required.
- Both `adfs/services/trust/2005/windowstransport` and `adfs/services/trust/13/windowstransport`
    - should be enabled as **intrAnet** facing endpoints only (internal / trusted only)
    - these must **NOT be exposed** as **extranet** facing endpoints through the Web Application Proxy
:::