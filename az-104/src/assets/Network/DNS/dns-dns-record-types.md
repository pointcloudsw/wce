<table>
    <thead>
        <tr>
            <th>DNS Record Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>A</td>
            <td>An "A-Record" (A) maps a fully-qualified domain name (FQDN) to an IPv4 address</td>
        </tr>
        <tr>
            <td>AAAA</td>
            <td>A "Quad A-Record" (AAAA) maps a fully-qualified domain name (FQDN) to an IPv6 address</td>
        </tr>
        <td>CAA</td>
        <td>The Certification Authority Authorization (CAA) Resource Record allow domain owners to specify which
            Certificate Authorities (CAs) are authorized to issue certificates for their domain. If no CAA record exists, then anyone can issue a certificate for the domain. These records are also inherited by subdomains. This record allows CAs
            to avoid mis-issuing certificates in some circumstances. CAA records have three properties:
            <ul class="shin">
                <li><b>Flags</b>: This field is an integer between 0 and 255, used to represent the critical flag that
                    has special meaning per <a class="tab" href="https://tools.ietf.org/html/rfc6844#section-3"
                        target="_blank">RFC6844</a></li>
                <li><b>Tag</b>: an ASCII string that can be one of the following:<ul class="shin">
                        <li><b>issue</b>: if you want to specify CAs that are permitted to issue certs (all types)</li>
                        <li><b>issuewild</b>: if you want to specify CAs that are permitted to issue certs (wildcard
                            certs only)</li>
                        <li><b>iodef</b>: specify an email address or hostname to which CAs can notify for unauthorized
                            cert issue requests</li>
                    </ul>
                <li><b>Value</b>: the value for the specific Tag chosen</li>
            </ul>
        </td>
        </tr>
        <tr>
            <td><a class="tab" href="https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/"
                    target="_blank">CNAME</a></td>
            <td>The DNS CNAME record works as an alias for domain names, thereby "translating" requests for one domain
                or subdomain to another domain so long as the IP address of the canonical name is equipped to handle
                requests associated with the alias names as well as requests associated directly to itself. In other
                words, the aliases defined through CNAME records will resolve to the same IP address (e.g., the same A-
                and AAAA-record) as the domain they point to. Which means, the aliases and the cononical name all appear
                to "share" the same IP address.
            </td>
        </tr>
        <tr>
            <td><a class="tab" href="https://www.cloudflare.com/learning/dns/dns-records/dns-ns-record/"
                    target="_blank">NS</a></td>
            <td><p>The Name Server (NS) record stores the name server for a DNS entry.  As such, the NS record set at the zone apex (name '@') gets created automatically with each DNS zone and gets deleted automatically when the zone gets deleted. The NS records can't be deleted unless and until the zone itself is deleted.</p>
            <p>This record set contains the names of the Azure DNS name servers assigned to the zone. You can add more name servers to this NS record set, to support cohosting domains with more than one DNS provider. You can also modify the TTL and metadata for this record set. However, removing or modifying the prepopulated Azure DNS name servers isn't allowed.</p>
            <p>This restriction only applies to the NS record set at the zone apex. Other NS record sets in your zone (as used to delegate child zones) can be created, modified, and deleted without constraint.</p>
            </td>
        </tr>
        <tr>
            <td><a class="tab" href="https://www.cloudflare.com/learning/dns/dns-records/dns-ptr-record/"
                    target="_blank">PTR</a></td>
            <td>
                <p>The DNS Pointer (PTR) record is exactly the opposite of the 'A' record, which provides the IP address associated with a domain name. The Pointer (PTR) record is used for reverse DNS lookups, returning the domain name associated with an IP address.</p>
                <p>DNS PTR records are used in reverse DNS lookups. When a user attempts to reach a domain name in their browser, a DNS lookup occurs, matching the domain name to the IP address. A reverse DNS lookup is the opposite of this process: it is a query that starts with the IP address and looks up the domain name.</p>
                <p>PTR records are used in reverse DNS lookups; common uses for reverse DNS include:</p>
                <span>
                    <ul class="not-content shin">
                        <li><b>Anti-spam</b>: Some email anti-spam filters use reverse DNS to check the domain names of email addresses and see if the associated IP addresses are likely to be used by legitimate email servers.</li>
                        <li><b>Troubleshooting email delivery</b>:If a domain has no PTR record, or if the PTR record contains the wrong domain, email services may block all emails from that domain.</li>
                        <li><b>Logging</b>:System logs typically record only IP addresses; a reverse DNS lookup can convert these into domain names for logs that are more human-readable.</li>
                    </ul>
                </span>
            </td>
        </tr>
        <tr>
            <td><a class="tab" href="https://www.cloudflare.com/learning/dns/dns-records/dns-soa-record/"
                    target="_blank">SOA</a></td>
            <td><p>The DNS Start of Authority (SOA) record stores important administrative information about a domain and who is responsible for it.  For example, SOA records for a domain or zone will typically include the email address of the administrator, when the domain was last updated, and how long the server should wait between refreshes. </p><p>In Azure DNS, admins can modify all properties of the SOA record in Azure except for the `host` property. This property gets preconfigured to refer to the primary name server name provided by Azure DNS.</p>
            <p>All DNS zones need an SOA record in order to conform to IETF standards. SOA records are also important for zone transfers.</p>
            </td>
        </tr>
        <tr>
            <td><a class="tab" href="https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/"
                    target="_blank">SPF</a></td>
            <td><p>DNS Sender Policy Framework (SPF) records are a type of DNS TXT record commonly used for email authentication. SPF records include a list of IP addresses and domains authorized to send emails from that domain.  Sender policy framework (SPF) records are used to specify which email servers can send email on behalf of a domain name. Correct configuration of SPF records is important to prevent recipients from marking your email as junk.</p>
            </td>
        </tr>
        <tr>
            <td><a class="tab" href="https://www.cloudflare.com/learning/dns/dns-records/dns-srv-record/"
                    target="_blank">SRV</a></td>
            <td>
                <p>SRV records are used by various services to specify server locations and port numbers, especially for services such as VoIP. When specifying an SRV record in Azure DNS:</p>
                <ul class="shin">
                    <li>The service and protocol must be specified as part of the record set name, prefixed with underscores, such as `_sip._tcp.name`</li>
                    <li>For a record at the zone apex, there's no need to specify '@' in the record name, simply use the service and protocol, such as `_sip._tcp`</li>
                    <li>Priority, weight, port, and target are specified as parameters of each record in the record set</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><a class="tab" href="https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/" target="_blank">TXT</a></td>
            <td><p>DNS text (TXT) records are used to map domain names to arbitrary text strings. They're used in multiple applications, in particular related to email configuration, such as the Sender Policy Framework (SPF Sender Policy Framework and DomainKeys Identified Mail (DKIM).</p>
            <p>The DNS standards permit a single TXT record to contain multiple strings, each of which can be up to 255 characters in length. Where multiple strings are used, they're concatenated by clients and treated as a single string.</p>
            <p>The multiple strings in a DNS record shouldn't be confused with the multiple TXT records in a TXT record set. A TXT record set can contain multiple records, each of which can contain multiple strings. Azure DNS supports a total string length of up to 4096 characters in each TXT record set (across all records combined).</p>
            <p>When calling the Azure DNS REST API, you need to specify each TXT string separately. When you use the Azure portal, PowerShell, or CLI interfaces, you should specify a single string per record. This string is automatically divided into 255-character segments if necessary.</p>
            </td>
        </tr>
    </tbody>
</table>