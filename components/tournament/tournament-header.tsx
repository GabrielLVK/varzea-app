import Image from 'next/image'
import { Bell } from 'lucide-react'

export function TournamentHeader() {
  return (
    <header className="bg-primary text-primary-foreground px-5 pt-8 pb-6 rounded-b-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/20 overflow-hidden">
            <Image
              src="/crest-copa.png"
              alt="Escudo da Copa Várzea 2026"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
          </div>
          <div>
            <h1 className="font-display text-xl font-extrabold leading-tight tracking-tight text-balance">
              Copa Várzea 2026
            </h1>
            <p className="text-xs font-medium text-primary-foreground/70">
              Visão do Torcedor
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Notificações"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15 ring-1 ring-primary-foreground/20 transition-colors hover:bg-primary-foreground/25"
        >
          <Bell className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1.5 ring-1 ring-primary-foreground/20">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground" />
        </span>
        <span className="text-xs font-semibold">
          Fase de Grupos · Rodada 4
        </span>
      </div>
    </header>
  )
}
