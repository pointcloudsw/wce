---
title: Role Based Access Control (RBAC)
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

target.forEach( t => { if ( t.childNodes.length === 1 ) { console.log(t.textContent) } else { t.childNodes.forEach( c => { if ( c.nodeType === 1) if( c.childNodes.length > 0 ) { console.log(c.childNodes.length, c.children.length, c.nodeName, c) } else { console.log ( c.textContent ) } } ) } } );

target.forEach( t => {
  if ( t.nodeName === 'H2' ) console.log( t.textContent );
  if ( t.nodeName === 'TR' )
    if ( t.childNodes[0]?.nodeName === 'TH' ) {
      console.log( t.childNodes[0]?.textContent + ' | ' +  t.childNodes[1]?.textContent + ' | ' +  t.childNodes[2]?.textContent + ' |' )
    } else {
      console.log ( t.childNodes[0]?.textContent + ' | ' +  t.childNodes[1]?.textContent + '](' + t.childNodes[1]?.childNodes[0]?.href + ') | ' +  t.childNodes[2]?.textContent + ' |' ) } } );


target.forEach( t => {
  if ( t.nodeName === 'H2' ) console.log( t.textContent );
  if( t.nodeName === 'TR' ) {
    console.log( t, t.firstElementChild );
    if ( t.children[0].nodeName === 'TH' ) {
      console.log( t.children[0].textContent + ' | ' +  t.children[1].textContent + ' | ' +  t.children[2].textContent + ' |')
    } else {
      console.log ( t.children[0]?.textContent + ' | [' +  t.children[1]?.textContent + '](' + t.children[1]?.children[0]?.href + ') | ' +  t.children[2]?.length === 1 ? t.children[2]?.textContent : t => { st = ''; t.children[2].childNodes.forEach( ch => { if ( ch.nodeName === 'A' ) { console.log( ch.textContent, ch.href ) } } ) + ' |' ) } } } );
```


### See Also
[Azure Storage RBAC Summary](/storage/rbac-summary)
