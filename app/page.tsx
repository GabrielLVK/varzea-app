import { TournamentHeader } from '@/components/tournament/tournament-header'
import { NavTabs } from '@/components/tournament/nav-tabs'
import { NextMatchCard } from '@/components/tournament/next-match-card'
import { QuickStats } from '@/components/tournament/quick-stats'
import { ShareBanner } from '@/components/tournament/share-banner'
import { BottomNav } from '@/components/tournament/bottom-nav'

export default function Page() {
  return (
    <div className="flex min-h-screen justify-center bg-secondary font-sans">
      <div className="relative flex w-full max-w-md flex-col bg-background">
        <TournamentHeader />
        <NavTabs />
        <main className="flex-1 pb-6">
          <NextMatchCard />
          <QuickStats />
          <ShareBanner />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
