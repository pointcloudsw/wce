---
title: SSO to on-prem resources from Entra join devices
sidebar:
    order: 814
---
### Overview
Microsoft Entra joined devices give users a single sign-on (SSO) experience to your tenant's cloud apps. If your environment has on-premises Active Directory Domain Services (AD DS), users can also SSO to resources and applications that rely on on-premises Active Directory Domain Services.

### Prerequisites
- An [Microsoft Entra joined device](https://learn.microsoft.com/en-us/entra/identity/devices/concept-directory-join).
- On-premises SSO requires line-of-sight communication with your on-premises AD DS domain controllers. If Microsoft Entra joined devices aren't connected to your organization's network, a VPN or other network infrastructure is required.
- Microsoft Entra Connect or Microsoft Entra Connect cloud sync: To synchronize default user attributes like SAM Account Name, Domain Name, and UPN. For more information, see the article [Attributes synchronized by Microsoft Entra Connect](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/reference-connect-sync-attributes-synchronized#windows-10).

### Details
With a Microsoft Entra joined device, your users already have an SSO experience to the cloud apps in your environment. If your environment has Microsoft Entra ID and on-premises AD DS, you might want to expand the scope of your SSO experience to your on-premises Line Of Business (LOB) apps, file shares, and printers.

Microsoft Entra joined devices have no knowledge about your on-premises AD DS environment because they aren't joined to it. However, you can provide additional information about your on-premises AD to these devices with Microsoft Entra Connect.

Microsoft Entra Connect or Microsoft Entra Connect cloud sync synchronize your on-premises identity information to the cloud. As part of the synchronization process, on-premises user and domain information is synchronized to Microsoft Entra ID. When a user signs in to a Microsoft Entra joined device in a hybrid environment:
1. Microsoft Entra ID sends the details of the user's on-premises domain back to the device, along with the Primary Refresh Token.
2. The local security authority (LSA) service enables Kerberos and NTLM authentication on the device.

During an access attempt to an on-premises resource requesting Kerberos or NTLM, the device:
1. Sends the on-premises domain information and user credentials to the located DC to get the user authenticated.
2. Receives a Kerberos Ticket-Granting Ticket (TGT) or NTLM token based on the protocol the on-premises resource or application supports. If the attempt to get the Kerberos TGT or NTLM token for the domain fails, Credential Manager entries are tried, or the user might receive an authentication pop-up requesting credentials for the target resource. This failure can be related to a delay caused by a DCLocator timeout.

### Advantages and Benefits
With SSO, on a Microsoft Entra joined device you can:
- Access a UNC path on an AD member server
- Access an AD DS member web server configured for Windows-integrated security
If you want to manage your on-premises AD from a Windows device, install the <a target="_blank" href="https://www.microsoft.com/download/details.aspx?id=45520">Remote Server Administration Tools</a>, then use:
    - The Active Directory Users and Computers (ADUC) snap-in to administer all AD objects. However, you have to specify the domain that you want to connect to manually.
    - The DHCP snap-in to administer an AD-joined DHCP server. However, you might need to specify the DHCP server name or address.

### Notes
- You might have to adjust your [domain-based filtering](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-configure-filtering#domain-based-filtering) in Microsoft Entra Connect to ensure that the data about the required domains is synchronized if you have multiple domains.
- Apps and resources that depend on Active Directory machine authentication don't work because Microsoft Entra joined devices don't have a computer object in AD DS.
- You can't share files with other users on a Microsoft Entra joined device.
:::caution[Note]
Access to on-prem resources via SSO from an Entra join device is not supported in all cases.  For example, the following use cases are not supported:
- Because Microsoft Entra joined devices don't have a computer object in AD DS, apps and resources that depend on Active Directory **machine authentication** will not work
- File sharing between users on Microsoft Entra joined devices is not supported
- Applications that authenticate using legacy or NETBIOS names (i.e., "contoso\user") will fail, even if the legacy domain name can be resolved
:::
- Applications running on your Microsoft Entra joined device might authenticate users. They must use the implicit UPN or the NT4 type syntax with the domain FQDN name as the domain part, for example: user@contoso.corp.com or contoso.corp.com\user.
- If applications use the NETBIOS or legacy name like contoso\user, the errors the application gets would be either, NT error STATUS_BAD_VALIDATION_CLASS - 0xc00000a7, or Windows error ERROR_BAD_VALIDATION_CLASS - 1348 "The validation information class requested was invalid." This error happens even if you can resolve the legacy domain name.

### See also
- [How SSO to on-premises resources works on Microsoft Entra joined devices](https://learn.microsoft.com/en-us/entra/identity/devices/device-sso-to-on-premises-resources)