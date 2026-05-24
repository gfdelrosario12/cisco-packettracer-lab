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
    { id: 'isp', label: 'ISP Routers', icon: '🌐' },
    { id: 'access-switches', label: 'Access Switches', icon: '📡' },
    { id: 'wireless-router', label: 'Wireless Router', icon: '📶' },
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
banner motd # Unauthorized access prohibited! #
crypto key generate rsa modulus 2048
ip ssh version 2
line console 0
 login local
 exit
`} />
          </div>
        </Card>
      )}

      {/* SW-DIST */}
      {activeDevice === 'sw-dist' && (
        <Card className="border-border bg-card p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Distribution Switch Configuration (SW-DIST – Catalyst 3560-24PS)</h3>
            <CodeBlock code={`hostname SW-DIST
! Base template applied

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
 no shutdown

! EtherChannels to access switches
interface range fastEthernet 0/1-2
 description EC-uplink to ACSW1
 duplex full
 speed 100
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40
 switchport nonegotiate
 channel-group 1 mode active
 no shutdown

interface range fastEthernet 0/3-4
 description EC-uplink to ACSW2
 duplex full
 speed 100
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40
 switchport nonegotiate
 channel-group 2 mode active
 no shutdown

interface range fastEthernet 0/5-6
 description EC-uplink to ACSW3
 duplex full
 speed 100
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40
 switchport nonegotiate
 channel-group 3 mode active
 no shutdown

interface port-channel 1
 description Po1 to ACSW1
 no shutdown
interface port-channel 2
 description Po2 to ACSW2
 no shutdown
interface port-channel 3
 description Po3 to ACSW3
 no shutdown

! Router uplinks (access VLAN 99)
interface fastEthernet 0/7
 description To R1
 switchport access vlan 99
 switchport mode access
 no shutdown
interface fastEthernet 0/8
 description To R2
 switchport access vlan 99
 switchport mode access
 no shutdown

! Server Ports & Wireless Router Port
interface fastEthernet 0/9
 description Syslog Server
 switchport access vlan 50
 switchport mode access
 spanning-tree portfast
 no shutdown
interface fastEthernet 0/10
 description DNS Server
 switchport access vlan 50
 switchport mode access
 spanning-tree portfast
 no shutdown
interface fastEthernet 0/11
 description Web Server
 switchport access vlan 60
 switchport mode access
 spanning-tree portfast
 no shutdown
interface fastEthernet 0/12
 description WRT300N Wireless Router
 switchport access vlan 40
 switchport mode access
 spanning-tree portfast
 no shutdown

! DHCP
ip dhcp excluded-address 10.0.10.1 10.0.10.9
ip dhcp pool vlan10
 network 10.0.10.0 255.255.255.0
 default-router 10.0.10.1
 dns-server 192.168.50.20
ip dhcp excluded-address 10.0.20.1 10.0.20.9
ip dhcp pool vlan20
 network 10.0.20.0 255.255.255.0
 default-router 10.0.20.1
 dns-server 192.168.50.20

ip dhcp excluded-address 10.0.30.1 10.0.30.99

ip dhcp excluded-address 10.0.40.1 10.0.40.99
ip dhcp pool vlan40
 network 10.0.40.0 255.255.255.0
 default-router 10.0.40.1
 dns-server 192.168.50.20

ip routing
ip route 0.0.0.0 0.0.0.0 10.0.99.3

! ACLs
ip access-list extended GUEST-ISOLATE
 deny ip 10.0.40.0 0.0.0.255 10.0.10.0 0.0.0.255
 deny ip 10.0.40.0 0.0.0.255 10.0.20.0 0.0.0.255
 deny ip 10.0.40.0 0.0.0.255 10.0.30.0 0.0.0.255
 deny ip 10.0.40.0 0.0.0.255 192.168.50.0 0.0.0.255
 deny ip 10.0.40.0 0.0.0.255 192.168.60.0 0.0.0.255
 permit ip 10.0.40.0 0.0.0.255 any

ip access-list extended MGMT-ACCESS
 permit ip 10.0.30.0 0.0.0.255 10.0.30.0 0.0.0.255
 permit tcp 10.0.10.0 0.0.0.255 10.0.30.0 0.0.0.255 eq 22
 permit udp 10.0.10.0 0.0.0.255 10.0.30.0 0.0.0.255 eq 161
 deny ip any 10.0.30.0 0.0.0.255
 permit ip any any

interface vlan 40
 ip access-group GUEST-ISOLATE in
interface vlan 30
 ip access-group MGMT-ACCESS in

