'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Trophy, Users, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { label: 'Campeonato', icon: Trophy, href: '/' },
  { label: 'Times', icon: Users, href: '/times' },
  { label: 'Sobre', icon: Info, href: '/sobre' },
]

const championshipRoutes = ['/', '/tabela', '/jogos', '/estatisticas']

export function BottomNav({ activeItem }: { activeItem?: string }) {
  const pathname = usePathname()

  function isItemActive(label: string, href: string) {
    if (activeItem) return label === activeItem
    if (label === 'Campeonato') return championshipRoutes.includes(pathname)
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav
      aria-label="Navegação principal"
      className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur"
    >
      <ul className="flex items-center justify-around px-2 py-2">
        {items.map(({ label, icon: Icon, href }) => {
          const isActive = isItemActive(label, href)
          return (
            <li key={label} className="flex-1">
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex w-full flex-col items-center gap-1 rounded-2xl py-1.5 text-xs font-semibold transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className={cn('h-5 w-5', isActive && 'fill-primary/10')} />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
