'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg bg-black/40 p-4">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 p-2 hover:bg-white/10 rounded transition-colors"
        title="Copy code"
      >
        {copied ? (
          <Check size={18} className="text-green-400" />
        ) : (
          <Copy size={18} className="text-muted-foreground" />
        )}
      </button>
      <pre className="overflow-x-auto pr-12 text-xs md:text-sm text-foreground font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function ConfigSection() {
  const [activeDevice, setActiveDevice] = useState('base-template')

  const devices = [
    { id: 'base-template', label: 'Base Template', icon: '📋' },
    { id: 'sw-dist', label: 'SW-DIST', icon: '🔀' },
    { id: 'r1', label: 'R1 Core Router', icon: '🛣️' },
    { id: 'r2', label: 'R2 Core Router', icon: '🛣️' },
    { id: 'access-switches', label: 'Access Switches', icon: '📡' },
    { id: 'access-point', label: 'Access Point', icon: '📶' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Device Configuration</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Complete CLI commands for all network devices
        </p>
      </div>

      {/* Device Selector */}
      <div className="flex flex-wrap gap-2">
        {devices.map((device) => (
          <button
            key={device.id}
            onClick={() => setActiveDevice(device.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeDevice === device.id
                ? 'bg-accent text-accent-foreground'
                : 'bg-card text-muted-foreground hover:text-foreground'
            }`}
          >
            {device.icon} {device.label}
          </button>
        ))}
      </div>

      {/* Base Template */}
      {activeDevice === 'base-template' && (
        <Card className="border-border bg-card p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Management Template (All Routers & Switches)</h3>
            <p className="text-sm text-muted-foreground mb-4">Apply to every router and switch for consistent management access and security.</p>
            <CodeBlock code={`enable
configure terminal
hostname <name>
ip domain-name nocontext.local
crypto key generate rsa modulus 2048
username admin privilege 15 secret C1sc0@Lab
line vty 0 15
 login local
 transport input ssh
 exit
enable secret C1sc0@Lab
service password-encryption
banner motd ^C Unauthorized access prohibited! ^C
no ip http-server
no ip http-secure-server
ip ssh version 2`} />
          </div>
        </Card>
      )}

      {/* SW-DIST */}
      {activeDevice === 'sw-dist' && (
        <Card className="border-border bg-card p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Distribution Switch Configuration</h3>
            <p className="text-sm text-muted-foreground mb-4">Core switching fabric with VLAN definitions, port-channels to access switches, and routing.</p>
            <CodeBlock code={`hostname SW-DIST

! VLANs
vlan 10
 name Development
vlan 20
 name Operations
vlan 30
 name Management
vlan 40
 name Guest
vlan 50
 name Servers
vlan 60
 name DMZ
vlan 99
 name Core_Transit

! SVIs
interface vlan 10
 ip address 10.0.10.1 255.255.255.0
 no shutdown
interface vlan 20
 ip address 10.0.20.1 255.255.255.0
 no shutdown
interface vlan 30
 ip address 10.0.30.1 255.255.255.0
 no shutdown
interface vlan 40
 ip address 10.0.40.1 255.255.255.0
 no shutdown
interface vlan 50
 ip address 192.168.50.1 255.255.255.0
 no shutdown
interface vlan 60
 ip address 192.168.60.1 255.255.255.0
 no shutdown
interface vlan 99
 ip address 10.0.99.4 255.255.255.248
 no shutdown`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Port-Channels & EtherChannel</h3>
            <CodeBlock code={`interface range gigabitEthernet 1/0/1-2
 description Po1 to ACSW1
 channel-group 1 mode active
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,50,60
 no shutdown

interface range gigabitEthernet 1/0/3-4
 description Po2 to ACSW2
 channel-group 2 mode active
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,50,60
 no shutdown

interface range gigabitEthernet 1/0/5-6
 description Po3 to ACSW3
 channel-group 3 mode active
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,50,60
 no shutdown`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">DHCP Pools & Routing</h3>
            <CodeBlock code={`ip dhcp excluded-address 10.0.10.1 10.0.10.9
ip dhcp pool vlan10
 network 10.0.10.0 255.255.255.0
 default-router 10.0.10.1
 dns-server 192.168.50.20

ip dhcp excluded-address 10.0.20.1 10.0.20.9
ip dhcp pool vlan20
 network 10.0.20.0 255.255.255.0
 default-router 10.0.20.1
 dns-server 192.168.50.20

ip dhcp excluded-address 10.0.40.1 10.0.40.100
ip dhcp pool vlan40
 network 10.0.40.0 255.255.255.0
 default-router 10.0.40.1
 dns-server 192.168.50.20

ip routing
ip route 0.0.0.0 0.0.0.0 10.0.99.3`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">ACLs & Security</h3>
            <CodeBlock code={`ip access-list extended GUEST-ISOLATE
 remark Block Guest VLAN from internal subnets
 deny ip 10.0.40.0 0.0.0.255 10.0.10.0 0.0.0.255
 deny ip 10.0.40.0 0.0.0.255 10.0.20.0 0.0.0.255
 deny ip 10.0.40.0 0.0.0.255 10.0.30.0 0.0.0.255
 deny ip 10.0.40.0 0.0.0.255 192.168.50.0 0.0.0.255
 deny ip 10.0.40.0 0.0.0.255 192.168.60.0 0.0.0.255
 permit ip 10.0.40.0 0.0.0.255 any

interface vlan 40
 ip access-group GUEST-ISOLATE in

snmp-server community N0C0nt3xt RO
snmp-server location BGC_PH
logging 192.168.50.10`} />
          </div>
        </Card>
      )}

      {/* R1 */}
      {activeDevice === 'r1' && (
        <Card className="border-border bg-card p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3">R1 Core Router (Primary)</h3>
            <p className="text-sm text-muted-foreground mb-4">Primary core router with HSRP priority 110 and WAN connection to ISP1.</p>
            <CodeBlock code={`hostname R1

interface gigabitEthernet 0/0/0
 description to SW-DIST (VLAN 99)
 ip address 10.0.99.1 255.255.255.248
 no shutdown
 standby version 2
 standby 1 ip 10.0.99.3
 standby 1 priority 110
 standby 1 preempt
 standby 1 timers 3 10
 standby 1 track gigabitEthernet 0/0/1 30
 ip nat inside

interface gigabitEthernet 0/0/1
 description to ISP1
 ip address 200.0.0.2 255.255.255.252
 ip nat outside
 no shutdown

! Static routes
ip route 0.0.0.0 0.0.0.0 200.0.0.1
ip route 0.0.0.0 0.0.0.0 10.0.99.2 200

ip route 10.0.10.0 255.255.255.0 10.0.99.4
ip route 10.0.20.0 255.255.255.0 10.0.99.4
ip route 10.0.30.0 255.255.255.0 10.0.99.4
ip route 10.0.40.0 255.255.255.0 10.0.99.4
ip route 192.168.50.0 255.255.255.0 10.0.99.4
ip route 192.168.60.0 255.255.255.0 10.0.99.4

ip access-list standard NAT-ACL
 permit 10.0.10.0 0.0.0.255
 permit 10.0.20.0 0.0.0.255
 permit 10.0.40.0 0.0.0.255
 permit 192.168.50.0 0.0.0.255
 permit 192.168.60.0 0.0.0.255
 deny any

ip nat inside source list NAT-ACL interface gigabitEthernet 0/0/1 overload`} />
          </div>
        </Card>
      )}

      {/* R2 */}
      {activeDevice === 'r2' && (
        <Card className="border-border bg-card p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3">R2 Core Router (Secondary)</h3>
            <p className="text-sm text-muted-foreground mb-4">Secondary core router with HSRP priority 100 and WAN connection to ISP2.</p>
            <CodeBlock code={`hostname R2

interface gigabitEthernet 0/0/0
 description to SW-DIST (VLAN 99)
 ip address 10.0.99.2 255.255.255.248
 no shutdown
 standby version 2
 standby 1 ip 10.0.99.3
 standby 1 priority 100
 standby 1 preempt
 standby 1 timers 3 10
 standby 1 track gigabitEthernet 0/0/1 30
 ip nat inside

interface gigabitEthernet 0/0/1
 description to ISP2
 ip address 200.0.1.2 255.255.255.252
 ip nat outside
 no shutdown

! Static routes
ip route 0.0.0.0 0.0.0.0 200.0.1.1
ip route 0.0.0.0 0.0.0.0 10.0.99.1 200

ip route 10.0.10.0 255.255.255.0 10.0.99.4
ip route 10.0.20.0 255.255.255.0 10.0.99.4
ip route 10.0.30.0 255.255.255.0 10.0.99.4
ip route 10.0.40.0 255.255.255.0 10.0.99.4
ip route 192.168.50.0 255.255.255.0 10.0.99.4
ip route 192.168.60.0 255.255.255.0 10.0.99.4

ip access-list standard NAT-ACL
 permit 10.0.10.0 0.0.0.255
 permit 10.0.20.0 0.0.0.255
 permit 10.0.40.0 0.0.0.255
 permit 192.168.50.0 0.0.0.255
 permit 192.168.60.0 0.0.0.255
 deny any

ip nat inside source list NAT-ACL interface gigabitEthernet 0/0/1 overload`} />
          </div>
        </Card>
      )}

      {/* Access Switches */}
      {activeDevice === 'access-switches' && (
        <Card className="border-border bg-card p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Access Switch Configuration (ACSW1-3)</h3>
            <p className="text-sm text-muted-foreground mb-4">All three are identical except for VLAN assignments per the IP addressing table.</p>
            <CodeBlock code={`hostname ACSW1

vlan 10
 name Development
vlan 20
 name Operations
vlan 30
 name Management
vlan 40
 name Guest
vlan 50
 name Servers
vlan 60
 name DMZ

! EtherChannel to SW-DIST
interface range gigabitEthernet 0/1-2
 description Po1 to SW-DIST
 channel-group 1 mode active
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40,50,60
 no shutdown

! Access ports with port security
interface range fastEthernet 0/1-6
 switchport mode access
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky
 spanning-tree portfast
 spanning-tree bpduguard enable
 no shutdown

! Specific VLAN assignments (ACSW1)
interface fastEthernet 0/1
 switchport access vlan 10
interface fastEthernet 0/2
 switchport access vlan 10
interface fastEthernet 0/3
 switchport access vlan 20
interface fastEthernet 0/4
 switchport access vlan 20
interface fastEthernet 0/5
 switchport access vlan 30
interface fastEthernet 0/6
 switchport access vlan 30

! DHCP Snooping
ip dhcp snooping
ip dhcp snooping vlan 10,20,30,40,50,60
no ip dhcp snooping information option
interface port-channel 1
 ip dhcp snooping trust`} />
          </div>
        </Card>
      )}

      {/* Access Point */}
      {activeDevice === 'access-point' && (
        <Card className="border-border bg-card p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Aironet 3702i Access Point</h3>
            <p className="text-sm text-muted-foreground mb-4">Wireless bridging with native VLAN 30 (Management) and guest VLAN 40.</p>
            <CodeBlock code={`hostname AP

interface gigabitEthernet 0
 no shutdown
interface gigabitEthernet 0.30
 encapsulation dot1Q 30 native
 ip address 10.0.30.101 255.255.255.0
interface gigabitEthernet 0.40
 encapsulation dot1Q 40
 bridge-group 1

interface dot11Radio 0
 ssid NoContext-WiFi
   authentication open
   authentication key-management wpa version 2
   wpa-psk ascii 0 nocontext@2026
   guest-mode
   bridge-group 1
 no shutdown

ip default-gateway 10.0.30.1`} />
          </div>
        </Card>
      )}
    </div>
  )
}
