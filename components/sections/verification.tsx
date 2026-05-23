import { Card } from '@/components/ui/card'

function CommandGroup({ title, description, commands }: { title: string; description: string; commands: string[] }) {
  return (
    <Card className="border-border bg-card p-6 space-y-3">
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="space-y-2">
        {commands.map((cmd, i) => (
          <div key={i} className="rounded bg-black/40 px-4 py-2 font-mono text-xs md:text-sm text-foreground">
            {cmd}
          </div>
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
        title="General Interface & VLAN Status"
        description="Check basic interface configuration and VLAN assignments"
        commands={[
          'show ip interface brief',
          'show vlan brief (on SW-DIST and access switches)',
          'show interfaces trunk',
          'show etherchannel summary (on SW-DIST and access switches)',
        ]}
      />

      <CommandGroup
        title="Routing & HSRP"
        description="Verify routing tables and HSRP redundancy status"
        commands={[
          'show ip route',
          'show ip route static',
          'show standby brief (on R1, R2)',
          'show standby',
          'show standby detail',
        ]}
      />

      <CommandGroup
        title="Security & Port Configuration"
        description="Monitor port security, DHCP snooping, and access lists"
        commands={[
          'show port-security',
          'show port-security interface fa0/1',
          'show mac address-table dynamic',
          'show ip dhcp snooping',
          'show ip dhcp snooping binding',
          'show access-lists',
          'show ip ssh',
        ]}
      />

      <CommandGroup
        title="Wireless Configuration"
        description="Verify AP status and wireless associations"
        commands={[
          'show dot11 associations (on AP)',
          'show bridge-group 1 (on AP)',
          'show interfaces dot11Radio 0',
        ]}
      />

      <CommandGroup
        title="Network Management & Monitoring"
        description="Check syslog, SNMP, and monitoring configuration"
        commands={[
          'show logging',
          'show logging | include syslog',
          'show snmp',
          'show snmp community',
          'show snmp engineID',
        ]}
      />

      <CommandGroup
        title="NAT & Address Translation"
        description="Verify Network Address Translation on core routers"
        commands={[
          'show ip nat translations',
          'show ip nat statistics',
          'show ip nat inside source static',
          'debug ip nat (use with caution)',
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
30   Management                        active    Po1,Po2,Po3,Gi1/0/12
40   Guest                             active    Po1,Po2,Po3,Gi1/0/12`}</pre>
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
            <span>Ping across VLANs to ensure inter-VLAN routing and verify guest VLAN isolation with ACL counters</span>
          </li>
        </ol>
      </Card>
    </div>
  )
}
