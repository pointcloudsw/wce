
$SubscriptionId = get-AzSubscription -TenantId 73ec7808-5b5c-4971-b28c-663b15f02e0b
$VaultName = $res.name
$ResourceGroup = $rg.name

$VaultToDelete = Get-AzRecoveryServicesVault -Name $VaultName -ResourceGroupName $ResourceGroup
Set-AzRecoveryServicesAsrVaultContext -Vault $VaultToDelete

Set-AzRecoveryServicesVaultProperty -Vault $VaultToDelete.ID -SoftDeleteFeatureState Disable #disable soft delete
Write-Host "Soft delete disabled for the vault" $VaultName
$containerSoftDelete = Get-AzRecoveryServicesBackupItem -BackupManagementType AzureVM -WorkloadType AzureVM -VaultId $VaultToDelete.ID | Where-Object {$_.DeleteState -eq "ToBeDeleted"} #fetch backup items in soft delete state
foreach ($softitem in $containerSoftDelete)
{
    Undo-AzRecoveryServicesBackupItemDeletion -Item $softitem -VaultId $VaultToDelete.ID -Force #undelete items in soft delete state
}

#Invoking API to disable Security features (Enhanced Security) to remove MARS/MAB/DPM servers.
Set-AzRecoveryServicesVaultProperty -VaultId $VaultToDelete.ID -DisableHybridBackupSecurityFeature $true
Write-Host "Disabled Security features for the vault"

#Fetch all protected items and servers
$backupItemsVM = Get-AzRecoveryServicesBackupItem -BackupManagementType AzureVM -WorkloadType AzureVM -VaultId $VaultToDelete.ID
$backupItemsSQL = Get-AzRecoveryServicesBackupItem -BackupManagementType AzureWorkload -WorkloadType MSSQL -VaultId $VaultToDelete.ID
$backupItemsAFS = Get-AzRecoveryServicesBackupItem -BackupManagementType AzureStorage -WorkloadType AzureFiles -VaultId $VaultToDelete.ID
$backupItemsSAP = Get-AzRecoveryServicesBackupItem -BackupManagementType AzureWorkload -WorkloadType SAPHanaDatabase -VaultId $VaultToDelete.ID
$backupContainersSQL = Get-AzRecoveryServicesBackupContainer -ContainerType AzureVMAppContainer -VaultId $VaultToDelete.ID | Where-Object {$_.ExtendedInfo.WorkloadType -eq "SQL"}
$protectableItemsSQL = Get-AzRecoveryServicesBackupProtectableItem -WorkloadType MSSQL -VaultId $VaultToDelete.ID | Where-Object {$_.IsAutoProtected -eq $true}
$backupContainersSAP = Get-AzRecoveryServicesBackupContainer -ContainerType AzureVMAppContainer -VaultId $VaultToDelete.ID | Where-Object {$_.ExtendedInfo.WorkloadType -eq "SAPHana"}
$StorageAccounts = Get-AzRecoveryServicesBackupContainer -ContainerType AzureStorage -VaultId $VaultToDelete.ID
$backupServersMARS = Get-AzRecoveryServicesBackupContainer -ContainerType "Windows" -BackupManagementType MAB -VaultId $VaultToDelete.ID
$backupServersMABS = Get-AzRecoveryServicesBackupManagementServer -VaultId $VaultToDelete.ID| Where-Object { $_.BackupManagementType -eq "AzureBackupServer" }
$backupServersDPM = Get-AzRecoveryServicesBackupManagementServer -VaultId $VaultToDelete.ID | Where-Object { $_.BackupManagementType-eq "SCDPM" }
$pvtendpoints = Get-AzPrivateEndpointConnection -PrivateLinkResourceId $VaultToDelete.ID

foreach($item in $backupItemsVM)
    {
        Disable-AzRecoveryServicesBackupProtection -Item $item -VaultId $VaultToDelete.ID -RemoveRecoveryPoints -Force #stop backup and delete Azure VM backup items
    }
Write-Host "Disabled and deleted Azure VM backup items"

