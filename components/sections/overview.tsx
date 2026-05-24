import { Card } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

export default function OverviewSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">NoContext Inc. — Enterprise Network Blueprint (Clarified Final)</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Bonifacio Global City, Philippines
        </p>
      </div>

      <Card className="border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Project Resources</h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <a
            href="https://docs.google.com/document/d/1aLr8yunrP0r1wlvu-LhCnp4QcPiJAS1jsPULtY5AUww/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center sm:justify-start gap-2 text-accent hover:text-accent/80 transition-colors bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-lg"
          >
            <ExternalLink size={18} />
            <span className="font-medium">Image Documentation</span>
          </a>
          <a
            href="https://drive.google.com/drive/folders/1mybbrDqN6yczSUZk-s8rWFk1BViSKoGZ?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center sm:justify-start gap-2 text-accent hover:text-accent/80 transition-colors bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-lg"
          >
            <ExternalLink size={18} />
            <span className="font-medium">Packet Tracer Checkpoints</span>
          </a>
        </div>
      </Card>

      <Card className="border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground">Design Overview</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              <strong>Routers:</strong> ISR 4321 (2×GigE)<br />
              <strong>Distribution Switch:</strong> Catalyst 3560-24PS (24×FastEthernet, 2×GigabitEthernet)<br />
              <strong>Access Switches:</strong> Catalyst 2960-24TT (24×FastEthernet, 2×GigabitEthernet uplinks)<br />
              <strong>Wireless Router:</strong> Linksys WRT300N
            </p>
          </div>
        </div>
      </Card>

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
                <td className="py-2 text-muted-foreground">Cisco Catalyst 3560-24PS</td>
                <td className="py-2 text-muted-foreground">1 (SW-DIST)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-foreground">Access Switch</td>
                <td className="py-2 text-muted-foreground">Cisco Catalyst 2960-24TT</td>
                <td className="py-2 text-muted-foreground">3 (ACSW1-3)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-foreground">Wireless Router</td>
                <td className="py-2 text-muted-foreground">Linksys WRT300N</td>
                <td className="py-2 text-muted-foreground">1 (WRT)</td>
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
                <td className="py-2 text-foreground">Wireless Laptops</td>
                <td className="py-2 text-muted-foreground">Laptop-PT</td>
                <td className="py-2 text-muted-foreground">4</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Total: 31</p>
      </Card>
    </div>
  )
}
