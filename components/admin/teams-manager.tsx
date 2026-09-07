'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Pencil, Plus, Trash2, Upload, X } from 'lucide-react'
import { type Team, newId } from '@/lib/admin'
import { Field, inputClass, SectionCard, SuccessMessage } from '@/components/admin/ui'

export function TeamsManager({
  teams,
  setTeams,
  players,
  setPlayers,
}: {
  teams: Team[]
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>
  players: { teamId: string }[]
  setPlayers: React.Dispatch<React.SetStateAction<any[]>>
}) {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [coach, setCoach] = useState('')
  const [crest, setCrest] = useState<string | undefined>(undefined)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function resetForm() {
    setEditingId(null)
    setName('')
    setCoach('')
    setCrest(undefined)
    setError('')
    if (fileRef.current) fileRef.current.value = ''
  }

  function openCreate() {
    resetForm()
    setSuccess('')
    setOpen(true)
  }

  function openEdit(team: Team) {
    setSuccess('')
    setEditingId(team.id)
    setName(team.name)
    setCoach(team.coach)
    setCrest(team.crest)
    setError('')
    setOpen(true)
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setCrest(URL.createObjectURL(file))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !coach.trim()) {
      setError('Informe o nome do time e do técnico.')
      return
    }
    if (editingId) {
      setTeams((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, name, coach, crest } : t)),
      )
      setSuccess(`Equipe "${name}" atualizada com sucesso!`)
    } else {
      setTeams((prev) => [...prev, { id: newId(), name, coach, crest }])
      setSuccess(`Equipe "${name}" cadastrada com sucesso!`)
    }
    resetForm()
    setOpen(false)
  }

  function handleDelete(team: Team) {
    setTeams((prev) => prev.filter((t) => t.id !== team.id))
    setPlayers((prev) => prev.filter((p) => p.teamId !== team.id))
    setSuccess(`Equipe "${team.name}" excluída.`)
  }

  return (
    <SectionCard
      title="Cadastro de Equipes"
      description="Gerencie os times participantes da Copa Várzea 2026."
    >
      {success ? (
        <div className="mb-4">
          <SuccessMessage message={success} />
        </div>
      ) : null}

      {!open ? (
        <button
          type="button"
          onClick={openCreate}
          className="mb-4 inline-flex items-center gap-1.5 rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Cadastrar Nova Equipe
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mb-5 flex flex-col gap-4 rounded-2xl bg-secondary/60 p-4 ring-1 ring-border"
          noValidate
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">
              {editingId ? 'Editar Equipe' : 'Nova Equipe'}
            </h3>
            <button
              type="button"
              aria-label="Fechar formulário"
              onClick={() => {
                resetForm()
                setOpen(false)
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-card ring-1 ring-border">
              {crest ? (
                <Image
                  src={crest || "/placeholder.svg"}
                  alt="Prévia do escudo"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  unoptimized
                />
              ) : (
                <Upload className="h-5 w-5 text-muted-foreground" />
              )}
            </span>
            <div className="flex-1">
              <Field label="Escudo do Time" htmlFor="crest">
                <input
                  id="crest"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={onFile}
                  className="block w-full text-xs text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-accent-foreground"
                />
              </Field>
            </div>
          </div>

          <Field label="Nome do Time" htmlFor="team-name">
            <input
              id="team-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Unidos da Várzea"
              className={inputClass}
            />
          </Field>

          <Field label="Nome do Técnico" htmlFor="team-coach">
            <input
              id="team-coach"
              value={coach}
              onChange={(e) => setCoach(e.target.value)}
              placeholder="Ex.: Zé Carlos"
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
            className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            {editingId ? 'Salvar Alterações' : 'Cadastrar Equipe'}
          </button>
        </form>
      )}

      <ul className="flex flex-col gap-2.5">
        {teams.map((team) => {
          const count = players.filter((p) => p.teamId === team.id).length
          return (
            <li
              key={team.id}
              className="flex items-center gap-3 rounded-2xl bg-secondary/60 p-3 ring-1 ring-border"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-card ring-1 ring-border">
                {team.crest ? (
                  <Image
                    src={team.crest || "/placeholder.svg"}
                    alt={`Escudo do ${team.name}`}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                    unoptimized
                  />
                ) : (
                  <span className="font-display text-sm font-extrabold text-muted-foreground">
                    {team.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{team.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  Técnico: {team.coach} · {count} jogador{count === 1 ? '' : 'es'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openEdit(team)}
                aria-label={`Editar ${team.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-card text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(team)}
                aria-label={`Excluir ${team.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10 text-destructive ring-1 ring-border transition-colors hover:bg-destructive/20"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          )
        })}
        {teams.length === 0 ? (
          <li className="rounded-2xl bg-secondary/60 p-4 text-center text-sm text-muted-foreground ring-1 ring-border">
            Nenhuma equipe cadastrada ainda.
          </li>
        ) : null}
      </ul>
    </SectionCard>
  )
}
