#### Azure-provided DNS resolver VM limits
:::note
These limits apply **only to**
- Queries from each VM within the VNet against Azure's **default Azure resolver**
- Each individual VM, not to the VNet itself
:::

<div class="not-content a-3-1">
    <p class="hdr">Resource</p>
    <p class="hdr">Limit</p>
    <p>Number of DNS queries a virtual machine can send to Azure DNS resolver, per second</p>
    <p>1000</p>
    <p>Maximum number of DNS queries queued (pending response) per virtual machine</p>
    <p>200</p>
    <p></p>
    <p></p>
</div>

:::danger
DNS queries exceeding these limits are dropped. 
:::

:::note
These limits **do not** apply to
- Queries against the **Azure DNS private resolver.**
- Sum of queries from VMs at the VNet level
:::