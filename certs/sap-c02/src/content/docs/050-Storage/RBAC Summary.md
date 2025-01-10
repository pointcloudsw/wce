---
title: RBAC Summary
---
### Summary of select RBAC roles for Azure Storage 
| Built-in role | Description | ID  |
| --- | --- | --- |
| [Backup Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#backup-contributor) | Lets you manage backup service, but can't create vaults and give access to others | 5e467623-bb1f-42f4-a55d-6e525e11384b |
| [Backup Operator](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#backup-operator) | Lets you manage backup services, except removal of backup, vault creation and giving access to others | 00c29273-979b-4161-815c-10b084fb9324 |
| [Backup Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#backup-reader) | Can view backup services, but can't make changes | a795c7a0-d4a2-40c1-ae25-d81f01202912 |
| [Reader and Data Access](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#reader-and-data-access) | Lets you view everything but will not let you delete or create a storage account or contained resource. It will also allow read/write access to all data contained in a storage account via access to storage account keys. | c12c1c16-33a1-487b-954d-41c89c60f349 |
| [Storage Account Backup Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#storage-account-backup-contributor) | Lets you perform backup and restore operations using Azure Backup on the storage account. | e5e2a7ff-d759-4cd2-bb51-3152d37e2eb1 |
| [Storage Account Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#storage-account-contributor) | Permits management of storage accounts. Provides access to the account key, which can be used to access data via Shared Key authorization. | 17d1049b-9a84-46fb-8f53-869881c3d3ab |
| [Storage Account Key Operator Service Role](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#storage-account-key-operator-service-role) | Permits listing and regenerating storage account access keys. | 81a9662b-bebf-436f-a333-f67b29880f12 |
| [Storage Blob Data Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#storage-blob-data-contributor) | Read, write, and delete Azure Storage containers and blobs. To learn which actions are required for a given data operation, see Permissions for calling data operations. | ba92f5b4-2d11-453d-a403-e96b0029c9fe |
| [Storage Blob Data Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#storage-blob-data-owner) | Provides full access to Azure Storage blob containers and data, including assigning POSIX access control. To learn which actions are required for a given data operation, see Permissions for calling data operations. | b7e6dc6d-f1e8-4753-8033-0f276bb0955b |
| [Storage Blob Data Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#storage-blob-data-reader) | Read and list Azure Storage containers and blobs. To learn which actions are required for a given data operation, see Permissions for calling data operations. | 2a2b9908-6ea1-4ae2-8e65-a410df84e7d1 |
| [Storage Blob Delegator](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#storage-blob-delegator) | Get a user delegation key, which can then be used to create a shared access signature for a container or blob that is signed with Azure AD credentials. For more information, see Create a user delegation SAS. | db58b8e5-c6ad-4a2a-8342-4190687cbf4a |
| [Storage File Data Privileged Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#storage-file-data-privileged-contributor) | Allows for read, write, delete, and modify ACLs on files/directories in Azure file shares by overriding existing ACLs/NTFS permissions. This role has no built-in equivalent on Windows file servers. | 69566ab7-960f-475b-8e7c-b3118f30c6bd |
| [Storage File Data Privileged Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage#storage-file-data-privileged-reader) | Allows for read access on files/directories in Azure file shares by overriding existing ACLs/NTFS permissions. This role has no built-in equivalent on Windows file servers. | b8eda974-7b85-4f76-af95-65846b26df6d |


### [Built-in roles for management operations](https://learn.microsoft.com/en-us/azure/storage/common/authorization-resource-provider#built-in-roles-for-management-operations)
Azure provides built-in roles that grant permissions to call management operations. Azure Storage also provides built-in roles specifically for use with the Azure Storage resource provider.

Built-in roles that grant permissions to call storage management operations include the roles described in the following table:

#### [Built-in roles for management operations](https://learn.microsoft.com/en-us/azure/storage/common/authorization-resource-provider#built-in-roles-for-management-operations)
| Built-in role | Description | Includes access to account keys?  |
| --- | --- | --- |
| Owner | Can manage all storage resources and access to resources. | Yes, provides permissions to view and regenerate the storage account keys. |
| Contributor | Can manage all storage resources, but cannot manage access to resources. | Yes, provides permissions to view and regenerate the storage account keys. |
| Reader | Can view information about the storage account, but cannot view the account keys. | No. |
| Storage Account Contributor | Can manage the storage account, get information about the subscription's resource groups and resources, and create and manage subscription resource group deployments. | Yes, provides permissions to view and regenerate the storage account keys. |
| User Access Administrator | Can manage access to the storage account. | Yes, permits a security principal to assign any permissions to themselves and others. |
| Virtual Machine Contributor | Can manage virtual machines, but not the storage account to which they are connected. | Yes, provides permissions to view and regenerate the storage account keys. |