foreach($item in $backupItemsSQL)
    {
        Disable-AzRecoveryServicesBackupProtection -Item $item -VaultId $VaultToDelete.ID -RemoveRecoveryPoints -Force #stop backup and delete SQL Server in Azure VM backup items
    }
Write-Host "Disabled and deleted SQL Server backup items"

foreach($item in $protectableItemsSQL)
    {
        Disable-AzRecoveryServicesBackupAutoProtection -BackupManagementType AzureWorkload -WorkloadType MSSQL -InputItem $item -VaultId $VaultToDelete.ID #disable auto-protection for SQL
    }
Write-Host "Disabled auto-protection and deleted SQL protectable items"

foreach($item in $backupContainersSQL)
    {
        Unregister-AzRecoveryServicesBackupContainer -Container $item -Force -VaultId $VaultToDelete.ID #unregister SQL Server in Azure VM protected server
    }
Write-Host "Deleted SQL Servers in Azure VM containers"

foreach($item in $backupItemsSAP)
    {
        Disable-AzRecoveryServicesBackupProtection -Item $item -VaultId $VaultToDelete.ID -RemoveRecoveryPoints -Force #stop backup and delete SAP HANA in Azure VM backup items
    }
Write-Host "Disabled and deleted SAP HANA backup items"

foreach($item in $backupContainersSAP)
    {
        Unregister-AzRecoveryServicesBackupContainer -Container $item -Force -VaultId $VaultToDelete.ID #unregister SAP HANA in Azure VM protected server
    }
Write-Host "Deleted SAP HANA in Azure VM containers"

foreach($item in $backupItemsAFS)
    {
        Disable-AzRecoveryServicesBackupProtection -Item $item -VaultId $VaultToDelete.ID -RemoveRecoveryPoints -Force #stop backup and delete Azure File Shares backup items
    }
Write-Host "Disabled and deleted Azure File Share backups"

foreach($item in $StorageAccounts)
    {
        Unregister-AzRecoveryServicesBackupContainer -container $item -Force -VaultId $VaultToDelete.ID #unregister storage accounts
    }
Write-Host "Unregistered Storage Accounts"

foreach($item in $backupServersMARS)
    {
        Unregister-AzRecoveryServicesBackupContainer -Container $item -Force -VaultId $VaultToDelete.ID #unregister MARS servers and delete corresponding backup items
    }
Write-Host "Deleted MARS Servers"

foreach($item in $backupServersMABS)
    {
        Unregister-AzRecoveryServicesBackupManagementServer -AzureRmBackupManagementServer $item -VaultId $VaultToDelete.ID #unregister MABS servers and delete corresponding backup items
    }
Write-Host "Deleted MAB Servers"

foreach($item in $backupServersDPM)
    {
        Unregister-AzRecoveryServicesBackupManagementServer -AzureRmBackupManagementServer $item -VaultId $VaultToDelete.ID #unregister DPM servers and delete corresponding backup items
    }
Write-Host "Deleted DPM Servers"

#Deletion of ASR Items

