export type Position = 'Goleiro' | 'Zagueiro' | 'Meia' | 'Atacante'

export const POSITIONS: Position[] = ['Goleiro', 'Zagueiro', 'Meia', 'Atacante']

export type Team = {
  id: string
  name: string
  coach: string
  crest?: string
}

export type Player = {
  id: string
  teamId: string
  name: string
  number: number
  position: Position
}

export type Fixture = {
  id: string
  homeId: string
  awayId: string
  date: string
  time: string
  location: string
  round: string
}

export type PlayerStats = {
  goals: number
  yellow: number
  red: number
}

export const seedTeams: Team[] = [
  { id: 'a', name: 'Time A', coach: 'Zé Carlos', crest: '/time-a.png' },
  { id: 'b', name: 'Time B', coach: 'Beto Silva', crest: '/time-b.png' },
  { id: 'c', name: 'Time C', coach: 'Nando Souza', crest: '/time-c.png' },
  { id: 'd', name: 'Time D', coach: 'Rui Andrade', crest: '/time-d.png' },
]

export const seedPlayers: Player[] = [
  { id: 'p1', teamId: 'a', name: 'Joãozinho', number: 10, position: 'Atacante' },
  { id: 'p2', teamId: 'a', name: 'Marcos', number: 1, position: 'Goleiro' },
  { id: 'p3', teamId: 'a', name: 'Lucas', number: 7, position: 'Meia' },
  { id: 'p4', teamId: 'a', name: 'Pedrinho', number: 5, position: 'Zagueiro' },
  { id: 'p5', teamId: 'b', name: 'Rafael', number: 9, position: 'Atacante' },
  { id: 'p6', teamId: 'b', name: 'Diego', number: 4, position: 'Zagueiro' },
]

export const seedFixtures: Fixture[] = [
  {
    id: 'f1',
    homeId: 'a',
    awayId: 'b',
    date: '2026-09-10',
    time: '15:00',
    location: 'Campo do Zé',
    round: 'Rodada 3',
  },
  {
    id: 'f2',
    homeId: 'c',
    awayId: 'd',
    date: '2026-09-17',
    time: '15:30',
    location: 'Arena Várzea',
    round: 'Rodada 4',
  },
]

export function newId() {
  return Math.random().toString(36).slice(2, 9)
}
