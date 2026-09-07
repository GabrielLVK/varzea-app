'use client'

import { useState } from 'react'
import { ChevronDown, Trash2, UserPlus } from 'lucide-react'
import { type Player, type Position, POSITIONS, type Team, newId } from '@/lib/admin'
import { Field, inputClass, SectionCard, selectClass, SuccessMessage } from '@/components/admin/ui'

export function PlayersManager({
  teams,
  players,
  setPlayers,
}: {
  teams: Team[]
  players: Player[]
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
}) {
  const [teamId, setTeamId] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [position, setPosition] = useState<Position | ''>('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const num = Number(number)
    if (!teamId || !name.trim() || !number.trim() || !position) {
      setError('Preencha todos os campos do jogador.')
      return
    }
    if (!Number.isInteger(num) || num <= 0 || num > 99) {
      setError('O número da camisa deve ser entre 1 e 99.')
      return
    }
    setPlayers((prev) => [
      ...prev,
      { id: newId(), teamId, name, number: num, position },
    ])
    const teamName = teams.find((t) => t.id === teamId)?.name ?? ''
    setSuccess(`Jogador "${name}" adicionado ao ${teamName}!`)
    setName('')
    setNumber('')
    setPosition('')
    setError('')
  }

  function handleDelete(player: Player) {
    setPlayers((prev) => prev.filter((p) => p.id !== player.id))
    setSuccess(`Jogador "${player.name}" removido.`)
  }

  const grouped = teams
    .map((t) => ({ team: t, roster: players.filter((p) => p.teamId === t.id) }))
    .filter((g) => g.roster.length > 0)

  return (
    <SectionCard
      title="Cadastro de Jogadores"
      description="Monte o elenco de cada equipe do campeonato."
    >
      {success ? (
        <div className="mb-4">
          <SuccessMessage message={success} />
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="mb-5 flex flex-col gap-4 rounded-2xl bg-secondary/60 p-4 ring-1 ring-border"
        noValidate
      >
        <Field label="Equipe" htmlFor="player-team">
          <div className="relative">
            <select
              id="player-team"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className={selectClass}
            >
              <option value="">Selecione a equipe</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </Field>

        <Field label="Nome do Jogador" htmlFor="player-name">
          <input
            id="player-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Joãozinho"
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Número" htmlFor="player-number">
            <input
              id="player-number"
              type="number"
              min={1}
              max={99}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="10"
              className={inputClass}
            />
          </Field>

          <Field label="Posição" htmlFor="player-position">
            <div className="relative">
              <select
                id="player-position"
                value={position}
                onChange={(e) => setPosition(e.target.value as Position)}
                className={selectClass}
              >
                <option value="">Selecione</option>
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </Field>
        </div>

        {error ? (
          <p role="alert" className="text-sm font-semibold text-destructive">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <UserPlus className="h-4 w-4" />
          Cadastrar Jogador
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {grouped.map(({ team, roster }) => (
          <div key={team.id}>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {team.name}
            </p>
            <ul className="flex flex-col gap-2">
              {roster.map((player) => (
                <li
                  key={player.id}
                  className="flex items-center gap-3 rounded-2xl bg-secondary/60 p-3 ring-1 ring-border"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card font-display text-xs font-extrabold text-foreground ring-1 ring-border">
                    {player.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.position}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(player)}
                    aria-label={`Excluir ${player.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-border transition-colors hover:bg-destructive/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {grouped.length === 0 ? (
          <p className="rounded-2xl bg-secondary/60 p-4 text-center text-sm text-muted-foreground ring-1 ring-border">
            Nenhum jogador cadastrado ainda.
          </p>
        ) : null}
      </div>
    </SectionCard>
  )
}
