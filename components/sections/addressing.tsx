import { Card } from '@/components/ui/card'

export default function AddressingSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">IP Addressing & VLAN Plan</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Complete subnet allocation and device IP assignments
        </p>
      </div>

      <Card className="border-border bg-card p-6 overflow-x-auto">
        <h3 className="font-semibold text-foreground mb-4">VLAN Configuration</h3>
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground">VLAN</th>
              <th className="text-left py-2 text-muted-foreground">Name</th>
              <th className="text-left py-2 text-muted-foreground">Subnet</th>
              <th className="text-left py-2 text-muted-foreground">Gateway</th>
              <th className="text-left py-2 text-muted-foreground">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">10</td>
              <td className="py-2 text-muted-foreground">Development</td>
              <td className="py-2 text-muted-foreground">10.0.10.0/24</td>
              <td className="py-2 text-muted-foreground">10.0.10.1</td>
              <td className="py-2 text-muted-foreground">Dev dept PCs</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">20</td>
              <td className="py-2 text-muted-foreground">Operations</td>
              <td className="py-2 text-muted-foreground">10.0.20.0/24</td>
              <td className="py-2 text-muted-foreground">10.0.20.1</td>
              <td className="py-2 text-muted-foreground">Ops dept PCs</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">30</td>
              <td className="py-2 text-muted-foreground">Management</td>
              <td className="py-2 text-muted-foreground">10.0.30.0/24</td>
              <td className="py-2 text-muted-foreground">10.0.30.1</td>
              <td className="py-2 text-muted-foreground">Network devices</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">40</td>
              <td className="py-2 text-muted-foreground">Guest</td>
              <td className="py-2 text-muted-foreground">10.0.40.0/24</td>
              <td className="py-2 text-muted-foreground">10.0.40.1</td>
              <td className="py-2 text-muted-foreground">Wireless clients</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">50</td>
              <td className="py-2 text-muted-foreground">Servers</td>
              <td className="py-2 text-muted-foreground">192.168.50.0/24</td>
              <td className="py-2 text-muted-foreground">192.168.50.1</td>
              <td className="py-2 text-muted-foreground">Syslog, DNS</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">60</td>
              <td className="py-2 text-muted-foreground">DMZ</td>
              <td className="py-2 text-muted-foreground">192.168.60.0/24</td>
              <td className="py-2 text-muted-foreground">192.168.60.1</td>
              <td className="py-2 text-muted-foreground">Web server</td>
            </tr>
            <tr>
              <td className="py-2 text-foreground">99</td>
              <td className="py-2 text-muted-foreground">Core Transit</td>
              <td className="py-2 text-muted-foreground">10.0.99.0/29</td>
              <td className="py-2 text-muted-foreground">10.0.99.3 (HSRP)</td>
              <td className="py-2 text-muted-foreground">Router interconnect</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card className="border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Core Transit IPs</h3>
        <div className="space-y-2 text-sm text-muted-foreground font-mono">
          <p>R1: <span className="text-foreground">10.0.99.1/29</span></p>
          <p>R2: <span className="text-foreground">10.0.99.2/29</span></p>
          <p>SW-DIST SVI 99: <span className="text-foreground">10.0.99.4/29</span></p>
          <p className="mt-4">HSRP Virtual IP: <span className="text-foreground">10.0.99.3/29</span></p>
        </div>
      </Card>

      <Card className="border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">WAN Subnets</h3>
        <div className="space-y-2 text-sm text-muted-foreground font-mono">
          <p>ISP1 ↔ R1: <span className="text-foreground">200.0.0.0/30</span> (ISP1 .1, R1 .2)</p>
          <p>ISP2 ↔ R2: <span className="text-foreground">200.0.1.0/30</span> (ISP2 .1, R2 .2)</p>
        </div>
      </Card>

      <Card className="border-border bg-card p-6 overflow-x-auto">
        <h3 className="font-semibold text-foreground mb-4">Wired PC IP Addressing</h3>
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground">PC</th>
              <th className="text-left py-2 text-muted-foreground">Switch</th>
              <th className="text-left py-2 text-muted-foreground">VLAN</th>
              <th className="text-left py-2 text-muted-foreground">IP Address</th>
              <th className="text-left py-2 text-muted-foreground">Gateway</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">PC1-2</td>
              <td className="py-2 text-muted-foreground">ACSW1 Fa0/1-2</td>
              <td className="py-2 text-muted-foreground">10</td>
              <td className="py-2 text-muted-foreground">10.0.10.10-11/24</td>
              <td className="py-2 text-muted-foreground">10.0.10.1</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">PC3-4</td>
              <td className="py-2 text-muted-foreground">ACSW1 Fa0/3-4</td>
              <td className="py-2 text-muted-foreground">20</td>
              <td className="py-2 text-muted-foreground">10.0.20.10-11/24</td>
              <td className="py-2 text-muted-foreground">10.0.20.1</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">PC5-6</td>
              <td className="py-2 text-muted-foreground">ACSW1 Fa0/5-6</td>
              <td className="py-2 text-muted-foreground">30</td>
              <td className="py-2 text-muted-foreground">10.0.30.10-11/24</td>
              <td className="py-2 text-muted-foreground">10.0.30.1</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">PC7-8</td>
              <td className="py-2 text-muted-foreground">ACSW2 Fa0/1-2</td>
              <td className="py-2 text-muted-foreground">10</td>
              <td className="py-2 text-muted-foreground">10.0.10.12-13/24</td>
              <td className="py-2 text-muted-foreground">10.0.10.1</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 text-foreground">PC9-10</td>
              <td className="py-2 text-muted-foreground">ACSW2 Fa0/3-4</td>
              <td className="py-2 text-muted-foreground">20</td>
              <td className="py-2 text-muted-foreground">10.0.20.12-13/24</td>
              <td className="py-2 text-muted-foreground">10.0.20.1</td>
            </tr>
            <tr>
              <td className="py-2 text-foreground">PC11-15</td>
              <td className="py-2 text-muted-foreground">ACSW2-3</td>
              <td className="py-2 text-muted-foreground">30</td>
              <td className="py-2 text-muted-foreground">10.0.30.12-14/24</td>
              <td className="py-2 text-muted-foreground">10.0.30.1</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card className="border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Server IPs (Static)</h3>
        <div className="space-y-2 text-sm text-muted-foreground font-mono">
          <p><span className="text-foreground">Syslog:</span> 192.168.50.10/24, GW 192.168.50.1</p>
          <p><span className="text-foreground">DNS:</span> 192.168.50.20/24, GW 192.168.50.1</p>
          <p><span className="text-foreground">Web:</span> 192.168.60.10/24, GW 192.168.60.1</p>
          <p><span className="text-foreground">AP (Management):</span> 10.0.30.101/24, GW 10.0.30.1</p>
        </div>
      </Card>
    </div>
  )
}
