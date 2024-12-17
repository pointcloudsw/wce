
$tag = @{ Scope = 'Dev'; User = 'jroll@kforce.com'; Subject = 'az-104' }
$rg = @{ name = 'jroll_rg00'; Location = 'centralus'; Tag = $tag }

# Tag policy
    # https://learn.microsoft.com/en-us/azure/governance/policy/assign-policy-powershell
    # https://github.com/Azure/azure-policy/blob/master/built-in-policies/policyDefinitions/Tags/ApplyTag_Append.json
    #  'Append a tag and its value to resources'
    $trg = Get-AzResourceGroup -Name $rg.name

    # $definition = Get-AzPolicyDefinition | Where-Object { $_.DisplayName -eq 'Append a tag and its value to resources' }

    # get-azpolicyDefinition -Builtin | where DisplayName -eq 'Add a tag to resources' | fl -Property *
    $tagPolDef =  get-AzpolicyDefinition | where DisplayName -eq 'Add a tag to resources'

    $tagName = 'New Tag Name'
    $tagVal = 'New Tag Value'
    $policyParms = @{ `
        tagName='New Tag Name'; `
        tagValue='New Tag Value'; `
    }
    $tagPolParms = @{ `
        Name = 'add-tag-to-rg-resources'; `
        DisplayName = 'jroll-Tag RG resources'; `
        Scope = $trg.ResourceId; `
        PolicyDefinition = $tagPolDef; `
        Description = 'add a tag'; `
        # PolicyParameterObject = $policyParms; `
        }
    
        New-AzPolicyAssignment @tagPolParms -PolicyParameterObject @{ tagName='TagA1'; tagValue='TagA1Value' }        



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
            }, `
            @{ `
                Name = 'jrollsa01'; `
                Location = 'westus'; `
                SkuName = 'Standard_GRS'; `
                Kind = 'StorageV2'; `
                ResourceGroupName = $rg.name; `
            }, `
            @{ `
                Name = 'jrollsa02'; `
                Location = 'southcentralus'; `
                SkuName = 'Standard_RAGRS'; `
                Kind = 'StorageV2'; `
                ResourceGroupName = $rg.name; `
            }
        
        
        # Create storage accounts
        foreach ( $s in $saccts ) { New-AzStorageAccount @s }
        
        # Display storage account information
        foreach ( $s in $saccts ) { Get-AzStorageAccount -Name $s.Name -ResourceGroupName $s.ResourceGroupName | fl -Property * }

        # Remove storage accounts
        foreach ( $s in $saccts ) {  Remove-AzStorageAccount -Name $s.name -ResourceGroupName $s.resourcegroupname -Force }

        # Set storage account context
        $sactx = Get-AzStorageAccount -Name jrollsa01 -ResourceGroupName $rg.name

        # New storage account container
        new-azstorageContainer -Name 'sa01c00' -Context $sactx.Context

        # New Azure File Share in the storage account
        New-AzRmStorageShare -Name 'sa01s00' -ResourceGroupName $rg.name -StorageAccountName $sawest.Context.Name -QuotaGiB 1024 -EnabledProtocol SMB

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

    ### App Service Plan
    new-AzAppServicePlan -ResourceGroupName $rg.name -name jroll-asp -Location $rg.Location -Tier Basic

    new-azwebapp -ResourceGroupName $rg.name -Location $rg.Location -AppServicePlan jroll-asp -Name jroll-wapp -Tag $rg.Tag

    Remove-AzAppServicePlan -Name jroll-asp -ResourceGroupName $rg.name -Force

