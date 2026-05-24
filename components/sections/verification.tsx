'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Copy, Check } from 'lucide-react'

interface CommandObj {
  cmd: string
  device?: string
}

function CommandItem({ item }: { item: CommandObj }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(item.cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center justify-between rounded bg-black/40 px-4 py-2 font-mono text-xs md:text-sm text-foreground">
      <span>
        {item.cmd}
        {item.device && <span className="text-muted-foreground ml-2">({item.device})</span>}
      </span>
      <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors ml-4" title="Copy command">
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
    </div>
  )
}

function CommandGroup({ title, description, commands }: { title: string; description: string; commands: CommandObj[] }) {
  return (
    <Card className="border-border bg-card p-6 space-y-3">
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="space-y-2">
        {commands.map((item, i) => (
          <CommandItem key={i} item={item} />
        ))}
      </div>
    </Card>
  )
}

export default function VerificationSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Verification Commands</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Essential commands to verify network configuration and operational status
        </p>
      </div>

      <CommandGroup
        title="Key Verification Commands"
        description="Run these commands to verify the operational state"
        commands={[
          { cmd: 'show vlan brief', device: 'Switches' },
          { cmd: 'show interfaces trunk', device: 'Switches' },
          { cmd: 'show etherchannel summary', device: 'Switches' },
          { cmd: 'show ip route', device: 'SW-DIST, R1, R2' },
          { cmd: 'show standby brief', device: 'R1, R2' },
          { cmd: 'show port-security interface fa0/3', device: 'Access Switches' },
          { cmd: 'show mac address-table dynamic', device: 'Switches' },
          { cmd: 'show ip dhcp snooping binding', device: 'Access Switches' },
          { cmd: 'show access-lists', device: 'SW-DIST' },
          { cmd: 'show ip dhcp pool', device: 'SW-DIST' }
        ]}
      />

      <Card className="border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold text-foreground">Expected Output Samples</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">show standby brief output:</h4>
            <div className="rounded bg-black/40 px-4 py-2 font-mono text-xs md:text-sm text-foreground overflow-x-auto">
              <pre>{`Interface   Grp  Pri  P  Address     State
Gi0/0/0     1    110  P  10.0.99.3   Active (ConfFd)`}</pre>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">show ip route output:</h4>
            <div className="rounded bg-black/40 px-4 py-2 font-mono text-xs md:text-sm text-foreground overflow-x-auto">
              <pre>{`S    0.0.0.0/0 [1/0] via 200.0.0.1
C    10.0.99.0/29 is directly connected
S    10.0.10.0/24 [1/0] via 10.0.99.4
S    10.0.20.0/24 [1/0] via 10.0.99.4`}</pre>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">show vlan brief output:</h4>
            <div className="rounded bg-black/40 px-4 py-2 font-mono text-xs md:text-sm text-foreground overflow-x-auto">
              <pre>{`VLAN Name                             Status    Ports
---- -------------------------------- --------- ------
10   Development                       active    Po1,Po2,Po3
20   Operations                        active    Po1,Po2,Po3
30   Management                        active    Po1,Po2,Po3,Fa0/12
40   Guest                             active    Po1,Po2,Po3,Fa0/12`}</pre>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Common Verification Workflow</h3>
        <ol className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="font-bold text-accent min-w-6">1.</span>
            <span>Verify all interfaces are <code className="bg-black/40 px-2 py-1 rounded">up/up</code> with <code className="bg-black/40 px-2 py-1 rounded">show ip interface brief</code></span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent min-w-6">2.</span>
            <span>Check HSRP status with <code className="bg-black/40 px-2 py-1 rounded">show standby brief</code> – one router should be Active, one Standby</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent min-w-6">3.</span>
            <span>Verify routing table with <code className="bg-black/40 px-2 py-1 rounded">show ip route</code> – all internal subnets should route via 10.0.99.4</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent min-w-6">4.</span>
            <span>Check DHCP bindings with <code className="bg-black/40 px-2 py-1 rounded">show ip dhcp binding</code> on SW-DIST</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent min-w-6">5.</span>
            <span>Ping across VLANs (e.g., from PC1 to PC3) to ensure inter-VLAN routing, and ping 8.8.8.8 (from PC1) to verify NAT and internet reachability</span>
          </li>
        </ol>
      </Card>
    </div>
  )
}
