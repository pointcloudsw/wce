---
title: Backup Features
sidebar:
    order: 210
---
## Backup features

The following table summarizes the supported features for the different types of backup:

| **Feature** | **Direct Backup of Files and Folders (using MARS Agent)** | **Azure VM Backup** | **Machines or apps with DPM/MABS** |
| --- | --- | --- | --- |
| Back up to vault | Yes | Yes | Yes |
| Back up to DPM/MABS disk, then to Azure |     |     | Yes |
| Compress data sent for backup | Yes | No compression is used when transferring data. Storage is inflated slightly, but restoration is faster. | Yes |
| Run incremental backup | Yes | Yes | Yes |
| Back up deduplicated disks |     |     | Partially  <br>  <br>For DPM/MABS servers deployed on-premises only. |