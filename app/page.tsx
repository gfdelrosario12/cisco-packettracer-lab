'use client'

import { useState } from 'react'
import DocsLayout from '@/components/docs-layout'
import OverviewSection from '@/components/sections/overview'
import TopologySection from '@/components/sections/topology'
import AddressingSection from '@/components/sections/addressing'
import ConfigSection from '@/components/sections/config'
import VerificationSection from '@/components/sections/verification'
import FailoverSection from '@/components/sections/failover'

export default function Page() {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'topology', label: 'Topology & Inventory', icon: '🗺️' },
    { id: 'addressing', label: 'IP Addressing', icon: '🔢' },
    { id: 'config', label: 'Device Configuration', icon: '⚙️' },
    { id: 'verification', label: 'Verification Commands', icon: '✓' },
    { id: 'failover', label: 'Failover Testing', icon: '🔄' },
  ]

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />
      case 'topology':
        return <TopologySection />
      case 'addressing':
        return <AddressingSection />
      case 'config':
        return <ConfigSection />
      case 'verification':
        return <VerificationSection />
      case 'failover':
        return <FailoverSection />
      default:
        return <OverviewSection />
    }
  }

  return (
    <DocsLayout
      sections={sections}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
    >
      {renderSection()}
    </DocsLayout>
  )
}
