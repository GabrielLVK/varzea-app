'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CalendarClock, MapPin, Clock, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Match = {
  id: string
  round: string
  date: string
  status: 'finalizado' | 'agendado'
  home: { name: string; logo: string; score?: number }
  away: { name: string; logo: string; score?: number }
  time?: string
  location?: string
}

const matches: Match[] = [
  {
    id: 'r3',
    round: 'Rodada 3',
    date: '10/09',
    status: 'finalizado',
    home: { name: 'Time A', logo: '/time-a.png', score: 3 },
    away: { name: 'Time B', logo: '/time-b.png', score: 1 },
  },
  {
    id: 'r4',
    round: 'Rodada 4',
    date: '17/09',
    status: 'agendado',
    home: { name: 'Time C', logo: '/time-c.png' },
    away: { name: 'Time D', logo: '/time-d.png' },
    time: '15:30',
    location: 'Campo do Zé',
  },
]

function TeamLine({
  logo,
  name,
  score,
  winner,
}: {
  logo: string
  name: string
  score?: number
  winner?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-secondary ring-1 ring-border">
        <Image src={logo} alt={`Escudo do ${name}`} width={32} height={32} className="h-8 w-8 object-contain" />
      </span>
      <span
        className={cn(
          'flex-1 text-sm',
          winner ? 'font-bold text-foreground' : 'font-semibold text-foreground',
        )}
      >
        {name}
      </span>
      {typeof score === 'number' ? (
        <span
          className={cn(
            'font-display text-lg tabular-nums',
            winner ? 'font-extrabold text-primary' : 'font-bold text-muted-foreground',
          )}
        >
          {score}
        </span>
      ) : null}
    </div>
  )
}

function MatchCard({ match }: { match: Match }) {
  const finished = match.status === 'finalizado'
  const homeWin = finished && (match.home.score ?? 0) > (match.away.score ?? 0)
  const awayWin = finished && (match.away.score ?? 0) > (match.home.score ?? 0)

  return (
    <article className="rounded-3xl bg-card p-4 shadow-sm ring-1 ring-border">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {match.round} · {match.date}
        </span>
        <span
          className={cn(
            'rounded-full px-2.5 py-1 text-[11px] font-semibold',
            finished
              ? 'bg-secondary text-secondary-foreground'
              : 'bg-accent text-accent-foreground',
          )}
        >
          {finished ? 'Finalizado' : 'Agendado'}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        <TeamLine logo={match.home.logo} name={match.home.name} score={match.home.score} winner={homeWin} />
        <TeamLine logo={match.away.logo} name={match.away.name} score={match.away.score} winner={awayWin} />
      </div>

      {finished ? (
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-1 rounded-2xl bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground transition-colors hover:bg-accent"
        >
          Ver Súmula
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2.5">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-xs font-medium text-secondary-foreground">{match.time}</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-xs font-medium text-secondary-foreground">{match.location}</span>
          </div>
        </div>
      )}
    </article>
  )
}

const filters = [
  { key: 'encerrados', label: 'Encerrados', status: 'finalizado' as const },
  { key: 'proximos', label: 'Próximos', status: 'agendado' as const },
]

export function MatchesList() {
  const [active, setActive] = useState<'encerrados' | 'proximos'>('encerrados')
  const currentStatus = filters.find((f) => f.key === active)!.status
  const visible = matches.filter((m) => m.status === currentStatus)

  return (
    <section className="px-5 pt-5" aria-label="Calendário de jogos">
      <div className="flex items-center gap-2 rounded-full bg-secondary p-1">
        {filters.map((f) => {
          const isActive = f.key === active
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key as 'encerrados' | 'proximos')}
              aria-pressed={isActive}
              className={cn(
                'flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 text-muted-foreground">
        <CalendarClock className="h-4 w-4" />
        <span className="text-[11px] font-bold uppercase tracking-wider">
          {active === 'encerrados' ? 'Jogos Encerrados' : 'Próximos Jogos'}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-4">
        {visible.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </section>
  )
}
