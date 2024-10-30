---
title: Role Based Access Control (RBAC)
sidebar:
  order: 401
---

### Exceptions
Azure RBAC (Role-Based Access Control) policies control access to most Azure resources, but there are some exceptions.  

:::danger
Access to some Azure resources cannot be managed through Azure RBAC.  For example:
- **Azure Key Vault**: Azure Key Vault uses its own access policy model for controlling access to keys, secrets, and certificates. The AKV access policy model is separate from Azure RBAC and operates on the data plane alone.
- **Azure Policy**: While Azure Policy itself is used to enforce rules and compliance, it doesn't use RBAC for its own access control.
- **Azure Service Bus**: Access control for Service Bus resources is managed through Shared Access Signatures (SAS) and connection strings rather than RBAC.
- **Azure Cosmos DB**: Access to Cosmos DB resources is managed through resource-specific permissions and connection strings.
- **Azure Event Grid**: Access control for Event Grid resources is managed through SAS tokens and connection strings.
:::

### Built-In Role Definitions
#### Privileged Roles
| Built-in role | Description | ID  |
| --- | --- | --- |
| [Contributor](built-in-roles/privileged#contributor) | Grants full access to manage all resources, but does not allow you to assign roles in Azure RBAC, manage assignments in Azure Blueprints, or share image galleries. | b24988ac-6180-42a0-ab88-20f7382dd24c |
| [Owner](built-in-roles/privileged#owner) | Grants full access to manage all resources, including the ability to assign roles in Azure RBAC. | 8e3af657-a8ff-443c-a75c-2fe8c4bcb635 |
| [Reservations Administrator](built-in-roles/privileged#reservations-administrator) | Lets one read and manage all the reservations in a tenant | a8889054-8d42-49c9-bc1c-52486c10e7cd |
| [Role Based Access Control Administrator](built-in-roles/privileged#role-based-access-control-administrator) | Manage access to Azure resources by assigning roles using Azure RBAC. This role does not allow you to manage access using other ways, such as Azure Policy. | f58310d9-a9f6-439a-9e8d-f62e7b41a168 |
| [User Access Administrator](built-in-roles/privileged#user-access-administrator) | Lets you manage user access to Azure resources. | 18d7d88d-d35e-4fb5-a5c3-7773c20a72d9 |

### Microsoft Entra ID
#### Least privileged roles by task
PLACEHOLDER
```js
/*
document.location: Location: {
{
    "ancestorOrigins": {},
    "href": "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-by-task#groups",
    "origin": "https://learn.microsoft.com",
    "protocol": "https:",
    "host": "learn.microsoft.com",
    "hostname": "learn.microsoft.com",
    "port": "",
    "pathname": "/en-us/entra/identity/role-based-access-control/delegate-by-task",
    "search": "",
    "hash": "#groups"
}
*/

target = document.querySelectorAll("div.heading-wrapper h2.heading-anchor, div.heading-wrapper + div.mx-tableFixed tr");

function buildHrefs(nl) {
  hrStr = '';
  nl.forEach( (el) => {
    if ( el.nodeName === 'A' ){
      if ( hrStr.length ) hrStr += '<br />';
      hrStr += '[' + el.textContent + '](' + el.href + ')';
    }	
  });
  return !hrStr.length ? ' ||' : ' | ' + hrStr.substring(0, hrStr.length-1) + ') |';
}

target.forEach( t => {
  st = '';
  if ( t.nodeName === 'H2' ) st += '### ' + t.textContent;
  if( t.nodeName === 'TR' )
    if ( t.children[0].nodeName === 'TH' ) {
      st += '| ' + t.children[0]?.textContent + ' | ' +  t.children[1]?.textContent + ' | ' +  t.children[2]?.textContent + ' |\n';
      st += '| --- | --- | --- |';
    } else {
      st += '| ' + t.children[0]?.textContent + ' | [' +  t.children[1]?.textContent + '](' + t.children[1]?.children[0]?.href + ')';
      st += buildHrefs(t.children[2]?.childNodes);
    }
  console.log(st);
  });

```
 ### Application proxy
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Configure application proxy app | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) ||
 | Configure connector group properties | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) ||
 | Create application registration when ability is disabled for all users | [Application Developer](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-developer) | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator)<br />[Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
 | Create connector group | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) ||
 | Delete connector group | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) ||
 | Disable application proxy | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) ||
 | Download connector service | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) ||
 | Read all configuration | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) ||
 ### External Identities/B2C
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Create Azure AD B2C directories | [All non-guest users](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) ||
 | Create enterprise applications | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
 | Create, read, update, and delete B2C policies | [B2C IEF Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#b2c-ief-policy-administrator) ||
 | Create, read, update, and delete identity providers | [External Identity Provider Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#external-identity-provider-administrator) ||
 | Create, read, update, and delete password reset user flows | [External ID User Flow Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#external-id-user-flow-administrator) ||
 | Create, read, update, and delete profile editing user flows | [External ID User Flow Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#external-id-user-flow-administrator) ||
 | Create, read, update, and delete sign-in user flows | [External ID User Flow Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#external-id-user-flow-administrator) ||
 | Create, read, update, and delete sign-up user flow | [External ID User Flow Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#external-id-user-flow-administrator) ||
 | Create, read, update, and delete user attributes | [External ID User Flow Attribute Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#external-id-user-flow-attribute-administrator) ||
 | Create, read, update, and delete users | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) ||
 | Configure B2B external collaboration settings - Guest user access | [Privileged Role Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator) ||
 | Configure B2B external collaboration settings - Guest invite settings | [Guest Inviter](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#guest-inviter) | [External ID User Flow Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#external-id-user-flow-administrator) |
 | Configure B2B external collaboration settings - External user leave settings | [External Identity Provider Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#external-identity-provider-administrator) ||
 | Configure B2B external collaboration settings - Collaboration restrictions | [Global Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-administrator) ||
 | Read all configuration | [Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) ||
 | Read B2C audit logs | [Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) ||
 ### Company branding
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Configure company branding | [Organizational Branding Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#organizational-branding-administrator) ||
 | Read all configuration | [Directory Readers](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#directory-readers) | [Default user role](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) |
 ### Connect
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Passthrough authentication | [Hybrid Identity Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#hybrid-identity-administrator) ||
 | Read all configuration | [Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) | [Hybrid Identity Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#hybrid-identity-administrator) |
 | Seamless single sign-on | [Hybrid Identity Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#hybrid-identity-administrator) ||
 ### Connect Sync
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Manage on-premises directory synchronization | [Hybrid Identity Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#hybrid-identity-administrator) ||
 ### Cloud Provisioning
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Passthrough authentication | [Hybrid Identity Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#hybrid-identity-administrator) ||
 | Read all configuration | [Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) | [Hybrid Identity Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#hybrid-identity-administrator) |
 | Seamless single sign-on | [Hybrid Identity Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#hybrid-identity-administrator) ||
 ### Connect Health
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Add or delete services | [Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) ||
 | Apply fixes to sync error | [Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor) | [Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) |
 | Configure notifications | [Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor) | [Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) |
 | Configure settings | [Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) ||
 | Configure sync notifications | [Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor) | [Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) |
 | Read ADFS security reports | [Security Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#security-reader) | [Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor)<br />[Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) |
 | Read all configuration | [Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#reader) | [Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor)<br />[Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) |
 | Read sync errors | [Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#reader) | [Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor)<br />[Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) |
 | Read sync services | [Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#reader) | [Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor)<br />[Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) |
 | View metrics and alerts | [Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#reader) | [Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor)<br />[Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) |
 | View metrics and alerts | [Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#reader) | [Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor)<br />[Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) |
 | View sync service metrics and alerts | [Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#reader) | [Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor)<br />[Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner) |
 ### Custom domain names
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Manage domains | [Domain Name Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#domain-name-administrator) ||
 | Read all configuration | [Directory Readers](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#directory-readers) | [Default user role](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) |
 ### Domain Services
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Create Microsoft Entra Domain Services instance | [Application AdministratorGroups Administrator Domain Services Contributor](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) ||
 | Perform all Microsoft Entra Domain Services tasks | [AAD DC Administrators group](https://learn.microsoft.com/en-us/entra/identity/domain-services/tutorial-create-management-vm#administrative-tasks-you-can-perform-on-a-managed-domain) ||
 | Read all configuration | [Reader on Azure subscription containing AD DS service](undefined) ||
 ### Devices
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Delete device | [Cloud Device Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-device-administrator) | [Intune Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#intune-administrator) |
 | Disable device | [Cloud Device Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-device-administrator) | [Intune Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#intune-administrator) |
 | Enable device | [Cloud Device Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-device-administrator) | [Intune Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#intune-administrator) |
 | Read basic configuration | [Default user role](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) ||
 | Read BitLocker keys | [Cloud Device Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-device-administrator) | [Helpdesk Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#helpdesk-administrator)<br />[Intune Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#intune-administrator)<br />[Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator)<br />[Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) |
 ### Enterprise applications
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Consent to any delegated permissions | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
 | Consent to application permissions not including Microsoft Graph | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
 | Consent to application permissions to Microsoft Graph | [Privileged Role Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator) ||
 | Consent to applications accessing own data | [Default user role](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) ||
 | Create enterprise application | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
 | Manage Application Proxy | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) ||
 | Read access review of a group or of an app | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator)<br />[User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Read all configuration | [Default user role](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) ||
 | Update enterprise application assignments | [Enterprise application owner](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions#object-ownership) | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator)<br />[Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator)<br />[User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Update enterprise application owners | [Enterprise application owner](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions#object-ownership) | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator)<br />[Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
 | Update enterprise application properties | [Enterprise application owner](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions#object-ownership) | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator)<br />[Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
 | Update enterprise application provisioning | [Enterprise application owner](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions#object-ownership) | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator)<br />[Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
 | Update enterprise application self-service | [Enterprise application owner](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions#object-ownership) | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator)<br />[Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
 | Update single sign-on properties | [Enterprise application owner](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions#object-ownership) | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator)<br />[Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
 | Create and modify custom authentication extensions | [Authentication Extensibility Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-extensibility-administrator) | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
 ### Entitlement management
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Add resources to a catalog | [Identity Governance Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#identity-governance-administrator) | [catalog owner](https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-catalog-create#add-more-catalog-owners) |
 | Add SharePoint Online sites to catalog | [SharePoint Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#sharepoint-administrator) ||
 ### Groups
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Assign license | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) ||
 | Create group | [Groups Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#groups-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Create, update, or delete access review of a group or of an app | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) ||
 | Manage group expiration | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) ||
 | Manage group settings | [Groups Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#groups-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Read all configuration (except hidden membership) | [Directory Readers](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#directory-readers) | [Default user role](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) |
 | Read hidden membership | [Group member](undefined) | [Group owner](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions#object-ownership)<br />[Password Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#password-administrator)<br />[Exchange Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#exchange-administrator)<br />[SharePoint Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#sharepoint-administrator)<br />[Teams Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#teams-administrator)<br />[User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Read membership of groups with hidden membership | [Helpdesk Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#helpdesk-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator)<br />[Teams Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#teams-administrator) |
 | Revoke license | [License Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#license-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Update dynamic membership groups | [Group owner](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions#object-ownership) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Update group owners | [Group owner](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions#object-ownership) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Update group properties | [Group owner](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions#object-ownership) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Delete group | [Groups Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#groups-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 ### Licenses
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Assign license | [License Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#license-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Read all configuration | [Directory Readers](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#directory-readers) | [Default user role](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) |
 | Revoke license | [License Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#license-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Try or buy subscription | [Billing Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#billing-administrator) ||
 ### Microsoft Entra Health
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | View scenario monitoring signals | [Reports Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#reports-reader) | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader)<br />[Security Operator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-operator)<br />[Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator)<br />[Helpdesk Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#helpdesk-administrator)<br />[Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) |
 ### Microsoft Entra ID Protection
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Configure alert notifications | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) ||
 | Configure and enable or disable MFA policy | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) ||
 | Configure and enable or disable sign-in risk policy | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) ||
 | Configure and enable or disable user risk policy | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) ||
 | Configure weekly digests | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) ||
 | Dismiss all risk detections | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) ||
 | Fix or dismiss vulnerability | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) ||
 | Read all configuration | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) ||
 | Read all risk detections | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) ||
 | Read vulnerabilities | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) ||
 ### Monitoring and health - Audit logs
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Read audit logs | [Reports Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#reports-reader) | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader)<br />[Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
 ### Monitoring and health - Sign-in logs
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Read sign-in logs | [Reports Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#reports-reader) | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader)<br />[Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator)<br />[Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) |
 ### Monitoring and health - Provisioning logs
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Read sign-in logs | [Reports Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#reports-reader) | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader)<br />[Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator)<br />[Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader)<br />[Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator)<br />[Security Operator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-operator)<br />[Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator)<br />[Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) |
 ### Monitoring and health - Recommendations
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Read recommendations | [Reports Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#reports-reader) | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader)<br />[Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader)<br />[Helpdesk Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#helpdesk-administrator)<br />[Service Support Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#service-support-administrator)<br />[User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
 | Update recommendations | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator)<br />[Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-administrator)<br />[Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator)<br />[Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator)<br />[Exchange Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#exchange-administrator)<br />[Hybrid Identity Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#hybrid-identity-administrator)<br />[Identity Governance Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#identity-governance-administrator)<br />[Privileged Role Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator)<br />[Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator)<br />[Security Operator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-operator)<br />[SharePoint Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#sharepoint-administrator) |
 ### Multifactor authentication
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Delete all existing app passwords generated by the selected users | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) | [Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-administrator) |
 | Disable per-user MFA | [Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-administrator) | [Privileged Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-authentication-administrator) |
 | Enable per-user MFA | [Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-administrator) | [Privileged Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-authentication-administrator) |
 | Manage MFA service settings | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Require selected users to provide contact methods again | [Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-administrator) ||
 | Restore multifactor authentication on all remembered devices255 | [Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-administrator) ||
 ### MFA Server
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Block/unblock users | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Configure account lockout | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Configure caching rules | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Configure fraud alert | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Configure notifications | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Configure one-time bypass | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Configure phone call settings | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Configure providers | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Configure server settings | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Read activity report | [Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) ||
 | Read all configuration | [Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) ||
 | Read server status | [Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) ||
 ### Organizational relationships
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Manage identity providers | [External Identity Provider Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#external-identity-provider-administrator) ||
 | Read all configuration | [Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) ||
 ### Password reset
 | Task | Least privileged role | Additional roles |
| --- | --- | --- |
 | Configure authentication methods | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Configure customization | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Configure notification | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
 | Configure on-premises integration | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
| Configure password reset properties | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) |
| Configure registration | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
| Read all configuration | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
### Permissions management
### Privileged identity management
| Task | Least privileged role | Additional roles |
| --- | --- | --- |
| Assign users to roles | [Privileged Role Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator) ||
| Configure role settings | [Privileged Role Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator) ||
| View audit activity | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) ||
| View role memberships | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) ||
### Roles and administrators
| Task | Least privileged role | Additional roles |
| --- | --- | --- |
| Manage role assignments | [Privileged Role Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator) ||
| Read access review of a Microsoft Entra role | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator)<br />[Privileged Role Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator) |
| Read all configuration | [Default user role](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) ||
### Security - Authentication methods
| Task | Least privileged role | Additional roles |
| --- | --- | --- |
| Enable or disable authentication methods | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
| View, provision on behalf of, and manage individual user authentication methods | [Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-administrator) | [Privileged Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-authentication-administrator) |
| Configure password protection | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) ||
| Configure smart lockout | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) ||
| Read all configuration | [Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) ||
### Security - Conditional Access
| Task | Least privileged role | Additional roles |
| --- | --- | --- |
| Configure MFA trusted IP addresses | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) ||
| Create custom controls | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Create named locations | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Create policies | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Create terms of use | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Create VPN connectivity certificate | [Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator) |
| Delete classic policy | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Delete terms of use | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Delete VPN connectivity certificate | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Disable classic policy | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Manage custom controls | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Manage named locations | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Manage terms of use | [Conditional Access Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#conditional-access-administrator) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Read all configuration | [Default user role](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) ||
| Read named locations | [Default user role](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) ||
### Security - Identity security score
| Task | Least privileged role | Additional roles |
| --- | --- | --- |
| Read all configuration | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Read security score | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) |
| Update event status | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) ||
### Security - Risky sign-ins
| Task | Least privileged role | Additional roles |
| --- | --- | --- |
| Read all configuration | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) ||
| Read risky sign-ins | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) ||
### Security - Users flagged for risk
| Task | Least privileged role | Additional roles |
| --- | --- | --- |
| Dismiss all events | [Security Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-administrator) ||
| Read all configuration | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) ||
| Read users flagged for risk | [Security Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#security-reader) ||
### Temporary Access Pass
| Task | Least privileged role | Additional roles |
| --- | --- | --- |
| Create, delete, or view a Temporary Access Pass for admins or members (except themselves) | [Privileged Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-authentication-administrator) ||
| Create, delete, or view a Temporary Access Pass for members (except themselves) | [Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-administrator) ||
| View a Temporary Access Pass details for a user (without reading the code itself) | [Global Reader](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-reader) ||
| Configure or update the Temporary Access Pass authentication method policy | [Authentication Policy Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-policy-administrator) ||
### Tenant
| Task | Least privileged role | Additional roles |
| --- | --- | --- |
| Create Microsoft Entra ID or Azure AD B2C Tenant | [Tenant Creator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#tenant-creator) ||
| Update Microsoft Entra tenant properties | [Billing Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#billing-administrator) ||
| Manage privacy statement and contact | [Billing Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#billing-administrator) ||
### Users
| Task | Least privileged role | Additional roles |
| --- | --- | --- |
| Add user to directory role | [Privileged Role Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator) ||
| Add user to group | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) ||
| Assign license | [License Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#license-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
| Create guest user | [Guest Inviter](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#guest-inviter) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
| Reset guest user invite | [Helpdesk Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#helpdesk-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
| Create user | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) ||
| Delete users | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) ||
| Invalidate refresh tokens of limited admins | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) ||
| Invalidate refresh tokens of non-admins | [Helpdesk Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#helpdesk-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
| Invalidate refresh tokens of privileged admins | [Privileged Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-authentication-administrator) ||
| Read basic configuration | [Default user role](https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions) ||
| Reset password for limited admins | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) ||
| Reset password of non-admins | [Password Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#password-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
| Reset password of privileged admins | [Privileged Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-authentication-administrator) ||
| Revoke license | [License Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#license-administrator) | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |
| Update all properties except User Principal Name | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) ||
| Update On-premises sync enabled property | [Hybrid Identity Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#hybrid-identity-administrator) ||
| Update User Principal Name for limited admins | [User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) ||
| Update User Principal Name property on privileged admins | [Privileged Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-authentication-administrator) ||
| Update user settings - Default user role permissions | [Privileged Role Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator) ||
| Update user settings - Guest user access | [Privileged Role Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator) ||
| Update user settings - Administration center | [Global Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-administrator) ||
| Update user settings - LinkedIn account connections | [Global Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-administrator) ||
| Update user settings - Show keep user signed in | [Global Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#global-administrator) ||
| Update Authentication methods | [Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#authentication-administrator) | [Privileged Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-authentication-administrator) |
### Support
| Task | Least privileged role | Additional roles |
| --- | --- | --- |
| Submit support ticket | [Service Support Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#service-support-administrator) | [Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#application-administrator)<br />[Azure Information Protection Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#azure-information-protection-administrator)<br />[Billing Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#billing-administrator)<br />[Cloud Application Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator)<br />[Compliance Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#compliance-administrator)<br />[Dynamics 365 Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#dynamics-365-administrator)<br />[Desktop Analytics Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#desktop-analytics-administrator)<br />[Exchange Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#exchange-administrator)<br />[Intune Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#intune-administrator)<br />[Password Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#password-administrator)<br />[Fabric Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#fabric-administrator)<br />[Privileged Authentication Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#privileged-authentication-administrator)<br />[SharePoint Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#sharepoint-administrator)<br />[Skype for Business Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#skype-for-business-administrator)<br />[Teams Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#teams-administrator)<br />[Teams Communications Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#teams-communications-administrator)<br />[User Administrator](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#user-administrator) |

### See Also
[Azure Storage RBAC Summary](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage)