$fabricObjects = Get-AzRecoveryServicesAsrFabric
if ($null -ne $fabricObjects) {
    # First DisableDR all VMs.
    foreach ($fabricObject in $fabricObjects) {
        $containerObjects = Get-AzRecoveryServicesAsrProtectionContainer -Fabric $fabricObject
        foreach ($containerObject in $containerObjects) {
            $protectedItems = Get-AzRecoveryServicesAsrReplicationProtectedItem -ProtectionContainer $containerObject
            # DisableDR all protected items
            foreach ($protectedItem in $protectedItems) {
                Write-Host "Triggering DisableDR(Purge) for item:" $protectedItem.Name
                Remove-AzRecoveryServicesAsrReplicationProtectedItem -InputObject $protectedItem -Force
                Write-Host "DisableDR(Purge) completed"
            }

$containerMappings = Get-AzRecoveryServicesAsrProtectionContainerMapping -ProtectionContainer $containerObject
            # Remove all Container Mappings
            foreach ($containerMapping in $containerMappings) {
                Write-Host "Triggering Remove Container Mapping: " $containerMapping.Name
                Remove-AzRecoveryServicesAsrProtectionContainerMapping -ProtectionContainerMapping $containerMapping -Force
                Write-Host "Removed Container Mapping."
            }
        }
        $NetworkObjects = Get-AzRecoveryServicesAsrNetwork -Fabric $fabricObject
        foreach ($networkObject in $NetworkObjects)
        {
            #Get the PrimaryNetwork
            $PrimaryNetwork = Get-AzRecoveryServicesAsrNetwork -Fabric $fabricObject -FriendlyName $networkObject
            $NetworkMappings = Get-AzRecoveryServicesAsrNetworkMapping -Network $PrimaryNetwork
            foreach ($networkMappingObject in $NetworkMappings)
            {
                #Get the Network Mappings
                $NetworkMapping = Get-AzRecoveryServicesAsrNetworkMapping -Name $networkMappingObject.Name -Network $PrimaryNetwork
                Remove-AzRecoveryServicesAsrNetworkMapping -InputObject $NetworkMapping
            }
        }
        # Remove Fabric
        Write-Host "Triggering Remove Fabric:" $fabricObject.FriendlyName
        Remove-AzRecoveryServicesAsrFabric -InputObject $fabricObject -Force
        Write-Host "Removed Fabric."
    }
}

foreach($item in $pvtendpoints)
    {
        $penamesplit = $item.Name.Split(".")
        $pename = $penamesplit[0]
        Remove-AzPrivateEndpointConnection -ResourceId $item.Id -Force #remove private endpoint connections
        Remove-AzPrivateEndpoint -Name $pename -ResourceGroupName $ResourceGroup -Force #remove private endpoints
    }
Write-Host "Removed Private Endpoints"

#Recheck ASR items in vault
$fabricCount = 0
$ASRProtectedItems = 0
$ASRPolicyMappings = 0
$fabricObjects = Get-AzRecoveryServicesAsrFabric
if ($null -ne $fabricObjects) {
    foreach ($fabricObject in $fabricObjects) {
        $containerObjects = Get-AzRecoveryServicesAsrProtectionContainer -Fabric $fabricObject
        foreach ($containerObject in $containerObjects) {
            $protectedItems = Get-AzRecoveryServicesAsrReplicationProtectedItem -ProtectionContainer $containerObject
            foreach ($protectedItem in $protectedItems) {
                $ASRProtectedItems++
            }
            $containerMappings = Get-AzRecoveryServicesAsrProtectionContainerMapping -ProtectionContainer $containerObject
            foreach ($containerMapping in $containerMappings) {
                $ASRPolicyMappings++
            }
        }
        $fabricCount++
    }
}
#Recheck presence of backup items in vault
$backupItemsVMFin = Get-AzRecoveryServicesBackupItem -BackupManagementType AzureVM -WorkloadType AzureVM -VaultId $VaultToDelete.ID
$backupItemsSQLFin = Get-AzRecoveryServicesBackupItem -BackupManagementType AzureWorkload -WorkloadType MSSQL -VaultId $VaultToDelete.ID
$backupContainersSQLFin = Get-AzRecoveryServicesBackupContainer -ContainerType AzureVMAppContainer -VaultId $VaultToDelete.ID | Where-Object {$_.ExtendedInfo.WorkloadType -eq "SQL"}
$protectableItemsSQLFin = Get-AzRecoveryServicesBackupProtectableItem -WorkloadType MSSQL -VaultId $VaultToDelete.ID | Where-Object {$_.IsAutoProtected -eq $true}
$backupItemsSAPFin = Get-AzRecoveryServicesBackupItem -BackupManagementType AzureWorkload -WorkloadType SAPHanaDatabase -VaultId $VaultToDelete.ID
$backupContainersSAPFin = Get-AzRecoveryServicesBackupContainer -ContainerType AzureVMAppContainer -VaultId $VaultToDelete.ID | Where-Object {$_.ExtendedInfo.WorkloadType -eq "SAPHana"}
$backupItemsAFSFin = Get-AzRecoveryServicesBackupItem -BackupManagementType AzureStorage -WorkloadType AzureFiles -VaultId $VaultToDelete.ID
$StorageAccountsFin = Get-AzRecoveryServicesBackupContainer -ContainerType AzureStorage -VaultId $VaultToDelete.ID
$backupServersMARSFin = Get-AzRecoveryServicesBackupContainer -ContainerType "Windows" -BackupManagementType MAB -VaultId $VaultToDelete.ID
$backupServersMABSFin = Get-AzRecoveryServicesBackupManagementServer -VaultId $VaultToDelete.ID| Where-Object { $_.BackupManagementType -eq "AzureBackupServer" }
$backupServersDPMFin = Get-AzRecoveryServicesBackupManagementServer -VaultId $VaultToDelete.ID | Where-Object { $_.BackupManagementType-eq "SCDPM" }
$pvtendpointsFin = Get-AzPrivateEndpointConnection -PrivateLinkResourceId $VaultToDelete.ID

