'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Minus, Plus, Send } from 'lucide-react'
import { type Fixture, type Player, type PlayerStats, type Team } from '@/lib/admin'
import { Field, inputClass, SectionCard, selectClass, SuccessMessage } from '@/components/admin/ui'
import { cn } from '@/lib/utils'

type EventsMap = Record<string, PlayerStats>

function emptyStats(): PlayerStats {
  return { goals: 0, yellow: 0, red: 0 }
}

export function SumulaManager({
  teams,
  players,
  fixtures,
}: {
  teams: Team[]
  players: Player[]
  fixtures: Fixture[]
}) {
  const [matchId, setMatchId] = useState('')
  const [scoreHome, setScoreHome] = useState('')
  const [scoreAway, setScoreAway] = useState('')
  const [events, setEvents] = useState<EventsMap>({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const match = fixtures.find((f) => f.id === matchId)

  function teamName(id: string) {
    return teams.find((t) => t.id === id)?.name ?? '—'
  }

  const roster = useMemo(() => {
    if (!match) return [] as { teamId: string; teamName: string; list: Player[] }[]
    return [match.homeId, match.awayId].map((tid) => ({
      teamId: tid,
      teamName: teamName(tid),
      list: players.filter((p) => p.teamId === tid),
    }))
  }, [match, players, teams])

  function selectMatch(id: string) {
    setMatchId(id)
    setScoreHome('')
    setScoreAway('')
    setEvents({})
    setError('')
    setSuccess('')
  }

  function bump(playerId: string, key: keyof PlayerStats, delta: number, max: number) {
    setEvents((prev) => {
      const current = prev[playerId] ?? emptyStats()
      const next = Math.min(max, Math.max(0, current[key] + delta))
      return { ...prev, [playerId]: { ...current, [key]: next } }
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!matchId) {
      setError('Selecione a partida.')
      return
    }
    if (scoreHome.trim() === '' || scoreAway.trim() === '') {
      setError('Informe o placar dos dois times.')
      return
    }
    if (Number(scoreHome) < 0 || Number(scoreAway) < 0) {
      setError('O placar não pode ser negativo.')
      return
    }
    setError('')
    setSuccess(
      `Súmula publicada: ${teamName(match!.homeId)} ${scoreHome} x ${scoreAway} ${teamName(match!.awayId)}.`,
    )
  }

  return (
    <SectionCard
      title="Lançamento de Súmula e Resultados"
      description="Registre o placar e os eventos de cada partida."
    >
      {success ? (
        <div className="mb-4">
          <SuccessMessage message={success} />
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Field label="Partida" htmlFor="match">
          <div className="relative">
            <select
              id="match"
              value={matchId}
              onChange={(e) => selectMatch(e.target.value)}
              className={selectClass}
            >
              <option value="">Selecione a partida</option>
              {fixtures.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.round}: {teamName(f.homeId)} x {teamName(f.awayId)}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </Field>

        {match ? (
          <>
            <div className="rounded-2xl bg-secondary/60 p-4 ring-1 ring-border">
              <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
                <div>
                  <p className="mb-1.5 truncate text-center text-xs font-bold text-foreground">
                    {teamName(match.homeId)}
                  </p>
                  <input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={scoreHome}
                    onChange={(e) => setScoreHome(e.target.value)}
                    placeholder="0"
                    aria-label={`Placar ${teamName(match.homeId)}`}
                    className={cn(inputClass, 'text-center font-display text-2xl font-extrabold')}
                  />
                </div>
                <span className="pb-3 font-display text-lg font-extrabold text-muted-foreground">
                  x
                </span>
                <div>
                  <p className="mb-1.5 truncate text-center text-xs font-bold text-foreground">
                    {teamName(match.awayId)}
                  </p>
                  <input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={scoreAway}
                    onChange={(e) => setScoreAway(e.target.value)}
                    placeholder="0"
                    aria-label={`Placar ${teamName(match.awayId)}`}
                    className={cn(inputClass, 'text-center font-display text-2xl font-extrabold')}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {roster.map((group) => (
                <div key={group.teamId}>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Eventos · {group.teamName}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {group.list.map((player) => {
                      const stats = events[player.id] ?? emptyStats()
                      return (
                        <li
                          key={player.id}
                          className="rounded-2xl bg-secondary/60 p-3 ring-1 ring-border"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card font-display text-xs font-extrabold text-foreground ring-1 ring-border">
                              {player.number}
                            </span>
                            <p className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
                              {player.name}
                            </p>
                          </div>
                          <div className="mt-2.5 flex flex-wrap items-center gap-2">
                            <Stepper
                              label="Gols"
                              value={stats.goals}
                              onDec={() => bump(player.id, 'goals', -1, 20)}
                              onInc={() => bump(player.id, 'goals', 1, 20)}
                            />
                            <CardToggle
                              label="Amarelo"
                              color="bg-amber-400"
                              value={stats.yellow}
                              max={2}
                              onDec={() => bump(player.id, 'yellow', -1, 2)}
                              onInc={() => bump(player.id, 'yellow', 1, 2)}
                            />
                            <CardToggle
                              label="Vermelho"
                              color="bg-destructive"
                              value={stats.red}
                              max={1}
                              onDec={() => bump(player.id, 'red', -1, 1)}
                              onInc={() => bump(player.id, 'red', 1, 1)}
                            />
                          </div>
                        </li>
                      )
                    })}
                    {group.list.length === 0 ? (
                      <li className="rounded-2xl bg-card p-3 text-center text-xs text-muted-foreground ring-1 ring-border">
                        Sem jogadores cadastrados para este time.
                      </li>
                    ) : null}
                  </ul>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {error ? (
          <p role="alert" className="text-sm font-semibold text-destructive">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!match}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          Salvar e Publicar Súmula
        </button>
      </form>
    </SectionCard>
  )
}

function Stepper({
  label,
  value,
  onDec,
  onInc,
}: {
  label: string
  value: number
  onDec: () => void
  onInc: () => void
}) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-card px-1 py-1 ring-1 ring-border">
      <button
        type="button"
        onClick={onDec}
        aria-label={`Diminuir ${label}`}
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-14 text-center text-xs font-bold text-foreground tabular-nums">
        {label} {value}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label={`Adicionar ${label}`}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

function CardToggle({
  label,
  color,
  value,
  max,
  onDec,
  onInc,
}: {
  label: string
  color: string
  value: number
  max: number
  onDec: () => void
  onInc: () => void
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-1 py-1 ring-1 ring-border transition-colors',
        value > 0 ? 'bg-accent' : 'bg-card',
      )}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label={`Remover cartão ${label}`}
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="flex items-center gap-1.5 text-xs font-bold text-foreground">
        <span aria-hidden="true" className={cn('h-3.5 w-2.5 rounded-[2px]', color)} />
        {value}
        <span className="sr-only">cartões {label.toLowerCase()}</span>
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label={`Adicionar cartão ${label}`}
        disabled={value >= max}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
