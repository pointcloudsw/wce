
$tag = @{ Scope = 'Dev'; User = 'jroll@kforce.com'; Subject = 'az-104' }
$rg = @{ name = 'jroll_rg00'; Location = 'centralus'; Tag = $tag }

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

# Virtual Machines

New-AzResourceGroup @rg

foreach ( $n in $vnets ) { New-AzVirtualNetwork @n }

