---
title: Microsoft Entra Hybrid Join
sidebar:
    order: 813
---


### Overview
Organizations with existing Active Directory implementations can benefit from some of the functionality provided by Microsoft Entra ID by implementing Microsoft Entra hybrid joined devices. These devices are joined to your on-premises Active Directory and registered with Microsoft Entra ID.

Microsoft Entra hybrid joined devices require network line of sight to your on-premises domain controllers periodically. Without this connection, devices become unusable. If this requirement is a concern, consider [Microsoft Entra joining](https://learn.microsoft.com/en-us/entra/identity/devices/concept-directory-join) your devices.

:::danger
Without ongoing reachability to your organizations on-prem Active Directory Domain Controllers, Microsoft Entra hybrid joined devices may become **disabled**. 
:::

### Scenarios
Use Microsoft Entra hybrid joined devices when:
- You need to continue to use [Group Policy](https://learn.microsoft.com/en-us/mem/configmgr/comanage/faq#my-environment-has-too-many-group-policy-objects-and-legacy-authenticated-apps--do-i-have-to-use-hybrid-azure-ad-) to manage device configuration.
- You need to continue using existing imaging solutions to deploy and configure devices.
- You have Win32 apps deployed to these devices that rely on Active Directory machine authentication.

### Summary
#### Microsoft Entra Hybrid Join
| Item | Description |
| ---: | :--- |
| **Applicable To** | Hybrid organizations with existing on-premises Microsoft Windows Server Active Directory infrastructure<br>All users in the org  |
| **Device Ownership** | Organization |
| **Min Rqd OS** | Win10+<br>Windows Server 2016+ |
| **Enabled via** | Windows Settings<br>Domain join by IT<br>Domain join by Windows<br>Domain autojoin via Microsoft Entra Connect<br>Domain autojoin via AD FS config<br>Windows Autopilot and autojoin via Microsoft Entra Connect<br>Windows Autopilot and autojoin via AD FS config |
| **Signin via** | Organizational accounts using Password<br />Organizational accounts using Passwordless options such as Windows Hello for Business and FIDO2.0 security keys |
| **Device management** | [Group Policy](https://learn.microsoft.com/en-us/mem/configmgr/comanage/faq#my-environment-has-too-many-group-policy-objects-and-legacy-authenticated-apps--do-i-have-to-use-hybrid-azure-ad-)<br />[Configuration Manager](https://learn.microsoft.com/en-us/mem/configmgr/comanage/overview) standalone<br />[Configuration Manager](https://learn.microsoft.com/en-us/mem/configmgr/comanage/overview) co-management with Intune |
| **Enables** | <ul class="shin"><li>Single sign-on (SSO) to cloud resources</li><li>Single sign-on (SSO) to on-prem resources</li><li>Conditional Access through Domain join</li><li>Conditional Access through Intune, if co-managemed </li><li>[Self-service Password Reset (SSPR)](https://learn.microsoft.com/en-us/entra/identity/authentication/howto-sspr-windows)</li><li>Windows Hello PIN reset on lock screen</li></ul> |


### See also
- <a target="_blank" href="https://learn.microsoft.com/en-us/entra/identity/devices/device-join-plan">Plan your Microsoft Entra join implementation</a>
- <a target="_blank" href="https://learn.microsoft.com/en-us/mem/configmgr/comanage/overview">Co-management using Configuration Manager and Microsoft Intune</a>
- <a target="_blank" href="https://learn.microsoft.com/en-us/entra/identity/devices/assign-local-admin">How to manage the local administrators group on Microsoft Entra joined devices</a>
- <a target="_blank" href="https://learn.microsoft.com/en-us/entra/identity/devices/manage-device-identities">Manage device identities</a>
- <a target="_blank" href="https://learn.microsoft.com/en-us/entra/identity/devices/manage-stale-devices">Manage stale devices in Microsoft Entra ID</a>
- <a target="_blank" href="https://support.microsoft.com/en-us/account-billing/join-your-work-device-to-your-work-or-school-network-ef4d6adb-5095-4e51-829e-5457430f3973">Join your work device to your organization's network</a>
- <a target="_blank" href="https://support.microsoft.com/en-us/account-billing/register-your-personal-device-on-your-work-or-school-network-8803dd61-a613-45e3-ae6c-bd1ab25bf8a8">Join your personal device to your organization's network</a>
