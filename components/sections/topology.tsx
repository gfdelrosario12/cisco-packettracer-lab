import { Card } from '@/components/ui/card'

export default function TopologySection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Topology & Inventory</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Complete physical and logical network architecture
        </p>
      </div>

      <Card className="border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Logical Architecture</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p><span className="text-foreground font-medium">Core Layer:</span> Two ISR 4321 routers (R1, R2) provide redundant default gateway (HSRP) and WAN failover.</p>
          <p><span className="text-foreground font-medium">Distribution Layer:</span> One Catalyst 3650-24PS Layer 3 switch (SW-DIST) handles inter-VLAN routing, DHCP, ACL enforcement, and connects servers and AP.</p>
          <p><span className="text-foreground font-medium">Access Layer:</span> Three Catalyst 2960-24TT Layer 2 switches (ACSW1–3) serve wired clients with port security and DHCP snooping.</p>
          <p><span className="text-foreground font-medium">Edge Layer:</span> Two ISR 4321 routers (ISP1, ISP2) simulate dual ISPs; each connects to one core router.</p>
          <p><span className="text-foreground font-medium">Wireless:</span> One Aironet 3702i Access Point bridging wireless clients into VLAN 40 (Guest).</p>
          <p><span className="text-foreground font-medium">Servers:</span> Syslog, DNS, and DMZ Web server directly attached to SW-DIST.</p>
        </div>
      </Card>

      <Card className="border-border bg-card p-6 overflow-x-auto">
        <h3 className="font-semibold text-foreground mb-4">Physical Connections & Port Mapping</h3>
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground">Device</th>
              <th className="text-left py-2 text-muted-foreground">Interface</th>
              <th className="text-left py-2 text-muted-foreground">Connected To</th>
              <th className="text-left py-2 text-muted-foreground">Mode / VLAN</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Gi1/0/1-2</td>
              <td className="py-2 text-muted-foreground">ACSW1</td>
              <td className="py-2 text-muted-foreground">LACP Po1, Trunk</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Gi1/0/3-4</td>
              <td className="py-2 text-muted-foreground">ACSW2</td>
              <td className="py-2 text-muted-foreground">LACP Po2, Trunk</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Gi1/0/5-6</td>
              <td className="py-2 text-muted-foreground">ACSW3</td>
              <td className="py-2 text-muted-foreground">LACP Po3, Trunk</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Gi1/0/7</td>
              <td className="py-2 text-muted-foreground">R1</td>
              <td className="py-2 text-muted-foreground">Access VLAN 99</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Gi1/0/8</td>
              <td className="py-2 text-muted-foreground">R2</td>
              <td className="py-2 text-muted-foreground">Access VLAN 99</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Gi1/0/9</td>
              <td className="py-2 text-muted-foreground">Syslog Server</td>
              <td className="py-2 text-muted-foreground">Access VLAN 50</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Gi1/0/10</td>
              <td className="py-2 text-muted-foreground">DNS Server</td>
              <td className="py-2 text-muted-foreground">Access VLAN 50</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Gi1/0/11</td>
              <td className="py-2 text-muted-foreground">Web Server</td>
              <td className="py-2 text-muted-foreground">Access VLAN 60</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Gi1/0/12</td>
              <td className="py-2 text-muted-foreground">AP</td>
              <td className="py-2 text-muted-foreground">Trunk, native 30</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">R1</td>
              <td className="py-2 text-muted-foreground">Gi0/0/1</td>
              <td className="py-2 text-muted-foreground">ISP1</td>
              <td className="py-2 text-muted-foreground">WAN (200.0.0.0/30)</td>
            </tr>
            <tr>
              <td className="py-2 text-foreground">R2</td>
              <td className="py-2 text-muted-foreground">Gi0/0/1</td>
              <td className="py-2 text-muted-foreground">ISP2</td>
              <td className="py-2 text-muted-foreground">WAN (200.0.1.0/30)</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card className="border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Wireless Clients</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><span className="text-foreground font-medium">SSID:</span> NoContext-WiFi</p>
          <p><span className="text-foreground font-medium">Security:</span> WPA2-Personal</p>
          <p><span className="text-foreground font-medium">Passphrase:</span> nocontext@2026</p>
          <p><span className="text-foreground font-medium">VLAN:</span> 40 (Guest)</p>
          <p><span className="text-foreground font-medium">IP Range:</span> 10.0.40.101–150 (DHCP)</p>
          <p className="mt-4">4 wireless laptops connect to this network and are isolated from internal VLANs.</p>
        </div>
      </Card>
    </div>
  )
}
