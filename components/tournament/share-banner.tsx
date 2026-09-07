import { Link2, Share2 } from 'lucide-react'

export function ShareBanner() {
  return (
    <section className="px-5 pt-6">
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-3xl bg-accent px-4 py-4 text-left ring-1 ring-primary/15 transition-colors hover:bg-accent/70"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Link2 className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-accent-foreground">
            Compartilhar Campeonato
          </p>
          <p className="truncate text-xs text-accent-foreground/70">
            Convide a galera para acompanhar a Copa
          </p>
        </div>
        <Share2 className="h-5 w-5 shrink-0 text-primary" />
      </button>
    </section>
  )
}
