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
  standing?: string
}

const teams: Team[] = [
  { id: 'a', name: 'Time A', logo: '/time-a.png', players: 12, standing: '1º Colocado' },
  { id: 'b', name: 'Time B', logo: '/time-b.png', players: 10 },
  { id: 'c', name: 'Time C', logo: '/time-c.png', players: 11 },
]

type Squad = {
  number: number
  name: string
  avatar: string
  position: string
  tag?: string
  yellowCards?: number
}

const timeASquad: Squad[] = [
  { number: 10, name: 'Joãozinho', avatar: '/joaozinho.png', position: 'Atacante', tag: '8 Gols' },
  { number: 1, name: 'Marcos', avatar: '/marcos.png', position: 'Goleiro', tag: '2 Gols sofridos' },
  { number: 7, name: 'Lucas', avatar: '/lucas.png', position: 'Meio-campo', tag: '6 Assistências' },
  { number: 5, name: 'Pedrinho', avatar: '/pedrinho.png', position: 'Zagueiro', yellowCards: 1 },
]

export function TeamsDirectory() {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(true)

  const normalized = query.toLowerCase().trim()
  const filtered = teams.filter((t) => {
    if (!normalized) return true
    if (t.name.toLowerCase().includes(normalized)) return true
    // Busca também por jogador do elenco (Time A)
    if (t.id === 'a') {
      return timeASquad.some((p) => p.name.toLowerCase().includes(normalized))
    }
    return false
  })

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
          placeholder="Buscar time ou jogador..."
          aria-label="Buscar time ou jogador"
          className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {filtered.map((team) => (
          <li
            key={team.id}
            className="flex items-center gap-3.5 rounded-3xl bg-card p-3.5 shadow-sm ring-1 ring-border"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary ring-1 ring-border">
              <Image
                src={team.logo}
                alt={`Escudo do ${team.name}`}
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-bold text-foreground">{team.name}</p>
                {team.standing ? (
                  <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                    {team.standing}
                  </span>
                ) : null}
              </div>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                {team.players} Jogadores Cadastrados
              </p>
            </div>
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="rounded-3xl bg-card p-5 text-center text-sm text-muted-foreground ring-1 ring-border">
            Nenhum resultado para “{query}”.
          </li>
        ) : null}
      </ul>

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
            <p className="text-sm font-bold text-foreground">Elenco · Time A</p>
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
                  <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                    {player.tag}
                  </span>
                ) : null}
                {player.yellowCards ? (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-2.5 rounded-[2px] bg-amber-400"
                    />
                    {player.yellowCards}
                    <span className="sr-only">cartão amarelo</span>
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
