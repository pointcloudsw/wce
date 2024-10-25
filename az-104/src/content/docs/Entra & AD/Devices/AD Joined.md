---
title: Microsoft Entra Join
sidebar:
    order: 820
---

### Overview
[Microsoft Entra joined devices](https://learn.microsoft.com/en-us/entra/identity/devices/concept-directory-join)
 -- also known as Active Directory Domain Services joined devices -- can help you to manage devices accessing resources in your environment.  The device is **joined** only to Microsoft Entra ID *requiring organizational account to sign in to the device*

<figure><img src="/src/assets/Entra & AD/azure-ad-joined-device.png" width="400" alt="Entra Joined Device">Entra Join Device</figure>



#### Microsoft Entra join
This device type is joined only to Microsoft Entra ID, and thus requries organizational account to sign in to the device.

You sign in to Microsoft Entra joined devices using a Microsoft Entra account. Access to resources can be controlled based on your account and <a href="https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-alt-all-users-compliant-hybrid-or-mfa" target="_blank">Conditional Access policies</a> applied to the device.

Administrators can secure and further control Microsoft Entra joined devices using Mobile Device Management (MDM) tools like Microsoft Intune or in co-management scenarios using Microsoft Configuration Manager. These tools provide a means to enforce organization-required configurations like:

- Requiring storage to be encrypted
- Password complexity
- Software installation
- Software updates

Administrators can make organization applications available to Microsoft Entra joined devices using Configuration Manager to [Manage apps from the Microsoft Store for Business and Education](https://learn.microsoft.com/en-us/mem/configmgr/apps/deploy-use/manage-apps-from-the-windows-store-for-business).

Microsoft Entra join can be accomplished using self-service options like the Out of Box Experience (OOBE), bulk enrollment, or [Windows Autopilot](https://learn.microsoft.com/en-us/mem/configmgr/apps/deploy-use/manage-apps-from-the-windows-store-for-business).

Microsoft Entra joined devices can still maintain single sign-on access to on-premises resources when they are on the organization's network. Devices that are Microsoft Entra joined can still authenticate to on-premises servers like file, print, and other applications.

#### Scenarios
Microsoft Entra join can be used in various scenarios like:

- You want to transition to cloud-based infrastructure using Microsoft Entra ID and MDM like Intune.
- You can't use an on-premises domain join, for example, if you need to get mobile devices such as tablets and phones under control.
- Your users primarily need to access Microsoft 365 or other software as a service (SaaS) apps integrated with Microsoft Entra ID.
- You want to manage a group of users in Microsoft Entra ID instead of in Active Directory. This scenario can apply, for example, to seasonal workers, contractors, or students.
- You want to provide joining capabilities to workers who work from home or are in remote branch offices with limited on-premises infrastructure.

You can configure Microsoft Entra join for all Windows 11 and Windows 10 devices except for Home editions.

The goal of Microsoft Entra joined devices is to simplify:

- Windows deployments of work-owned devices
- Access to organizational apps and resources from any Windows device
- Cloud-based management of work-owned devices
- Users to sign in to their devices with their Microsoft Entra ID or synced Active Directory work or school accounts.

Microsoft Entra join can be deployed by using any of the following methods:

- [Windows Autopilot](https://learn.microsoft.com/en-us/autopilot/windows-autopilot)
- [Bulk deployment](https://learn.microsoft.com/en-us/mem/intune/enrollment/windows-bulk-enroll)
- [Self-service experience](https://learn.microsoft.com/en-us/entra/identity/devices/device-join-out-of-box)

### Summary
#### Microsoft Entra join
| Item | Description |
| ---: | :--- |
| **Applicable To** | Hybrid organizations<br />Cloud-only organiztions<br>All users in the org |
| **Device Ownership** | Organization |
| **Min Rqd OS** | Win10+<br />Windows Server 2019+ running as VM in Azure<br>(Note: Win Server core not supported)|
| **Enabled via** | Self-Service:<ul><li>Windows Settings</li><li>Windows Out of the Box Experience (OOBE)</li></ul>Bulk enrollment<br>Windows Autopilot |
| **Signin via** | Organizational accounts using Password<br />Organizational accounts using Passwordless options such as Windows Hello for Business and FIDO2.0 security keys |
| **Device management** | Mobile Device Management (example: Microsoft Intune)<br />[Configuration Manager standalone or co-management with Microsoft Intune](https://learn.microsoft.com/en-us/mem/configmgr/comanage/overview) |
| **Enables** | <ul class="shin"><li>Single sign-on (SSO) to resources both in the cloud and on-prem</li><li>Conditional Access through mobile device management (MDM) enrollment (Intune)</li><li>Compliance evaluation through MDM/Intune</li><li>[Self-service Password Reset (SSPR)](https://learn.microsoft.com/en-us/entra/identity/authentication/howto-sspr-windows)</li><li>Windows Hello PIN reset on lock screen</li></ul> |

<!-- 
| **Enables** | <ul style="padding-left: 2ch;"><li>Single sign-on (SSO) to resources both in the cloud and on-prem</li><li>Conditional Access through mobile device management (MDM) enrollment and compliance evaluation</li><li>Conditional Access through Domain join or through Intune, if co-managed</li><li>[Self-service Password Reset and Windows Hello PIN reset on lock screen](https://learn.microsoft.com/en-us/entra/identity/authentication/howto-sspr-windows)</li></ul> |
 -->

### See also
- <a target="_blank" href="https://learn.microsoft.com/en-us/entra/identity/devices/device-join-plan">Plan your Microsoft Entra join implementation</a>
- <a target="_blank" href="https://learn.microsoft.com/en-us/mem/configmgr/comanage/overview">Co-management using Configuration Manager and Microsoft Intune</a>
- <a target="_blank" href="https://learn.microsoft.com/en-us/entra/identity/devices/assign-local-admin">How to manage the local administrators group on Microsoft Entra joined devices</a>
- <a target="_blank" href="https://learn.microsoft.com/en-us/entra/identity/devices/manage-device-identities">Manage device identities</a>
- <a target="_blank" href="https://learn.microsoft.com/en-us/entra/identity/devices/manage-stale-devices">Manage stale devices in Microsoft Entra ID</a>
