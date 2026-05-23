'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DocsLayoutProps {
  sections: Array<{ id: string; label: string; icon: string }>
  activeSection: string
  setActiveSection: (id: string) => void
  children: React.ReactNode
}

export default function DocsLayout({
  sections,
  activeSection,
  setActiveSection,
  children,
}: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* Header */}
          <div className="border-b border-border px-6 py-6">
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-foreground">NoContext Inc.</h1>
              <p className="text-sm text-muted-foreground">Enterprise Network Blueprint</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id)
                  setSidebarOpen(false)
                }}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-border px-6 py-4">
            <p className="text-xs text-muted-foreground">
              ISR 4321 2-Port Edition • BGC, Philippines
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-lg font-semibold text-foreground">Documentation</h2>
            <div className="w-6" />
          </div>
        </header>

        {/* Content */}
        <main className="relative">
          <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
