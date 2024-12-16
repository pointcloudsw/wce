
$tag = @{ Scope = 'Dev'; User = 'jroll@kforce.com'; Subject = 'az-104' }
$rg = @{ name = 'jroll_rg00'; Location = 'centralus'; Tag = $tag }

    # Resource Group
        New-AzResourceGroup @rg
    
    # Azure Key Vaults
    # https://learn.microsoft.com/en-us/azure/key-vault/general/key-vault-recovery?tabs=azure-powershell#key-vault-powershell

        # New Keyvault (one per each region of deployed resources)
        $akvname = "jroll-akv00"
        $azkv = @{ `
            ResourceGroupName = $rg.name; `
            Location = $rg.location; `
            Name = $akvname; `
            EnabledForDiskEncryption = 1; `
            EnabledForDeployment = 1; `
            EnabledForTemplateDeployment = 1; `
            EnablePurgeProtection = 0; `
            SoftDeleteRetentionInDays = 0; `
            Tag = $rg.tag `
        }
        New-AzKeyVault @azkv

        # Remove Keyvault
        Remove-AzKeyVault -Name $akvname
        Remove-AzKeyVault -Name $akvname -InRemovedState -Location $rg.Location -force
    
    # Recovery Services Vaults
    # Azure Storage
        $saccts = `
            @{ `
                Name = 'jrollsa00'; `
                Location = 'centralus'; `
                SkuName = 'Standard_ZRS'; `
                Kind = 'StorageV2'; `
                ResourceGroupName = $rg.name; `
            }
        
        foreach ( $s in $saccts ) { New-AzStorageAccount @s }
        
        $afiles = @{ `
            -Name = 'jroll-sa00-afiles00'; `
            -
        }

    # VNets and Subnets
        $vnets = `
            @{  `
                ResourceGroupName = $rg.name; `
                Tag = $rg.Tag; `
                Location = 'centralus'; `
                name = 'jroll_vnet00'; `
                addressPrefix = '10.0.0.0/16'; `
                subnet = @{  Name = 'jroll_vnet00_sn00'; AddressPrefix = '10.0.0.0/24' } `
            } `
            , @{  `
                ResourceGroupName = $rg.name; `
                Tag = $rg.Tag; `
                Location = 'eastus'; `
                name = 'jroll_vnet10'; `
                addressPrefix = '10.10.0.0/16'; `
                subnet = @{  Name = 'jroll_vnet10_sn00'; AddressPrefix = '10.10.0.0/24' } `
            } `
            , @{  `
                ResourceGroupName = $rg.name; `
                Tag = $rg.Tag; `
                Location = 'centralus'; `
                name = 'jroll_vnet15'; `
                addressPrefix = '10.15.0.0/16'; `
                subnet = @{  Name = 'jroll_vnet15_sn00'; AddressPrefix = '10.15.0.0/24' }, @{  Name = 'AzureBastionSubnet'; AddressPrefix = '10.15.15.0/24' } `
            } `
            , @{  `
                ResourceGroupName = $rg.name; `
                Tag = $rg.Tag; `
                Location = 'westus'; `
                name = 'jroll_vnet20'; `
                addressPrefix = '10.20.0.0/16'; `
                subnet = @{  Name = 'jroll_vnet20_sn00'; AddressPrefix = '10.20.0.0/24' } `
            } `
    
        foreach ( $n in $vnets ) { New-AzVirtualNetwork @n }
    
    # Bastion

    # Virtual Machines
    # https://learn.microsoft.com/en-us/azure/virtual-machines/windows/quick-create-template
    # https://learn.microsoft.com/en-us/azure/virtual-machines/windows/quick-create-powershell
    $vm = @{ `
        Name = 'jroll-vm-win00'; `
        ResourceGroupName = $rg.name; `
        Location = 'centralus'; `
        # Image = 'MicrosoftWindowsServer:WindowsServer:2022-datacenter-azure-edition:latest' `
        # 'Win2019Datacenter' | 'Win2022AzureEdition' | 'Win2022AzureEditionCore' | Win2022DataCenter' | 'Ubuntu2204' | 'Debian11'
        Image = 'Win2019Datacenter'; `
        VirtualNetworkName = 'jroll_vnet00'; `
        SubnetName = 'jroll_vnet00_sn00'; `
        # SecurityGroupName = 'xyz'; `
        # PublicIpAddressName = 'xyz'; `
        # OpenPorts = 80,3389; `
    }
    
    new-azvm @vm

    # Load Balancers
    # https://learn.microsoft.com/en-us/azure/load-balancer/quickstart-load-balancer-standard-internal-portal