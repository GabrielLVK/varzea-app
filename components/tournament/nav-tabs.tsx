'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'Início', href: '/' },
  { label: 'Tabela', href: '/tabela' },
  { label: 'Jogos', href: '/jogos' },
  { label: 'Estatísticas', href: '/estatisticas' },
]

export function NavTabs() {
  const pathname = usePathname()

  return (
    <nav aria-label="Seções do campeonato" className="px-5 pt-5">
      <ul className="flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const isActive = tab.href === pathname
          return (
            <li key={tab.label}>
              <Link
                href={tab.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'block whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-card text-muted-foreground ring-1 ring-border hover:text-foreground',
                )}
              >
                {tab.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
