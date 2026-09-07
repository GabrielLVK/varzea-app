'use client'

import { useState } from 'react'
import { CalendarPlus, ChevronDown, Clock, MapPin, Trash2 } from 'lucide-react'
import { type Fixture, type Team, newId } from '@/lib/admin'
import { Field, inputClass, SectionCard, selectClass, SuccessMessage } from '@/components/admin/ui'

function formatDate(iso: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function FixturesManager({
  teams,
  fixtures,
  setFixtures,
}: {
  teams: Team[]
  fixtures: Fixture[]
  setFixtures: React.Dispatch<React.SetStateAction<Fixture[]>>
}) {
  const [homeId, setHomeId] = useState('')
  const [awayId, setAwayId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [round, setRound] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function teamName(id: string) {
    return teams.find((t) => t.id === id)?.name ?? '—'
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!homeId || !awayId || !date || !time || !location.trim() || !round.trim()) {
      setError('Preencha todos os campos da partida.')
      return
    }
    if (homeId === awayId) {
      setError('O time mandante e o visitante devem ser diferentes.')
      return
    }
    setFixtures((prev) => [
      ...prev,
      { id: newId(), homeId, awayId, date, time, location, round },
    ])
    setSuccess(`Partida ${teamName(homeId)} x ${teamName(awayId)} agendada!`)
    setHomeId('')
    setAwayId('')
    setDate('')
    setTime('')
    setLocation('')
    setRound('')
    setError('')
  }

  function handleDelete(fixture: Fixture) {
    setFixtures((prev) => prev.filter((f) => f.id !== fixture.id))
    setSuccess('Partida removida da agenda.')
  }

  return (
    <SectionCard
      title="Agendamento de Jogos"
      description="Defina os confrontos, datas e locais das partidas."
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
        <div className="grid grid-cols-2 gap-3">
          <Field label="Time Mandante" htmlFor="home">
            <div className="relative">
              <select
                id="home"
                value={homeId}
                onChange={(e) => setHomeId(e.target.value)}
                className={selectClass}
              >
                <option value="">Selecione</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </Field>

          <Field label="Time Visitante" htmlFor="away">
            <div className="relative">
              <select
                id="away"
                value={awayId}
                onChange={(e) => setAwayId(e.target.value)}
                className={selectClass}
              >
                <option value="">Selecione</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Data" htmlFor="date">
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Horário" htmlFor="time">
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Local / Campo" htmlFor="location">
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex.: Campo do Zé"
            className={inputClass}
          />
        </Field>

        <Field label="Rodada" htmlFor="round">
          <input
            id="round"
            value={round}
            onChange={(e) => setRound(e.target.value)}
            placeholder="Ex.: Rodada 5"
            className={inputClass}
          />
        </Field>

        {error ? (
          <p role="alert" className="text-sm font-semibold text-destructive">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <CalendarPlus className="h-4 w-4" />
          Salvar Partida
        </button>
      </form>

      <ul className="flex flex-col gap-2.5">
        {fixtures.map((fixture) => (
          <li
            key={fixture.id}
            className="rounded-2xl bg-secondary/60 p-3.5 ring-1 ring-border"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {fixture.round}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(fixture)}
                aria-label="Excluir partida"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-1.5 text-sm font-bold text-foreground">
              {teamName(fixture.homeId)} <span className="text-muted-foreground">x</span>{' '}
              {teamName(fixture.awayId)}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {formatDate(fixture.date)} · {fixture.time}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {fixture.location}
              </span>
            </div>
          </li>
        ))}
        {fixtures.length === 0 ? (
          <li className="rounded-2xl bg-secondary/60 p-4 text-center text-sm text-muted-foreground ring-1 ring-border">
            Nenhuma partida agendada ainda.
          </li>
        ) : null}
      </ul>
    </SectionCard>
  )
}
