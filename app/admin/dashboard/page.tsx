'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarDays, ClipboardList, LogOut, Users, UsersRound } from 'lucide-react'
import {
  type Fixture,
  type Player,
  type Team,
  seedFixtures,
  seedPlayers,
  seedTeams,
} from '@/lib/admin'
import { TeamsManager } from '@/components/admin/teams-manager'
import { PlayersManager } from '@/components/admin/players-manager'
import { FixturesManager } from '@/components/admin/fixtures-manager'
import { SumulaManager } from '@/components/admin/sumula-manager'
import { cn } from '@/lib/utils'

type TabKey = 'equipes' | 'jogadores' | 'jogos' | 'sumula'

const tabs: { key: TabKey; label: string; icon: typeof Users }[] = [
  { key: 'equipes', label: 'Equipes', icon: Users },
  { key: 'jogadores', label: 'Jogadores', icon: UsersRound },
  { key: 'jogos', label: 'Jogos', icon: CalendarDays },
  { key: 'sumula', label: 'Súmula', icon: ClipboardList },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [teams, setTeams] = useState<Team[]>(seedTeams)
  const [players, setPlayers] = useState<Player[]>(seedPlayers)
  const [fixtures, setFixtures] = useState<Fixture[]>(seedFixtures)
  const [active, setActive] = useState<TabKey>('equipes')
  const [finished, setFinished] = useState(false)

  return (
    <div className="flex min-h-screen justify-center bg-secondary font-sans">
      <div className="relative flex w-full max-w-2xl flex-col bg-background">
        <header className="bg-primary text-primary-foreground px-5 pt-8 pb-6 rounded-b-3xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-xl font-extrabold leading-tight tracking-tight text-balance">
                Painel do Organizador
              </h1>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-semibold ring-1 ring-primary-foreground/20">
                Copa Várzea 2026
              </span>
            </div>
            <button
              type="button"
              onClick={() => router.push('/admin/login')}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-2 text-xs font-semibold ring-1 ring-primary-foreground/20 transition-colors hover:bg-primary-foreground/25"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-primary-foreground/15 px-4 py-3 ring-1 ring-primary-foreground/20">
            <div>
              <p className="text-xs font-medium text-primary-foreground/70">
                Status do Campeonato
              </p>
              <p className="text-sm font-bold">{finished ? 'Finalizado' : 'Ativo'}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={!finished}
              aria-label="Alternar status do campeonato"
              onClick={() => setFinished((v) => !v)}
              className={cn(
                'relative h-8 w-14 rounded-full ring-1 ring-primary-foreground/30 transition-colors',
                finished ? 'bg-primary-foreground/25' : 'bg-primary-foreground',
              )}
            >
              <span
                className={cn(
                  'absolute top-1 h-6 w-6 rounded-full shadow-sm transition-transform',
                  finished
                    ? 'left-1 translate-x-0 bg-primary-foreground'
                    : 'left-1 translate-x-6 bg-primary',
                )}
              />
            </button>
          </div>
        </header>

        <nav aria-label="Seções de gerenciamento" className="px-5 pt-5">
          <ul className="flex items-center gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const isActive = tab.key === active
              const Icon = tab.icon
              return (
                <li key={tab.key}>
                  <button
                    type="button"
                    onClick={() => setActive(tab.key)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-card text-muted-foreground ring-1 ring-border hover:text-foreground',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <main className="flex-1 px-5 py-5">
          {active === 'equipes' ? (
            <TeamsManager
              teams={teams}
              setTeams={setTeams}
              players={players}
              setPlayers={setPlayers}
            />
          ) : null}
          {active === 'jogadores' ? (
            <PlayersManager teams={teams} players={players} setPlayers={setPlayers} />
          ) : null}
          {active === 'jogos' ? (
            <FixturesManager teams={teams} fixtures={fixtures} setFixtures={setFixtures} />
          ) : null}
          {active === 'sumula' ? (
            <SumulaManager teams={teams} players={players} fixtures={fixtures} />
          ) : null}
        </main>
      </div>
    </div>
  )
}
