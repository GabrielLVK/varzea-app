'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, Users, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type Team = {
  id: string
  name: string
  logo: string
  players: number
}

const teams: Team[] = [
  { id: 'a', name: 'Time A', logo: '/time-a.png', players: 14 },
  { id: 'b', name: 'Time B', logo: '/time-b.png', players: 13 },
  { id: 'c', name: 'Time C', logo: '/time-c.png', players: 15 },
  { id: 'd', name: 'Time D', logo: '/time-d.png', players: 12 },
]

type Squad = {
  number: number
  name: string
  avatar: string
  position: string
  tag?: string
}

const timeASquad: Squad[] = [
  { number: 10, name: 'Joãozinho', avatar: '/joaozinho.png', position: 'Atacante', tag: '8 Gols' },
  { number: 1, name: 'Marcos', avatar: '/marcos.png', position: 'Goleiro', tag: 'Menos Vazado' },
  { number: 7, name: 'Pedrinho', avatar: '/pedrinho.png', position: 'Meio-campo' },
]

export function TeamsDirectory() {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(true)

  const filtered = teams.filter((t) => t.name.toLowerCase().includes(query.toLowerCase().trim()))

  return (
    <section className="px-5 pt-5" aria-label="Equipes participantes">
      <h2 className="font-display text-lg font-extrabold tracking-tight text-foreground">
        Equipes Participantes
      </h2>

      <div className="mt-3 flex items-center gap-2 rounded-2xl bg-card px-3.5 py-3 ring-1 ring-border">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar time..."
          aria-label="Buscar time"
          className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {filtered.map((team) => (
          <div
            key={team.id}
            className="flex items-center gap-3 rounded-3xl bg-card p-3.5 shadow-sm ring-1 ring-border"
          >
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-secondary ring-1 ring-border">
              <Image
                src={team.logo}
                alt={`Escudo do ${team.name}`}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{team.name}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                {team.players} atletas
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex w-full items-center gap-3 px-4 py-4 text-left"
        >
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-secondary ring-1 ring-border">
            <Image
              src="/time-a.png"
              alt="Escudo do Time A"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-foreground">Time A · Elenco Inscrito</p>
            <p className="text-xs text-muted-foreground">Técnico: Zé Carlos</p>
          </div>
          <ChevronDown
            className={cn(
              'h-5 w-5 shrink-0 text-muted-foreground transition-transform',
              expanded && 'rotate-180',
            )}
          />
        </button>

        {expanded ? (
          <ul className="border-t border-border">
            {timeASquad.map((player) => (
              <li
                key={player.number}
                className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-xs font-extrabold text-secondary-foreground">
                  {player.number}
                </span>
                <Image
                  src={player.avatar}
                  alt={`Foto de ${player.name}`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-accent"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{player.name}</p>
                  <p className="text-xs text-muted-foreground">{player.position}</p>
                </div>
                {player.tag ? (
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                    {player.tag}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
