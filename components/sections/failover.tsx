'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Copy, Check } from 'lucide-react'

interface CommandObj {
  device: string
  cmd: string
}

interface TestStepProps {
  step: number
  title: string
  description: string
  commands: CommandObj[]
  expectedResult: string
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
        <span className="text-muted-foreground select-none">{item.device} &gt; </span>
        {item.cmd}
      </span>
      <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors ml-4" title="Copy command">
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
    </div>
  )
}

function TestStep({ step, title, description, commands, expectedResult }: TestStepProps) {
  return (
    <Card className="border-border bg-card p-6 space-y-4">
      <div className="flex gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm">
          {step}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>

      {commands.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase">Commands</p>
          {commands.map((item, i) => (
            <CommandItem key={i} item={item} />
          ))}
        </div>
      )}

      <div className="flex gap-2 rounded bg-black/40 border border-border/50 p-4">
        <CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Expected Result:</p>
          {expectedResult}
        </div>
      </div>
    </Card>
  )
}

export default function FailoverSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Failover Testing Procedures</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Step-by-step procedures to validate redundancy and failover mechanisms
        </p>
      </div>

      <Card className="border-border bg-card p-6 flex gap-3">
        <AlertCircle size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Important</p>
          Perform these tests in a controlled lab environment. Failover mechanisms will cause temporary service interruption.
        </div>
      </Card>

      <div className="space-y-6">
        <TestStep
          step={1}
          title="HSRP Failover Test"
          description="Verify redundant gateway functionality"
          commands={[
            { device: 'PC1', cmd: 'ping 8.8.8.8 -t' },
            { device: 'R1', cmd: 'interface gigabitEthernet 0/0/0' },
            { device: 'R1', cmd: 'shutdown' }
          ]}
          expectedResult="R2 becomes HSRP Active. Ping resumes after 1-2 drops. Restoring R1 Gi0/0/0 returns Active state to R1."
        />

        <TestStep
          step={2}
          title="WAN Failover Test"
          description="Verify redundant ISP routing"
          commands={[
            { device: 'PC1', cmd: 'ping 8.8.8.8 -t' },
            { device: 'R1', cmd: 'interface gigabitEthernet 0/0/1' },
            { device: 'R1', cmd: 'shutdown' }
          ]}
          expectedResult="HSRP track fires — R1 priority drops to 80, R2 becomes Active. Traffic reroutes via ISP2. Restoring R1 Gi0/0/1 restores R1 priority to 110."
        />

        <TestStep
          step={3}
          title="VLAN Isolation Test"
          description="Verify guest network restrictions"
          commands={[
            { device: 'Laptop1', cmd: 'ping 10.0.10.10' },
            { device: 'Laptop1', cmd: 'ping 192.168.50.10' }
          ]}
          expectedResult="Wireless clients can't ping internal VLANs; Internet works."
        />

        <TestStep
          step={4}
          title="Port Security Violation Test"
          description="Verify switchport port-security"
          commands={[
            { device: 'ACSW1', cmd: 'show port-security interface fa0/3' }
          ]}
          expectedResult="Unauthorized MAC triggers restrict violation and recovery."
        />

        <TestStep
          step={5}
          title="DHCP Snooping Test"
          description="Verify protection against rogue DHCP servers"
          commands={[
            { device: 'ACSW1', cmd: 'show ip dhcp snooping statistics' }
          ]}
          expectedResult="Rogue DHCP server ignored on untrusted ports."
        />
      </div>

      <Card className="border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Recovery & Cleanup</h3>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>After completing failover tests, ensure all configurations are returned to normal:</p>
          <ul className="space-y-2 ml-4">
            <li>• Re-enable all shutdown interfaces on core routers</li>
            <li>• Verify HSRP shows R1 as Active with priority 110</li>
            <li>• Clear any port security violations if needed: <code className="bg-black/40 px-2 py-1 rounded font-mono text-xs">clear port-security all</code></li>
            <li>• Verify all routing tables show correct primary paths</li>
            <li>• Confirm end-to-end connectivity across the entire network</li>
            <li>• Review syslog messages on 192.168.50.10 for any errors during transitions</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
