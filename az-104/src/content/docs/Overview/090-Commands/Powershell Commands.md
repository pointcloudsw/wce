---
title: PowerShell Commands
---
#### Spawning processes

```powershell
Invoke-Command
Invoke-Item
Run-Job
Start-Process
"&"
```
#### Installing Azure PowerShell Module
```powershell
Install-Module az
```

#### Connect to Azure Account from PowerShell
```powershell
Connect-AzAccount -UseDeviceAuthentication -TenantId 73ec7808-5b5c-4971-b28c-663b15f02e0b
```
#### Get Azure RBAC Providers where Company = Microsoft
```powershell
Get-AzProviderOperation | where operation -like 'Microsoft.*' | ft
Get-AzProviderOperation | where operation -like 'Microsoft.Network*' | ft
Get-AzProviderOperation | where operation -like 'Microsoft.Authorization/*read' 
| ft
```
#### Get Azure RBAC Role Definitions pertaining to DNS
```powershell
get-azRoleDefinition | where actions -like '*dns*'   
```

#### See full RBAC defintiion for given role
```powershell
get-azRoleDefinition "DNS Resolver Contributor" | select actions -ExpandProperty actions
get-azRoleDefinition "DNS Resolver Contributor" | select actions -ExpandProperty actions -Unique
```

