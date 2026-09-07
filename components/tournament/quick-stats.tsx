import Image from 'next/image'
import { Target, Flame } from 'lucide-react'

export function QuickStats() {
  return (
    <section className="px-5 pt-6" aria-labelledby="stats-title">
      <h2
        id="stats-title"
        className="font-display text-base font-bold tracking-tight text-foreground"
      >
        Destaques
      </h2>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {/* Top Artilheiro */}
        <div className="flex flex-col rounded-3xl bg-card p-4 shadow-sm ring-1 ring-border">
          <div className="flex items-center gap-1.5 text-primary">
            <Flame className="h-4 w-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Top Artilheiro
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <Image
              src="/joaozinho.png"
              alt="Foto de Joãozinho"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-accent"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                Joãozinho
              </p>
              <p className="text-xs text-muted-foreground">Time A</p>
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-extrabold text-foreground">
            8 <span className="text-sm font-semibold text-muted-foreground">Gols</span>
          </p>
        </div>

        {/* Melhor Ataque */}
        <div className="flex flex-col rounded-3xl bg-card p-4 shadow-sm ring-1 ring-border">
          <div className="flex items-center gap-1.5 text-primary">
            <Target className="h-4 w-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Melhor Ataque
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary ring-1 ring-border overflow-hidden">
              <Image
                src="/time-a.png"
                alt="Escudo do Time A"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                Time A
              </p>
              <p className="text-xs text-muted-foreground">Ataque</p>
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-extrabold text-foreground">
            15 <span className="text-sm font-semibold text-muted-foreground">Gols</span>
          </p>
        </div>
      </div>
    </section>
  )
}
