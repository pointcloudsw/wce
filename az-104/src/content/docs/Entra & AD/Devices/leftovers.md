---
title: Leftovers
---

### Entra-AD Hybrid Joined

### Configurable settings for Entra/AD devices
[Entra Devices - Configure Device Settings](https://learn.microsoft.com/en-us/entra/identity/devices/manage-device-identities#configure-device-settings)


##### Microsoft Entra registered
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

Feature Summary
---
#### Microsoft Entra registered
| Item | Description |
| ---: | :--- |
| **Applicable To** | BYOD<br /> Mobile Devices |
| **Device Ownership** | User<br />Organization |
| **Min Rqd OS** | Win10<br />macOS 10.15<br />iOS 15<br />Android<br />Ubuntu 20/22.04 LTS<br />RHEL 8/9 LTS |
| **Enabled via** | Windows: Settings<br />Android/iOS: Company Portal or Microsoft Authenticator app<br />macOS: Company Portal<br />Linux:  Intune Agent |
| **Signin via** | End-user local credentials<br />Password<br />Windows Hello<br />PIN<br />Biometrics or pattern for other devices |
| **Enables** | <ul style="padding-left: 2ch;"><li>Single sign-on (SSO) to cloud resources</li><li>Conditional Access when enrolled into Intune</li><li>Conditional Access via App protection policy</li><li>Enables Phone sign in with Microsoft Authenticator app</li></ul> |

##### Microsoft Entra hybrid joined
Microsoft Entra hybrid joined devices.


Feature Summary
---
#### Microsoft Entra hybrid joined
| Item | Description |
| ---: | :--- |
| **Applicable To** | All end users in the organization<br /> End users in hybrid organizations with existing on-premises Microsoft Windows Server Active Directory infrastructure |
| **Device Ownership** | Organization |
| **Min Rqd OS** | Win10<br />Windows Server 2016 |
| **Enabled via** | Windows<br />Domain join by IT and autojoin via Microsoft Entra Connect or AD FS config<br />Domain join by Windows Autopilot and autojoin via Microsoft Entra Connect or AD FS config |
| **Signin via** | Organizational accounts using Password<br />Organizational accounts using Passwordless options such as Windows Hello for Business and FIDO2.0 security keys |
| **Device management** | [Group Policy](https://learn.microsoft.com/en-us/mem/configmgr/comanage/faq#my-environment-has-too-many-group-policy-objects-and-legacy-authenticated-apps--do-i-have-to-use-hybrid-azure-ad-)<br />[Configuration Manager standalone or co-management with Microsoft Intune](https://learn.microsoft.com/en-us/mem/configmgr/comanage/overview) |
| **Enables** | <ul style="padding-left: 2ch;"><li>Single sign-on (SSO) to resources both in the cloud and on-prem</li><li>Conditional Access through Domain join or through Intune, if co-managed</li><li>[Self-service Password Reset and Windows Hello PIN reset on lock screen](https://learn.microsoft.com/en-us/entra/identity/authentication/howto-sspr-windows)</li></ul> |



##### Microsoft Entra joined
Microsoft Entra joined devices.

Feature Summary
---
#### Microsoft Entra hybrid joined
| Item | Description |
| ---: | :--- |
| **Applicable To** | All end users in the organization<br /> End users in hybrid organizations with existing on-premises Microsoft Windows Server Active Directory infrastructure |
| **Device Ownership** | Organization |
| **Min Rqd OS** | Win10<br />Windows Server 2016 |
| **Enabled via** | Windows<br />Domain join by IT and autojoin via Microsoft Entra Connect or AD FS config<br />Domain join by Windows Autopilot and autojoin via Microsoft Entra Connect or AD FS config |
| **Signin via** | Organizational accounts using Password<br />Organizational accounts using Passwordless options such as Windows Hello for Business and FIDO2.0 security keys |
| **Device management** | [Group Policy](https://learn.microsoft.com/en-us/mem/configmgr/comanage/faq#my-environment-has-too-many-group-policy-objects-and-legacy-authenticated-apps--do-i-have-to-use-hybrid-azure-ad-)<br />[Configuration Manager standalone or co-management with Microsoft Intune](https://learn.microsoft.com/en-us/mem/configmgr/comanage/overview) |
| **Enables** | <ul style="padding-left: 2ch;"><li>Single sign-on (SSO) to resources both in the cloud and on-prem</li><li>Conditional Access through Domain join or through Intune, if co-managed</li><li>[Self-service Password Reset and Windows Hello PIN reset on lock screen](https://learn.microsoft.com/en-us/entra/identity/authentication/howto-sspr-windows)</li></ul> |
