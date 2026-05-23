import { Card } from '@/components/ui/card'

export default function OverviewSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Enterprise Network Blueprint</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Fully buildable, production-grade enterprise simulation with high availability, WAN failover, security, and wireless integration
        </p>
      </div>

      <Card className="border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground">Design Goal</h3>
            <p className="mt-2 text-muted-foreground">
              This blueprint provides a complete, production-grade network architecture for the Cisco ISR 4321 2-Port Edition. It includes redundant default gateways using HSRP, WAN failover capabilities, comprehensive security through VLANs and ACLs, and wireless integration with guest network isolation.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Network Layers</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• <span className="text-foreground font-medium">Core Layer:</span> Dual ISR 4321 routers with HSRP redundancy</li>
            <li>• <span className="text-foreground font-medium">Distribution Layer:</span> Catalyst 3650-24PS with inter-VLAN routing</li>
            <li>• <span className="text-foreground font-medium">Access Layer:</span> Three Catalyst 2960-24TT switches</li>
            <li>• <span className="text-foreground font-medium">Edge Layer:</span> Dual ISP simulators for WAN redundancy</li>
            <li>• <span className="text-foreground font-medium">Wireless:</span> Aironet 3702i with guest isolation</li>
          </ul>
        </Card>

        <Card className="border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Key Features</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>✓ HSRP default gateway redundancy</li>
            <li>✓ Static route WAN failover</li>
            <li>✓ 6 VLANs with IP segregation</li>
            <li>✓ Port security & DHCP snooping</li>
            <li>✓ Guest VLAN isolation via ACLs</li>
            <li>✓ WPA2-PSK wireless security</li>
          </ul>
        </Card>
      </div>

      <Card className="border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Device Inventory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground">Role</th>
                <th className="text-left py-2 text-muted-foreground">Model</th>
                <th className="text-left py-2 text-muted-foreground">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 text-foreground">Core Router</td>
                <td className="py-2 text-muted-foreground">Cisco ISR 4321</td>
                <td className="py-2 text-muted-foreground">2 (R1, R2)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-foreground">ISP Router</td>
                <td className="py-2 text-muted-foreground">Cisco ISR 4321</td>
                <td className="py-2 text-muted-foreground">2 (ISP1, ISP2)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-foreground">Distribution Switch</td>
                <td className="py-2 text-muted-foreground">Catalyst 3650-24PS</td>
                <td className="py-2 text-muted-foreground">1</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-foreground">Access Switch</td>
                <td className="py-2 text-muted-foreground">Catalyst 2960-24TT</td>
                <td className="py-2 text-muted-foreground">3</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-foreground">Access Point</td>
                <td className="py-2 text-muted-foreground">Aironet 3702i</td>
                <td className="py-2 text-muted-foreground">1</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-foreground">Servers</td>
                <td className="py-2 text-muted-foreground">Server-PT</td>
                <td className="py-2 text-muted-foreground">3 (Syslog, DNS, Web)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-foreground">Wired PCs</td>
                <td className="py-2 text-muted-foreground">PC-PT</td>
                <td className="py-2 text-muted-foreground">15</td>
              </tr>
              <tr>
                <td className="py-2 text-foreground">Wireless Clients</td>
                <td className="py-2 text-muted-foreground">Laptop-PT</td>
                <td className="py-2 text-muted-foreground">4</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Total devices: 31</p>
      </Card>
    </div>
  )
}
