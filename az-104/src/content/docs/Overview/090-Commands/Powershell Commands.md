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

# Azure Kubernetes Contributor Role Definition and Privileges
get-azRoleDefinition "Azure Kubernetes Service Contributor Role" | select actions -ExpandProperty actions -Unique
Get-AzProviderOperation | where operation -like 'Microsoft.ContainerService/managedClusters/*'
Get-AzProviderOperation | where operation -like 'Microsoft.ContainerService/managedClusters/*write' | ft
```
#### Get Azure RBAC Role Definitions pertaining to DNS
```powershell
get-azRoleDefinition | where actions -like '*dns*'   
```

#### See full RBAC defintiion for given role
```powershell
get-azRoleDefinition "DNS Resolver Contributor" | select actions -ExpandProperty actions
get-azRoleDefinition "Azure Kubernetes Service Contributor Role" | select actions -ExpandProperty actions -Unique
```
#### Setup Parameters for Resource Creation
```powershell
$rg00 = @{ name = 'jroll_rg00'; Location = 'centralus'; Tag = @{ Scope = 'Dev'; Users = 'jroll@kforce.com,'; Subject = 'az-104' } }
```

#### Create Resources
##### Create Networks
###### Create VNet
```powershell
$vnet = @{ name = 'jroll_az104_vnet01'; resourcegroupname = $rg00.name; location = $rg00.location; tag = $rg00.tag; addressprefix = '10.0.0.0/16' }
$virtualnetwork = New-AzVirtualNetwork @vnet 
```
###### Create Subnet
```powershell
$sn = @{ name = 'jroll_az104_vnet01_subnet01'; virtualnetwork = $virtualnetwork; addressprefix = '10.0.0.0/24' }
$sncfg = Add-AzVirtualNetworkSubnetConfig @sn
```
###### Update the VNet configuration
```powershell
$virtualnetwork | Set-AzVirtualNetwork
```

#### Use the Azure Pricing API to Gather Pricing Info
##### Retail pricing for Azure Virtual Machines
(invoke-webrequest https://prices.azure.com/api/retail/prices?filter=serviceName%20eq%20Virtual%20Machines).content | jq .
(invoke-webrequest https://prices.azure.com/api/retail/prices?filter=serviceName%20eq%20Virtual%20Machines).content | jq '. | .Items | .[] | .armSkuName'
(invoke-webrequest https://prices.azure.com/api/retail/prices?filter=serviceName%20eq%20Virtual%20Machines).content | jq '. | .Items | .[] |  .armSkuName, .retailPrice, .unitPrice '

(invoke-webrequest "https://prices.azure.com/api/retail/prices?api-version=2021-10-01-preview&filter=armRegionName%20eq%20'centralus'").content | jq .Items[]

(invoke-webrequest "https://prices.azure.com/api/retail/prices?api-version=2021-10-01-preview&filter=armRegionName%20eq%20'centralus'").content | jq .Items[].serviceName

(invoke-webrequest "https://prices.azure.com/api/retail/prices?api-version=2021-10-01-preview&filter=armRegionName%20eq%20'centralus'").content | jq .Items[].serviceName | sort -Unique

(invoke-webrequest "https://prices.azure.com/api/retail/prices?api-version=2021-10-01-preview&filter=armRegionName%20eq%20'centralus'").content | jq .Items[].armRegionName | sort -Unique 

$webReq = Invoke-WebRequest -Uri https://azure.microsoft.com/api/v1/pricing/virtual-machines/calculator/?culture=en-us | ConvertFrom-Json
foreach($obj in $webReq.offers.psobject.properties)
{
    $obj.value | Add-Member -NotePropertyName Name -NotePropertyValue $obj.Name -PassThru
}