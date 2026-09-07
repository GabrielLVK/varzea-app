import { TournamentHeader } from '@/components/tournament/tournament-header'
import { NavTabs } from '@/components/tournament/nav-tabs'
import { StatsLeaders } from '@/components/tournament/stats-leaders'
import { BottomNav } from '@/components/tournament/bottom-nav'

export default function EstatisticasPage() {
  return (
    <div className="flex min-h-screen justify-center bg-secondary font-sans">
      <div className="relative flex w-full max-w-md flex-col bg-background">
        <TournamentHeader status="Estatísticas Gerais" />
        <NavTabs />
        <main className="flex-1 pb-6">
          <StatsLeaders />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