#Display items which are still present in the vault and might be preventing vault deletion.

if($backupItemsVMFin.count -ne 0) {Write-Host $backupItemsVMFin.count "Azure VM backups are still present in the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($backupItemsSQLFin.count -ne 0) {Write-Host $backupItemsSQLFin.count "SQL Server Backup Items are still present in the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($backupContainersSQLFin.count -ne 0) {Write-Host $backupContainersSQLFin.count "SQL Server Backup Containers are still registered to the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($protectableItemsSQLFin.count -ne 0) {Write-Host $protectableItemsSQLFin.count "SQL Server Instances are still present in the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($backupItemsSAPFin.count -ne 0) {Write-Host $backupItemsSAPFin.count "SAP HANA Backup Items are still present in the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($backupContainersSAPFin.count -ne 0) {Write-Host $backupContainersSAPFin.count "SAP HANA Backup Containers are still registered to the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($backupItemsAFSFin.count -ne 0) {Write-Host $backupItemsAFSFin.count "Azure File Shares are still present in the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($StorageAccountsFin.count -ne 0) {Write-Host $StorageAccountsFin.count "Storage Accounts are still registered to the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($backupServersMARSFin.count -ne 0) {Write-Host $backupServersMARSFin.count "MARS Servers are still registered to the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($backupServersMABSFin.count -ne 0) {Write-Host $backupServersMABSFin.count "MAB Servers are still registered to the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($backupServersDPMFin.count -ne 0) {Write-Host $backupServersDPMFin.count "DPM Servers are still registered to the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($ASRProtectedItems -ne 0) {Write-Host $ASRProtectedItems "ASR protected items are still present in the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($ASRPolicyMappings -ne 0) {Write-Host $ASRPolicyMappings "ASR policy mappings are still present in the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($fabricCount -ne 0) {Write-Host $fabricCount "ASR Fabrics are still present in the vault. Remove the same for successful vault deletion." -ForegroundColor Red}
if($pvtendpointsFin.count -ne 0) {Write-Host $pvtendpointsFin.count "Private endpoints are still linked to the vault. Remove the same for successful vault deletion." -ForegroundColor Red}

$accesstoken = Get-AzAccessToken
$token = $accesstoken.Token
$authHeader = @{
    'Content-Type'='application/json'
    'Authorization'='Bearer ' + $token
}
$restUri = "https://management.azure.com/subscriptions/"+$SubscriptionId+'/resourcegroups/'+$ResourceGroup+'/providers/Microsoft.RecoveryServices/vaults/'+$VaultName+'?api-version=2021-06-01&operation=DeleteVaultUsingPS'
$response = Invoke-RestMethod -Uri $restUri -Headers $authHeader -Method DELETE

$VaultDeleted = Get-AzRecoveryServicesVault -Name $VaultName -ResourceGroupName $ResourceGroup -ErrorAction 'SilentlyContinue'
if ($VaultDeleted -eq $null){
Write-Host "Recovery Services Vault" $VaultName "successfully deleted"
}
#Finish