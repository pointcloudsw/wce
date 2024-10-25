---
title: Microsoft Entra Hybrid Join
sidebar:
    order: 830
---


### Entra Hybrid Join


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