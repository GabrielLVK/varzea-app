import Image from 'next/image'
import { CalendarClock, MapPin, ChevronRight } from 'lucide-react'

function TeamBadge({
  src,
  alt,
  name,
}: {
  src: string
  alt: string
  name: string
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary ring-1 ring-border overflow-hidden">
        <Image src={src} alt={alt} width={56} height={56} className="h-14 w-14 object-contain" />
      </div>
      <span className="text-sm font-semibold text-foreground">{name}</span>
    </div>
  )
}

export function NextMatchCard() {
  return (
    <section className="px-5 pt-5">
      <div className="rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Próxima Partida
          </span>
          <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
            Rodada 4
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <TeamBadge src="/time-a.png" alt="Escudo do Time A" name="Time A" />
          <span className="font-display text-lg font-extrabold text-muted-foreground">
            VS
          </span>
          <TeamBadge src="/time-b.png" alt="Escudo do Time B" name="Time B" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2.5">
            <CalendarClock className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-xs font-medium text-secondary-foreground">
              Sábado, 15:00
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-xs font-medium text-secondary-foreground">
              Campo do Zé
            </span>
          </div>
        </div>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-1 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ver Detalhes
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
