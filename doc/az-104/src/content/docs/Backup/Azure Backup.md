---
title: Azure Backup
---
The first time you use Azure Backup, you must register the Azure Recovery Service provider in your subscription with Register-AzResourceProvider, as follows:

```powershell
Register-AzResourceProvider -ProviderNamespace "Microsoft.RecoveryServices"
```
