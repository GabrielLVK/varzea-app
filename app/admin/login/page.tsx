'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, KeyRound, Lock, User } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!login.trim() || !password.trim()) {
      setError('Preencha o e-mail/usuário e a senha para continuar.')
      return
    }
    setError('')
    router.push('/admin/dashboard')
  }

  return (
    <div className="flex min-h-screen justify-center bg-secondary font-sans">
      <div className="relative flex w-full max-w-md flex-col bg-background">
        <header className="bg-primary text-primary-foreground px-5 pt-8 pb-8 rounded-b-3xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/20 overflow-hidden">
              <Image
                src="/crest-copa.png"
                alt="Escudo da Copa Várzea 2026"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </div>
            <div>
              <h1 className="font-display text-xl font-extrabold leading-tight tracking-tight text-balance">
                Acesso do Organizador
              </h1>
              <p className="text-xs font-medium text-primary-foreground/70">VárzeaApp</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 pt-6">
          <div className="mb-5 flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-accent-foreground">
            <KeyRound className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium text-pretty">
              Entre com suas credenciais para gerenciar o campeonato.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div>
              <label
                htmlFor="login"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                E-mail ou Usuário
              </label>
              <div className="flex items-center gap-2 rounded-2xl bg-card px-3.5 py-3 ring-1 ring-border focus-within:ring-2 focus-within:ring-primary">
                <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  id="login"
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="organizador@varzea.com"
                  autoComplete="username"
                  className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Senha
              </label>
              <div className="flex items-center gap-2 rounded-2xl bg-card px-3.5 py-3 ring-1 ring-border focus-within:ring-2 focus-within:ring-primary">
                <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {error ? (
              <p role="alert" className="text-sm font-semibold text-destructive">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="mt-1 w-full rounded-2xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Entrar no Painel
            </button>
          </form>

          <Link
            href="/"
            className="mt-6 flex items-center justify-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a Visão do Torcedor
          </Link>
        </main>
      </div>
    </div>
  )
}
