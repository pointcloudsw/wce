---
title: Azure Disk Backup
---
How the backup and restore process works
The first step in configuring backup for Azure Managed Disks is creating a Backup vault. The vault gives you a consolidated view of the backups configured across different workloads. Azure Disk backup supports only Operational Tier backup. Copying of backups to the vault storage tier is not supported. So, the Backup vault storage redundancy setting (LRS/GRS) doesn't apply to the backups stored in Operational Tier.

Then create a Backup policy that allows you to configure backup frequency and retention duration.

To configure backup, go to the Backup vault, assign a backup policy, select the managed disk that needs to be backed up and provide a resource group where the snapshots are to be stored and managed. Azure Backup automatically triggers scheduled backup jobs that create an incremental snapshot of the disk according to the backup frequency. Older snapshots are deleted according to the retention duration specified by the backup policy.

Azure Backup uses incremental snapshots of the managed disk. Incremental snapshots are a cost-effective, point-in-time backup of managed disks that are billed for the delta changes to the disk since the last snapshot. These are always stored on the most cost-effective storage, standard HDD storage regardless of the storage type of the parent disks. The first snapshot of the disk will occupy the used size of the disk, and consecutive incremental snapshots store delta changes to the disk since the last snapshot. Azure Backup automatically assigns tag to the snapshots it creates to uniquely identify them.

Once you configure the backup of a managed disk, a backup instance will be created within the backup vault. Using the backup instance, you can find health of backup operations, trigger on-demand backups, and perform restore operations. You can also view health of backups across multiple vaults and backup instances using Backup Center, which provides a single pane of glass view.

To restore, just select the recovery point from which you want to restore the disk. Provide the resource group where the restored disk is to be created from the snapshot. Azure Backup provides an instant restore experience since the snapshots are stored locally in your subscription.

Backup Vault uses Managed Identity to access other Azure resources. To configure backup of a managed disk and to restore from past backup, Backup Vault’s managed identity requires a set of permissions on the source disk, the snapshot resource group where snapshots are created and managed, and the target resource group where you want to restore the backup. You can grant permissions to the managed identity by using Azure role-based access control (Azure RBAC). Managed identity is a service principal of a special type that may only be used with Azure resources. Learn more about Managed Identities.

Currently Azure Disk Backup supports operational backup of managed disks and doesn't copy the backups to Backup Vault storage. Refer to the support matrix for a detailed list of supported and unsupported scenarios, and region availability.
