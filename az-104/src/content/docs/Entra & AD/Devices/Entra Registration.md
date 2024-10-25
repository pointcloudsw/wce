---
title: Microsoft Entra Registration
sidebar:
    order: 810
---

### [Microsoft Entra registration](https://learn.microsoft.com/en-us/entra/identity/devices/concept-device-registration)
Microsoft Entra registered - also known as Workplace joined - supports bring your own device (BYOD) and mobile device scenarios, enabling users to access secured resources from their personal devices.

- Microsoft Entra registered devices are signed into using a local account, like a Microsoft account on a Windows 10 or later device.
- These devices have a Microsoft Entra account for access to organizational resources.
- Entra device registration can be accomplished when accessing a work application for the first time or manually using the **Settings menu** in Windows 10, or later
- Access to resources in the organization can be limited based on that Microsoft Entra account.
- Access to resources in the organization can also be limited based on Conditional Access policies applied to the device identity.
- Administrators can also add device enrollment permission to Entra devices
- Users who enroll their device grant their Entra Administrator additional control over their device, including enforcement of device configuration requirements such as storage encryption requirements, password requirements, and software update requirements.

:::caution
Microsoft Entra **registered** is separate from and is a *prerequisite for* Entra **device enrollment**.
:::

### Summary
#### Microsoft Entra registered
| Item | Description |
| ---: | :--- |
| **Applicable To** | BYOD<br /> Mobile Devices |
| **Device Ownership** | User<br />Organization |
| **Min Rqd OS** | Win10<br />macOS 10.15<br />iOS 15<br />Android<br />Ubuntu 20/22.04 LTS<br />RHEL 8/9 LTS |
| **Enabled via** | Windows: Settings<br />Android/iOS: Company Portal or Microsoft Authenticator app<br />macOS: Company Portal<br />Linux:  Intune Agent |
| **Signin via** | End-user local credentials<br />Password<br />Windows Hello<br />PIN<br />Biometrics or pattern for other devices |
| **Enables** | <ul style="padding-left: 2ch;"><li>Single sign-on (SSO) to cloud resources</li><li>Single sign-on (SSO) to cloud resources<li>Single sign-on (SSO) to cloud resources</li><li>Conditional Access when enrolled into Intune</li><li>Conditional Access via App protection policy</li><li>Enables Phone sign in with Microsoft Authenticator app</li></ul> |
