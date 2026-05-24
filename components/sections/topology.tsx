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

      <Card className="border-border bg-card p-6 overflow-x-auto">
        <h3 className="font-semibold text-foreground mb-4">Unified Physical Connections</h3>
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground">Device A</th>
              <th className="text-left py-2 text-muted-foreground">Interface A</th>
              <th className="text-left py-2 text-muted-foreground">Device B</th>
              <th className="text-left py-2 text-muted-foreground">Interface B</th>
              <th className="text-left py-2 text-muted-foreground">Link Type / VLAN</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Fa0/1-2</td>
              <td className="py-2 text-foreground">ACSW1</td>
              <td className="py-2 text-muted-foreground">Fa0/1-2</td>
              <td className="py-2 text-muted-foreground">LACP Po1, Trunk (10,20,30,40)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Fa0/3-4</td>
              <td className="py-2 text-foreground">ACSW2</td>
              <td className="py-2 text-muted-foreground">Fa0/1-2</td>
              <td className="py-2 text-muted-foreground">LACP Po2, Trunk (10,20,30,40)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Fa0/5-6</td>
              <td className="py-2 text-foreground">ACSW3</td>
              <td className="py-2 text-muted-foreground">Fa0/1-2</td>
              <td className="py-2 text-muted-foreground">LACP Po3, Trunk (10,20,30,40)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Fa0/7</td>
              <td className="py-2 text-foreground">R1</td>
              <td className="py-2 text-muted-foreground">Gi0/0/0</td>
              <td className="py-2 text-muted-foreground">Access VLAN 99</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Fa0/8</td>
              <td className="py-2 text-foreground">R2</td>
              <td className="py-2 text-muted-foreground">Gi0/0/0</td>
              <td className="py-2 text-muted-foreground">Access VLAN 99</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Fa0/9</td>
              <td className="py-2 text-foreground">Syslog Server</td>
              <td className="py-2 text-muted-foreground">NIC</td>
              <td className="py-2 text-muted-foreground">Access VLAN 50</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Fa0/10</td>
              <td className="py-2 text-foreground">DNS Server</td>
              <td className="py-2 text-muted-foreground">NIC</td>
              <td className="py-2 text-muted-foreground">Access VLAN 50</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Fa0/11</td>
              <td className="py-2 text-foreground">Web Server</td>
              <td className="py-2 text-muted-foreground">NIC</td>
              <td className="py-2 text-muted-foreground">Access VLAN 60</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">SW-DIST</td>
              <td className="py-2 text-muted-foreground">Fa0/12</td>
              <td className="py-2 text-foreground">WRT300N</td>
              <td className="py-2 text-muted-foreground">Internet port</td>
              <td className="py-2 text-muted-foreground">Access VLAN 40</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">R1</td>
              <td className="py-2 text-muted-foreground">Gi0/0/1</td>
              <td className="py-2 text-foreground">ISP1</td>
              <td className="py-2 text-muted-foreground">Gi0/0</td>
              <td className="py-2 text-muted-foreground">WAN (200.0.0.0/30)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">R2</td>
              <td className="py-2 text-muted-foreground">Gi0/0/1</td>
              <td className="py-2 text-foreground">ISP2</td>
              <td className="py-2 text-muted-foreground">Gi0/0</td>
              <td className="py-2 text-muted-foreground">WAN (200.0.1.0/30)</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">ACSW1</td>
              <td className="py-2 text-muted-foreground">Fa0/3-8</td>
              <td className="py-2 text-foreground">PC1-PC6</td>
              <td className="py-2 text-muted-foreground">NIC</td>
              <td className="py-2 text-muted-foreground">Access VLANs per IP table</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">ACSW2</td>
              <td className="py-2 text-muted-foreground">Fa0/3-8</td>
              <td className="py-2 text-foreground">PC7-PC12</td>
              <td className="py-2 text-muted-foreground">NIC</td>
              <td className="py-2 text-muted-foreground">Access VLANs per IP table</td>
            </tr>
            <tr>
              <td className="py-2 text-foreground">ACSW3</td>
              <td className="py-2 text-muted-foreground">Fa0/3-5</td>
              <td className="py-2 text-foreground">PC13-PC15</td>
              <td className="py-2 text-muted-foreground">NIC</td>
              <td className="py-2 text-muted-foreground">Access VLANs per IP table</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card className="border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Wireless Clients</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Wireless clients: 4 laptops → SSID "NoContext-WiFi".</p>
        </div>
      </Card>
    </div>
  )
}
