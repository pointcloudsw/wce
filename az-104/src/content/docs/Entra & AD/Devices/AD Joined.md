---
title: Active Directory Joined Devices
---

##### Microsoft Active Directory Domain Services joined device

- [Microsoft Entra joined](#microsoft-entra-joined) -- Device is **joined** only to Microsoft Entra ID *requiring organizational account to sign in to the device*

![Active Directory-joined]("/src/assets/Entra & AD/azure-ad-joined-device.png")


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

