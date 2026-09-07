import { TournamentHeader } from '@/components/tournament/tournament-header'
import { TeamsDirectory } from '@/components/tournament/teams-directory'
import { BottomNav } from '@/components/tournament/bottom-nav'

export default function TimesPage() {
  return (
    <div className="flex min-h-screen justify-center bg-secondary font-sans">
      <div className="relative flex w-full max-w-md flex-col bg-background">
        <TournamentHeader status="4 Equipes · Grupo A" />
        <main className="flex-1 pb-6">
          <TeamsDirectory />
        </main>
        <BottomNav activeItem="Times" />
      </div>
    </div>
  )
}