snmp-server community N0C0nt3xt RO
snmp-server location BGC_PH
snmp-server contact admin@nocontext.local
logging host 192.168.50.10
logging trap informational`} />
          </div>
        </Card>
      )}

      {activeDevice === 'r1' && (
        <Card className="border-border bg-card p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3">R1 Core Router</h3>
            <CodeBlock code={`hostname R1
! Base template applied

interface gigabitEthernet 0/0/0
 description To SW-DIST Fa0/7
 ip address 10.0.99.1 255.255.255.248
 ip nat inside
 no shutdown
 standby version 2
 standby 1 ip 10.0.99.3
 standby 1 priority 110
 standby 1 preempt
 standby 1 timers 3 10
 standby 1 track gigabitEthernet 0/0/1 30
 ip nat inside

interface gigabitEthernet 0/0/1
 description To ISP1
 ip address 200.0.0.2 255.255.255.252
 ip nat outside
 no shutdown

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

      {activeDevice === 'r2' && (
        <Card className="border-border bg-card p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3">R2 Core Router</h3>
            <CodeBlock code={`hostname R2
! Base template applied

interface gigabitEthernet 0/0/0
 description To SW-DIST Fa0/8
 ip address 10.0.99.2 255.255.255.248
 ip nat inside
 no shutdown
 standby version 2
 standby 1 ip 10.0.99.3
 standby 1 priority 100
 standby 1 preempt
 standby 1 timers 3 10
 standby 1 track gigabitEthernet 0/0/1 30
 ip nat inside

interface gigabitEthernet 0/0/1
 description To ISP2
 ip address 200.0.1.2 255.255.255.252
 ip nat outside
 no shutdown

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

      {activeDevice === 'isp' && (
        <Card className="border-border bg-card p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3">ISP1</h3>
            <CodeBlock code={`hostname ISP1
interface gigabitEthernet 0/0
 ip address 200.0.0.1 255.255.255.252
 no shutdown
interface loopback 0
 ip address 8.8.8.8 255.255.255.255
ip route 0.0.0.0 0.0.0.0 200.0.0.2`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">ISP2</h3>
            <CodeBlock code={`hostname ISP2
interface gigabitEthernet 0/0
 ip address 200.0.1.1 255.255.255.252
 no shutdown
interface loopback 0
 ip address 8.8.8.8 255.255.255.255
ip route 0.0.0.0 0.0.0.0 200.0.1.2`} />
          </div>
        </Card>
      )}

      {activeDevice === 'access-switches' && (
        <Card className="border-border bg-card p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3">ACSW1 (Full)</h3>
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

interface range fastEthernet 0/1-2
 description EC-uplink to SW-DIST
 duplex full
 speed 100
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,40
 switchport nonegotiate
 channel-group 1 mode active
 no shutdown

interface port-channel 1
 description Uplink to SW-DIST
 no shutdown

interface range fastEthernet 0/3-8
 switchport mode access
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky
 spanning-tree portfast
 spanning-tree bpduguard enable
 no shutdown

interface fastEthernet 0/3
 switchport access vlan 10
 description PC1
interface fastEthernet 0/4
 switchport access vlan 10
 description PC2
interface fastEthernet 0/5
 switchport access vlan 20
 description PC3
interface fastEthernet 0/6
 switchport access vlan 20
 description PC4
interface fastEthernet 0/7
 switchport access vlan 30
 description PC5
interface fastEthernet 0/8
 switchport access vlan 30
 description PC6

ip dhcp snooping
ip dhcp snooping vlan 10,20,30,40
no ip dhcp snooping information option
interface port-channel 1
 ip dhcp snooping trust`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">ACSW2 & ACSW3 Differences</h3>
            <div className="text-sm text-muted-foreground mb-4 space-y-2">
              <p><strong>ACSW2:</strong> identical, except descriptions map to PC7-PC12.</p>
              <p><strong>ACSW3:</strong> ports Fa0/3-5 map to PC13-PC15.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Wireless Router */}
      {activeDevice === 'wireless-router' && (
        <Card className="border-border bg-card p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Linksys WRT300N Wireless Router (GUI Configuration)</h3>
            <p className="text-sm text-muted-foreground mb-4">Configured entirely via the Packet Tracer GUI. Connect SW-DIST Fa0/12 to the Internet port.</p>
            <CodeBlock language="text" code={`Step 1: Setup -> Basic Setup
Internet Connection Type: Automatic Configuration (DHCP)

Step 2: Router IP
Local IP Address: 10.0.40.2
Subnet Mask: 255.255.255.0
DHCP Server: Disable

Step 3: Wireless -> Basic Wireless Settings
Network Name (SSID): NoContext-WiFi

Step 4: Wireless -> Wireless Security
Security Mode: WPA2 Personal
Encryption: AES
Passphrase: nocontext@2026`} />
          </div>
        </Card>
      )}
    </div>
  )
}
