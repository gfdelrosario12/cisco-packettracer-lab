import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface TestStepProps {
  step: number
  title: string
  description: string
  commands: string[]
  expectedResult: string
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
          {commands.map((cmd, i) => (
            <div key={i} className="rounded bg-black/40 px-4 py-2 font-mono text-xs md:text-sm text-foreground">
              {cmd}
            </div>
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
          description="Verify that R2 becomes the active gateway when R1 goes offline"
          commands={[
            'show standby brief          # On R1: verify it is Active',
            'ping -t 10.0.99.3           # From PC in VLAN 10: continuous ping to HSRP VIP',
          ]}
          expectedResult="R1 shows as Active. Pings are successful. Then shut down R1's transit interface (R1(config)# interface Gi0/0/0 → shutdown). After ~10 seconds, R2 becomes Active and pings resume with only a few lost packets. Re-enable R1's interface and confirm R1 preempts and becomes Active again."
        />

        <TestStep
          step={2}
          title="WAN Failover Test"
          description="Verify that traffic reroutes to R2's ISP when R1's WAN link fails"
          commands={[
            'show ip route 0.0.0.0       # On R1: view default route',
            'traceroute 8.8.8.8          # Trace path via ISP1',
            'show ip route 0.0.0.0       # After shutdown: verify floating static is installed',
          ]}
          expectedResult="R1 initially has primary route via ISP1 (200.0.0.1). After shutdown of R1's Gi0/0/1, the primary route disappears. The floating static route via 10.0.99.2 (R2) with AD 200 becomes active. HSRP tracking drops R1's priority by 30, making R2 the active gateway. Traceroute from clients now goes through R2 → ISP2."
        />

        <TestStep
          step={3}
          title="VLAN Isolation Test"
          description="Verify that Guest VLAN (40) is properly isolated from internal VLANs"
          commands={[
            'ping 192.168.50.10   # From VLAN 40 wireless client',
            'ping 10.0.10.10      # From VLAN 40 wireless client',
            'ping 8.8.8.8         # From VLAN 40 wireless client (should succeed)',
            'show access-lists    # On SW-DIST to check ACL counters',
          ]}
          expectedResult="Pings to internal subnets (VLANs 10, 20, 30, and Servers/DMZ) fail. Ping to 8.8.8.8 (internet) succeeds. ACL GUEST-ISOLATE on SW-DIST vlan 40 shows deny counters incrementing, confirming the restrictions are enforced."
        />

        <TestStep
          step={4}
          title="Port Security Violation Test"
          description="Verify that port security responds correctly to MAC address violations"
          commands={[
            'show port-security interface fa0/1          # On ACSW1 before violation',
            'show port-security                          # Before and after violation',
          ]}
          expectedResult="Initially, port Fa0/1 is in secure-up state with the original PC's MAC learned. Disconnect the original PC and connect a different device. The port goes into restrict mode (possibly down). Show port-security shows the violation counter incrementing and port status as 'Secure-shutdown' or 'Restricted'. Reconnect the original PC – the port recovers automatically."
        />

        <TestStep
          step={5}
          title="DHCP Snooping Test"
          description="Verify that unauthorized DHCP servers are blocked"
          commands={[
            'show ip dhcp snooping          # On access switches before test',
            'show ip dhcp snooping binding  # View only trusted bindings',
          ]}
          expectedResult="Connect an unauthorized DHCP server to an untrusted port on an access switch. Client PCs on that port do not receive DHCP offers. Show ip dhcp snooping displays only bindings from SW-DIST (the trusted source). When you remove the rogue DHCP server, clients obtain IPs normally again."
        />

        <TestStep
          step={6}
          title="EtherChannel Verification"
          description="Verify LAG (Link Aggregation) status between SW-DIST and access switches"
          commands={[
            'show etherchannel summary       # On SW-DIST',
            'show etherchannel 1 detail     # Show details of Po1',
            'show interfaces port-channel 1 # Check port-channel status',
          ]}
          expectedResult="All port-channels (Po1, Po2, Po3) are active and in 'Layer 3' mode. The member interfaces (Gi1/0/1-2, Gi1/0/3-4, Gi1/0/5-6) are all bundled and active. Disable one member link on Po1 (e.g., shutdown Gi1/0/1) – traffic continues via the remaining link. Re-enable it and traffic balances again."
        />

        <TestStep
          step={7}
          title="End-to-End Ping Test"
          description="Verify connectivity across all VLANs and to external networks"
          commands={[
            'ping 10.0.10.10  # From VLAN 20 PC',
            'ping 10.0.20.10  # From VLAN 10 PC',
            'ping 192.168.50.20  # From any internal VLAN (DNS server)',
            'ping 8.8.8.8     # From any internal VLAN (external)',
          ]}
          expectedResult="All pings succeed, confirming inter-VLAN routing is working. Pings to servers succeed. External pings succeed via NAT on the active router. Wireless clients in VLAN 40 can reach 8.8.8.8 but not internal subnets."
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
