---
title: Microsoft Entra Hybrid Join
sidebar:
    order: 830
---


### Entra-AD Hybrid Joined

### Configurable settings for Entra/AD devices
[Entra Devices - Configure Device Settings](https://learn.microsoft.com/en-us/entra/identity/devices/manage-device-identities#configure-device-settings)


#### Device Identities and Join Types
A [device identity](https://learn.microsoft.com/en-us/graph/api/resources/device) is an object in Microsoft Entra ID:
- Analagous to user, group, or application objects
- Provides administrators with details to inform access or configuration decisions, for example, when defining and applying [Conditional Access policies](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant)
- Is a prerequisite for scenarios like [device-based Conditional Access policies](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant) and [Mobile Device Management with the Microsoft Intune family of products](https://learn.microsoft.com/en-us/mem/endpoint-manager-overview).
- Can facilitate SSO access to Azure-based and [on-prem resources](https://learn.microsoft.com/en-us/entra/identity/devices/device-sso-to-on-premises-resources)

Devices obtain their Entra Device Identity through user self-service or through a controlled process managed by administrators, in any of three ways:
- [Microsoft Entra registered](#microsoft-entra-registered) -- Device is **registered** to Microsoft Entra ID *without requiring organizational account to sign in to the device*
- [Microsoft Entra joined](#microsoft-entra-joined) -- Device is **joined** only to Microsoft Entra ID *requiring organizational account to sign in to the device*
- [Microsoft Entra hybrid joined](#microsoft-entra-hybrid-joined) -- Device is **joined** to on-prem Active Directory *and to* Microsoft Entra ID, *requiring organizational account to sign in to the device*



<table style="border-bottom: none;"><tr style="border-bottom: none;"><td><img src="/src/assets/Entra & AD/azure-ad-registered-device.png" width="201" alt="Entra Registered Device"/>Entra Registered</td><td><img src="/src/assets/Entra & AD/azure-ad-hybrid-joined-device.png" width="330" height="330" alt="Azure Active Directory hybrid joined device" />Entra+ADDS Hybrid-joined</td><td><img src="/src/assets/Entra & AD/azure-ad-joined-device.png" width="315" height="315" alt="Azure Active Directory joined device" />ADDS joined</td></tr></table>

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

##### Microsoft Entra hybrid joined
Microsoft Entra hybrid joined devices.


### Summary
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

### Summary
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



#### Device Enrollment
Device enrollment, which is separate from Entra-registered, grants additional levels of control to the , which must be enabled by an Administrator.  

#### Configure device settings
If you want to manage device identities by using the Microsoft Entra admin center, the devices need to be either [registered or joined](https://learn.microsoft.com/en-us/entra/identity/devices/overview) to Microsoft Entra ID. As an administrator, you can control the process of registering and joining devices by configuring the following device settings.
You must be assigned one of the following roles to read or modify device settings:

- [Cloud Device Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-device-administrator) (read and modify)
- [Intune Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#intune-administrator) (read only)
- [Windows 365 Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#windows-365-administrator) (read only)

![Entra Device Settings Screen](device-settings-azure-portal.png)


- **Users may join devices to Microsoft Entra ID:** This setting enables you to select the users who can register their devices as Microsoft Entra joined devices. The default is All.

:::note
The **Users may join devices to Microsoft Entra ID** setting is applicable only to Microsoft Entra join on Windows 10 or newer. This setting doesn't apply to Microsoft Entra hybrid joined devices, [Microsoft Entra joined VMs in Azure](https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-windows#enable-azure-ad-login-for-a-windows-vm-in-azure), or Microsoft Entra joined devices that use [Windows Autopilot self-deployment mode](https://learn.microsoft.com/en-us/autopilot/self-deploying) because these methods work in a userless context.
:::

- **Users may register their devices with Microsoft Entra ID:** You need to configure this setting to allow users to register Windows 10 or newer personal, iOS, Android, and macOS devices with Microsoft Entra ID. If you select **None**, devices aren't allowed to register with Microsoft Entra ID. Enrollment with Microsoft Intune or mobile device management for Microsoft 365 requires registration. If you've configured either of these services, **ALL** is selected, and **NONE** is unavailable.

- **Require multifactor authentication to register or join devices with Microsoft Entra ID:**
    - We recommend organizations use the [Register or join devices user action](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps#user-actions) in Conditional Access to enforce multifactor authentication. You must configure this toggle to **No** if you use a [Conditional Access policy to require multifactor authentication](https://learn.microsoft.com/en-us/entra/identity/conditional-access/how-to-policy-mfa-device-register-join).
    - This setting allows you to specify whether users are required to provide another authentication factor to join or register their devices to Microsoft Entra ID. The default is **No**. We recommend that you require multifactor authentication when a device is registered or joined. Before you enable multifactor authentication for this service, you must ensure that multifactor authentication is configured for users that register their devices. For more information on Microsoft Entra multifactor authentication services, see [getting started with Microsoft Entra multifactor authentication](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks). This setting might not work with third-party identity providers.


:::note
The Require multifactor authentication to register or join devices with Microsoft Entra ID setting applies to devices that are either Microsoft Entra joined (with some exceptions) or Microsoft Entra registered. This setting doesn't apply to Microsoft Entra hybrid joined devices, [Microsoft Entra joined VMs in Azure](https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-windows#enable-azure-ad-login-for-a-windows-vm-in-azure), or [Microsoft Entra joined devices that use Windows Autopilot self-deployment mode](https://learn.microsoft.com/en-us/autopilot/self-deploying).
:::


- **Maximum number of devices:** This setting enables you to select the maximum number of Microsoft Entra joined or Microsoft Entra registered devices that a user can have in Microsoft Entra ID. If users reach this limit, they can't add more devices until one or more of the existing devices are removed. The default value is **50**. You can increase the value up to 100. If you enter a value above 100, Microsoft Entra ID sets it to 100. You can also use **Unlimited** to enforce no limit other than existing quota limits.

:::note
The **Maximum number of devices** setting applies to devices that are either Microsoft Entra joined or Microsoft Entra registered. This setting doesn't apply to Microsoft Entra hybrid joined devices.
:::

- **Manage Additional local administrators on Microsoft Entra joined devices:** This setting allows you to select the users who are granted local administrator rights on a device. These users are added to the Device Administrators role in Microsoft Entra ID.

- **Enable Microsoft Entra Local Administrator Password Solution (LAPS) (preview):** LAPS is the management of local account passwords on Windows devices. LAPS provides a solution to securely manage and retrieve the built-in local admin password. With cloud version of LAPS, customers can enable storing and rotation of local admin passwords for both Microsoft Entra ID and Microsoft Entra hybrid join devices. To learn how to manage LAPS in Microsoft Entra ID, see [the overview article](https://learn.microsoft.com/en-us/entra/identity/devices/howto-manage-local-admin-passwords).

- **Restrict non-admin users from recovering the BitLocker key(s) for their owned devices:** Admins can block self-service BitLocker key access to the registered owner of the device. Default users without the BitLocker read permission are unable to view or copy their BitLocker key(s) for their owned devices. You must be at least a [Privileged Role Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator) to update this setting.

- **Enterprise State Roaming:** For information about this setting, see [the overview article](https://learn.microsoft.com/en-us/entra/identity/devices/enterprise-state-roaming-enable).
