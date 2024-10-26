---
title: Microsoft Entra Registration
sidebar:
    order: 811
---

### Overview
[Microsoft Entra registered](https://learn.microsoft.com/en-us/entra/identity/devices/concept-device-registration) - also known as Workplace joined - supports bring your own device (BYOD) and mobile device scenarios, enabling users to access secured resources from their personal devices.

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

### Scenarios
**A user in your organization wishes to access benefits enrollment from their home PC**
<br>
IT implemented a policy that limits access to the beneits site to those on Intune-compliant devices. So, to access benefits from their home PC, the user must:

1. Register their home PC with Microsoft Entra ID
2. Enroll their home PC in Intune
3. Allow IT and Intune to push and apply the required policies to their PC

After enrolling their home PC in Intune, IT then pushes and applies the required policies to the device which then allows the device to be granted access to the benefits site.

**A user wishes to access company email from their personal Android phone, which is rooted**
<br>
IT implemented an Intune device compliance policy that limits access to company email to devices which meet the compliance requirements.  Users wishing to access company email can do so only from devices which are compliant, which excludes rooted devices.  Therefore, rooted devices will be blocked from accessing company email and this user will not be able to access company email from this device until the device has been brought into compliance with the policy.

### The Process
The process for registering a personal device on your organization's network is as follows:
1. Windows registers your device on your organization's network.
2. Optionally, based on your organization's choices, you might be asked to set up two-step verification through either two-factor authentication or security info.
3. Optionally, based on your organization's choices, you might be automatically enrolled in mobile device management, such as Microsoft Intune. For more info about enrolling in Microsoft Intune, see Enroll your device in Intune.
4. You'll go through the sign-in process, using the username and password for your work or school account.

#### The Process for Windows devices
To register your Windows device
1. Open Settings, and then select Accounts.
2. Select Access work or school, and then select Connect from the Access work or school screen.
3. Access work or school screen with Connect option highlighted
4. On the Add a work or school account screen, type in your email address for your work or school account, and then select Next. For example, alain@contoso.com.
5. Sign in to your work or school account, and then select Sign in.
6. Complete the rest of the registration process, including approving your identity verification request (if you use two-step verification) and setting up Windows Hello (if necessary).


### Summary
#### Microsoft Entra registered
| Item | Description |
| ---: | :--- |
| **Applicable To** | BYOD<br /> Mobile Devices |
| **Device Ownership** | User<br />Organization |
| **Min Rqd OS** | Win10<br />macOS 10.15<br />iOS 15<br />Android<br />Ubuntu 20/22.04 LTS<br />RHEL 8/9 LTS |
| **Enabled via** | Windows: Settings<br />Android/iOS: Company Portal or Microsoft Authenticator app<br />macOS: Company Portal<br />Linux:  Intune Agent |
| **Signin via** | End-user local credentials<br />Password<br />Windows Hello<br />PIN<br />Biometrics or pattern for other devices |
| **Enables** | <ul style="padding-left: 2ch;"><li>Single sign-on (SSO) to cloud resources</li><li>Conditional Access when enrolled into Intune</li><li>Conditional Access via App protection policy</li><li>Enables Phone sign in with Microsoft Authenticator app</li></ul> |


### See also
- [Manage device identities](https://learn.microsoft.com/en-us/entra/identity/devices/manage-device-identities)
- [Manage stale devices in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/devices/manage-stale-devices)
- <a href="https://support.microsoft.com/account-billing/register-your-personal-device-on-your-work-or-school-network-8803dd61-a613-45e3-ae6c-bd1ab25bf8a8" target="_blank">Register your personal device on your work or school network</a>