---
title: Bash Commands
---

# Bash Commands

## Using Bash in VSCode DevContainers
### Installing PowerShell in a Debian container

```bash
###################################
# Prerequisites

# Update the list of packages
sudo apt-get update

# Install pre-requisite packages.
sudo apt-get install -y wget

# Download the PowerShell package file
wget https://github.com/PowerShell/PowerShell/releases/download/v7.4.5/powershell_7.4.5-1.deb_amd64.deb

###################################
# Install the PowerShell package
sudo dpkg -i powershell_7.4.5-1.deb_amd64.deb

# Resolve missing dependencies and finish the install (if necessary)
sudo apt-get install -f

# Delete the downloaded package file
rm powershell_7.4.5-1.deb_amd64.deb

# Start PowerShell
pwsh
```

#### References [^1]

### Installing the Azure AZ CLI in a Debian container
```bash
sudo apt-get update
sudo apt-get install apt
sudo mkdir -p /etc/apt/k
curl -sLS https://packag
sudo tee /etc/apt/keyrin
sudo chmod go+r /etc/apt
AZ_DIST=$(lsb_release -c
echo "Types: deb
URIs: https://packages.m
Suites: ${AZ_DIST}
Components: main
Architectures: $(dpkg --
Signed-by: /etc/apt/keyr
azure-cli.sources
sudo apt-get update
sudo apt-get install azu
az login
az devops configure --de
az devops extension list
```
#### References [^2]



### References
[^1]: [Installing Powershell - Microsoft.com](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell)
[^2]: [Installing AZ CLI - Microsoft.com](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-linux?view=azure-cli-latest&pivots=apt)
