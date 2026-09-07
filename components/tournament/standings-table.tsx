import Image from 'next/image'
import { cn } from '@/lib/utils'

type Row = {
  pos: number
  team: string
  logo: string
  p: number
  j: number
  v: number
  e: number
  d: number
}

const rows: Row[] = [
  { pos: 1, team: 'Time A', logo: '/time-a.png', p: 12, j: 4, v: 4, e: 0, d: 0 },
  { pos: 2, team: 'Time B', logo: '/time-b.png', p: 9, j: 4, v: 3, e: 0, d: 1 },
  { pos: 3, team: 'Time C', logo: '/time-c.png', p: 3, j: 4, v: 1, e: 0, d: 3 },
  { pos: 4, team: 'Time D', logo: '/time-d.png', p: 0, j: 4, v: 0, e: 0, d: 4 },
]

const cols: { key: keyof Pick<Row, 'p' | 'j' | 'v' | 'e' | 'd'>; label: string }[] = [
  { key: 'p', label: 'P' },
  { key: 'j', label: 'J' },
  { key: 'v', label: 'V' },
  { key: 'e', label: 'E' },
  { key: 'd', label: 'D' },
]

export function StandingsTable() {
  return (
    <section className="px-5 pt-5" aria-labelledby="tabela-title">
      <div className="flex items-center justify-between">
        <h2
          id="tabela-title"
          className="font-display text-base font-bold tracking-tight text-foreground"
        >
          Classificação
        </h2>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Classificado
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <span className="w-5 text-center">Pos</span>
          <span className="flex-1">Time</span>
          {cols.map((c) => (
            <span key={c.key} className="w-6 text-center">
              {c.label}
            </span>
          ))}
        </div>

        {/* Rows */}
        <ul>
          {rows.map((row) => {
            const promoted = row.pos <= 2
            return (
              <li
                key={row.pos}
                className="relative flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
              >
                <span
                  className={cn(
                    'absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full',
                    promoted ? 'bg-primary' : 'bg-transparent',
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    'w-5 text-center font-display text-sm font-extrabold',
                    promoted ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {row.pos}
                </span>
                <span className="flex flex-1 items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-secondary ring-1 ring-border">
                    <Image
                      src={row.logo}
                      alt={`Escudo do ${row.team}`}
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{row.team}</span>
                </span>
                {cols.map((c) => (
                  <span
                    key={c.key}
                    className={cn(
                      'w-6 text-center text-sm tabular-nums',
                      c.key === 'p'
                        ? 'font-bold text-foreground'
                        : 'font-medium text-muted-foreground',
                    )}
                  >
                    {row[c.key]}
                  </span>
                ))}
              </li>
            )
          })}
        </ul>
      </div>

      <p className="mt-3 px-1 text-[11px] leading-relaxed text-muted-foreground">
        P: Pontos · J: Jogos · V: Vitórias · E: Empates · D: Derrotas
      </p>
    </section>
  )
}
