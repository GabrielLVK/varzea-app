import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export const inputClass =
  'w-full rounded-2xl bg-card px-3.5 py-3 text-sm font-medium text-foreground outline-none ring-1 ring-border transition-shadow focus:ring-2 focus:ring-primary placeholder:text-muted-foreground'

export const selectClass = cn(inputClass, 'appearance-none pr-9')

export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border">
      <div className="mb-4">
        <h2 className="font-display text-lg font-extrabold tracking-tight text-foreground text-balance">
          {title}
        </h2>
        {description ? (
          <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export function SuccessMessage({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground"
    >
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      {message}
    </div>
  )
}
