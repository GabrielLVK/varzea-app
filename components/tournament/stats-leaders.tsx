import Image from 'next/image'
import { Handshake, Flame, TrendingDown, ShieldCheck, RectangleVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

type Player = {
  rank: number
  name: string
  team: string
  avatar: string
  value: string
}

const medalStyles: Record<number, string> = {
  1: 'bg-[oklch(0.85_0.13_95)] text-[oklch(0.35_0.09_80)]',
  2: 'bg-[oklch(0.85_0.01_240)] text-[oklch(0.4_0.02_240)]',
  3: 'bg-[oklch(0.78_0.09_55)] text-[oklch(0.34_0.08_50)]',
}

function PlayerRankRow({ player }: { player: Player }) {
  return (
    <li className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0">
      <span
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-display text-xs font-extrabold',
          medalStyles[player.rank] ?? 'bg-secondary text-muted-foreground',
        )}
      >
        {player.rank}
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
        <p className="text-xs text-muted-foreground">{player.team}</p>
      </div>
      <span className="font-display text-base font-extrabold text-foreground">{player.value}</span>
    </li>
  )
}

function LeaderCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3 text-primary">
        <Icon className="h-4 w-4" />
        <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      {children}
    </div>
  )
}

const assists: Player[] = [
  { rank: 1, name: 'Lucas', team: 'Time C', avatar: '/lucas.png', value: '6' },
  { rank: 2, name: 'Joãozinho', team: 'Time A', avatar: '/joaozinho.png', value: '5' },
  { rank: 3, name: 'Pedro', team: 'Time B', avatar: '/pedro.png', value: '4' },
]

const scorers: Player[] = [
  { rank: 1, name: 'Joãozinho', team: 'Time A', avatar: '/joaozinho.png', value: '8' },
  { rank: 2, name: 'Lucas', team: 'Time C', avatar: '/lucas.png', value: '6' },
  { rank: 3, name: 'Pedro', team: 'Time B', avatar: '/pedro.png', value: '4' },
]

function TeamHighlight({
  logo,
  name,
  detail,
  children,
}: {
  logo?: string
  name: string
  detail: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-4">
      {logo ? (
        <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-secondary ring-1 ring-border">
          <Image
            src={logo}
            alt={`Escudo do ${name}`}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
      {children}
    </div>
  )
}

export function StatsLeaders() {
  return (
    <section className="flex flex-col gap-5 px-5 pt-5" aria-label="Líderes de estatísticas">
      <LeaderCard icon={Handshake} label="Top Assistências">
        <ul>
          {assists.map((p) => (
            <PlayerRankRow key={p.name} player={p} />
          ))}
        </ul>
      </LeaderCard>

      <LeaderCard icon={Flame} label="Maiores Artilheiros">
        <ul>
          {scorers.map((p) => (
            <PlayerRankRow key={p.name} player={p} />
          ))}
        </ul>
      </LeaderCard>

      <LeaderCard icon={ShieldCheck} label="Melhor Defesa · Goleiro Menos Vazado">
        <TeamHighlight logo="/marcos.png" name="Marcos" detail="Time A">
          <span className="font-display text-lg font-extrabold text-foreground">
            2 <span className="text-xs font-semibold text-muted-foreground">Sofridos</span>
          </span>
        </TeamHighlight>
      </LeaderCard>

      <LeaderCard icon={TrendingDown} label="Pior Ataque">
        <TeamHighlight logo="/time-d.png" name="Time D" detail="Menos gols marcados">
          <span className="font-display text-lg font-extrabold text-foreground">
            2 <span className="text-xs font-semibold text-muted-foreground">Gols Pró</span>
          </span>
        </TeamHighlight>
      </LeaderCard>

      <LeaderCard icon={RectangleVertical} label="Pior Equipe Disciplinar">
        <TeamHighlight logo="/time-b.png" name="Time B" detail="Maiores cartões">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-[oklch(0.9_0.14_95)]/40 px-2 py-1">
              <span className="h-3.5 w-2.5 rounded-[2px] bg-[oklch(0.8_0.16_95)]" aria-hidden="true" />
              <span className="text-xs font-bold text-foreground">4</span>
              <span className="sr-only">cartões amarelos</span>
            </span>
            <span className="flex items-center gap-1 rounded-full bg-destructive/15 px-2 py-1">
              <span className="h-3.5 w-2.5 rounded-[2px] bg-destructive" aria-hidden="true" />
              <span className="text-xs font-bold text-foreground">1</span>
              <span className="sr-only">cartão vermelho</span>
            </span>
          </div>
        </TeamHighlight>
      </LeaderCard>
    </section>
  )
}
