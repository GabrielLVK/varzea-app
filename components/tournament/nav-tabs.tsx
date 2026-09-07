'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const tabs = ['Início', 'Tabela', 'Jogos', 'Estatísticas']

export function NavTabs() {
  const [active, setActive] = useState('Início')

  return (
    <nav aria-label="Seções do campeonato" className="px-5 pt-5">
      <ul className="flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const isActive = tab === active
          return (
            <li key={tab}>
              <button
                type="button"
                onClick={() => setActive(tab)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-card text-muted-foreground ring-1 ring-border hover:text-foreground',
                )}
              >
                {tab}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
