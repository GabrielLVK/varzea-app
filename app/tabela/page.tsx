import { TournamentHeader } from '@/components/tournament/tournament-header'
import { NavTabs } from '@/components/tournament/nav-tabs'
import { StandingsTable } from '@/components/tournament/standings-table'
import { BottomNav } from '@/components/tournament/bottom-nav'

export default function TabelaPage() {
  return (
    <div className="flex min-h-screen justify-center bg-secondary font-sans">
      <div className="relative flex w-full max-w-md flex-col bg-background">
        <TournamentHeader status="Fase de Grupos · Grupo A" />
        <NavTabs />
        <main className="flex-1 pb-6">
          <StandingsTable />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
