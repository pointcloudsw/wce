---
title: Azure Backup
sidebar:
    order: 201
---
The first time you use Azure Backup, you must register the Azure Recovery Service provider in your subscription with Register-AzResourceProvider, as follows:

```powershell
Register-AzResourceProvider -ProviderNamespace "Microsoft.RecoveryServices"
```
![backup-method-comparison.png](backup-method-comparison.png)

Feature	Direct Backup of Files and Folders (using MARS Agent)	Azure VM Backup	Machines or apps with DPM/MABS
Back up to vault	Yes	Yes	Yes
Back up to DPM/MABS disk, then to Azure			Yes
Compress data sent for backup	Yes	No compression is used when transferring data. Storage is inflated slightly, but restoration is faster.	Yes
Run incremental backup	Yes	Yes	Yes
Back up deduplicated disks			Partially

For DPM/MABS servers deployed on-premises only.
