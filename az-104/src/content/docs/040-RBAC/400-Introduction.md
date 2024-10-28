---
title: Azure Roles Introduction
sidebar:
    order: 400
---
### Overview
If you're new to Azure, you may find it a little challenging to understand all the different roles in Azure. This article helps explain the following roles and when you would use each:
- Azure roles
- Microsoft Entra roles
- Classic subscription administrator roles

#### How the roles are related
To better understand roles in Azure, it helps to know some of the history. When Azure was initially released, access to resources was managed with just three administrator roles: Account Administrator, Service Administrator, and Co-Administrator. Later, Azure role-based access control (Azure RBAC) was added. Azure RBAC is a newer authorization system that provides fine-grained access management to Azure resources. Azure RBAC includes many built-in roles, can be assigned at different scopes, and allows you to create your own custom roles. To manage resources in Microsoft Entra ID, such as users, groups, and domains, there are several Microsoft Entra roles.

The following diagram is a high-level view of how the Azure roles, Microsoft Entra roles, and classic subscription administrator roles are related.
![Relationship of Azure Roles](bac-admin-roles.png)

### See also
- [Azure roles, Microsoft Entra roles, and classic subscription administrator roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles)
- [Azure classic subscription administrators](https://learn.microsoft.com/en-us/azure/role-based-access-control/classic-administrators?tabs=azure-portal)
