---
title: Azure DNS RBAC Roles
sidebar:
    order: 1009
---

### Overview
### PowerShell Commands
```powershell
get-azRoleDefinition | where actions -like '*dns*'
get-azRoleDefinition "DNS Resolver Contributor" | select actions -ExpandProperty actions -Unique
```
### DNS Built-In RBAC Role Definitions 
<div class="not-content container c-col" style="--cols: 2fr 2fr 4fr;">
    <p class="c-hdr">DNS RBAC Role</p>
    <p class="c-hdr">Description</p>
    <p class="c-hdr">Providers</p>
    <p class="c-hbrdr"></p>
    <p class="c-hbrdr"></p>
    <p class="c-hbrdr"></p>
    <p><b>DNS Zone Contributor</b></p>
    <p>Manage DNS zones and record sets in Azure DNS, but does not let you control who has access to them.</p>
    <p>Microsoft.Authorization/*/read, Microsoft.Insights/alertRules/*, Microsoft.Network/dnsZones/*, Microsoft.ResourceHealth/availabilityStatuses/read, Microsoft.Resources/deployments/*, Microsoft.Resources/subscriptions/resourceGroups/read, Microsoft.Support/*</p>
    <p><b>Private DNS Zone Contributor</b></p>
    <p>Manage private DNS zone resources, but not the virtual networks they are linked to.</p>
    <p>Microsoft.Insights/alertRules/*, Microsoft.Resources/deployments/*, Microsoft.Resources/subscriptions/resourceGroups/read, Microsoft.Support/*, Microsoft.Network/privateDnsZones/*, Microsoft.Network/privateDnsOperationResults/*, Microsoft.Network/privateDnsOperationStatuses/*, Microsoft.Network/virtualNetworks/read, Microsoft.Network/virtualNetworks/join/action, Microsoft.Authorization/*/read</p>
    <p><b>DNS Resolver Contributor</b></p>
    <p>Manage DNS Resolver resources</p>
    <p>Microsoft.Network/dnsResolvers/read, Microsoft.Network/dnsResolvers/write, Microsoft.Network/dnsResolvers/delete, Microsoft.Network/dnsResolvers/join/action, Microsoft.Network/dnsResolvers/inboundEndpoints/read, Microsoft.Network/dnsResolvers/inboundEndpoints/write, Microsoft.Network/dnsResolvers/inboundEndpoints/delete, Microsoft.Network/dnsResolvers/inboundEndpoints/join/action, Microsoft.Network/dnsResolvers/outboundEndpoints/read, Microsoft.Network/dnsResolvers/outboundEndpoints/write, Microsoft.Network/dnsResolvers/outboundEndpoints/delete, Microsoft.Network/dnsResolvers/outboundEndpoints/join/action, Microsoft.Network/dnsForwardingRulesets/read, Microsoft.Network/dnsForwardingRulesets/write, Microsoft.Network/dnsForwardingRulesets/delete, Microsoft.Network/dnsForwardingRulesets/join/action, Microsoft.Network/dnsForwardingRulesets/forwardingRules/read, Microsoft.Network/dnsForwardingRulesets/forwardingRules/write, Microsoft.Network/dnsForwardingRulesets/forwardingRules/delete, Microsoft.Network/dnsForwardingRulesets/virtualNetworkLinks/read, Microsoft.Network/dnsForwardingRulesets/virtualNetworkLinks/write, Microsoft.Network/dnsForwardingRulesets/virtualNetworkLinks/delete, Microsoft.Network/locations/dnsResolverOperationResults/read, Microsoft.Network/locations/dnsResolverOperationStatuses/read, Microsoft.Network/virtualNetworks/read, Microsoft.Network/virtualNetworks/join/action, Microsoft.Network/virtualNetworks/subnets/read, Microsoft.Network/virtualNetworks/subnets/write, Microsoft.Network/virtualNetworks/subnets/join/action, Microsoft.Network/virtualNetworks/joinLoadBalancer/action, Microsoft.Network/virtualNetworks/subnets/joinLoadBalancer/action, Microsoft.Network/natGateways/join/action, Microsoft.Network/networkSecurityGroups/join/action, Microsoft.Network/routeTables/join/action, Microsoft.Network/serviceEndpointPolicies/join/action, Microsoft.Authorization/*/read, Microsoft.Resources/deployments/*, Microsoft.Insights/alertRules/*, Microsoft.Resources/subscriptions/resourceGroups/read</p>
</div>