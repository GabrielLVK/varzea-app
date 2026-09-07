'use client'

import { useState } from 'react'
import { Trophy, Users, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { label: 'Campeonato', icon: Trophy },
  { label: 'Times', icon: Users },
  { label: 'Sobre', icon: Info },
]

export function BottomNav({ activeItem = 'Campeonato' }: { activeItem?: string }) {
  const [active, setActive] = useState(activeItem)

  return (
    <nav
      aria-label="Navegação principal"
      className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur"
    >
      <ul className="flex items-center justify-around px-2 py-2">
        {items.map(({ label, icon: Icon }) => {
          const isActive = label === active
          return (
            <li key={label} className="flex-1">
              <button
                type="button"
                onClick={() => setActive(label)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex w-full flex-col items-center gap-1 rounded-2xl py-1.5 text-xs font-semibold transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className={cn('h-5 w-5', isActive && 'fill-primary/10')} />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
