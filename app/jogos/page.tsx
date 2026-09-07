import { TournamentHeader } from '@/components/tournament/tournament-header'
import { NavTabs } from '@/components/tournament/nav-tabs'
import { MatchesList } from '@/components/tournament/matches-list'
import { BottomNav } from '@/components/tournament/bottom-nav'

export default function JogosPage() {
  return (
    <div className="flex min-h-screen justify-center bg-secondary font-sans">
      <div className="relative flex w-full max-w-md flex-col bg-background">
        <TournamentHeader status="Fase de Grupos · Rodada 4" />
        <NavTabs />
        <main className="flex-1 pb-6">
          <MatchesList />
        </main>
        <BottomNav activeItem="Campeonato" />
      </div>
    </div>
  )
}
