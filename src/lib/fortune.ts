import { calcLifeNumber, calcTodayNumber, calcFortuneScore } from './numerology'
import { Gender } from '@/types'
import fortunePool from '@/data/fortune-pool.json'

const SCORE_LABELS: Record<number, string> = {
  1: 'エネルギーを蓄える日',
  2: '内省が大切な日',
  3: '少しずつ前進できる日',
  4: '焦らず丁寧にいこう',
  5: '変化の予感がする日',
  6: '縁がつながりやすい日',
  7: '直感を信じていい日',
  8: '恋が動き出す予感',
  9: '運命の流れに乗れる日',
  10: '特別な輝きをまとう日',
}

interface FortuneInput {
  initials: string
  birthDate: string
  gender: Gender
  today: Date
}

export interface FortuneResult {
  score: number
  scoreLabel: string
  loveMessage: string
  todaysWord: string
  luckyAction: string
}

export async function generateFortune(input: FortuneInput): Promise<FortuneResult> {
  const { birthDate, gender, today } = input
  const lifeNumber = calcLifeNumber(birthDate)
  const todayNumber = calcTodayNumber(today)
  const score = calcFortuneScore(lifeNumber, todayNumber)
  const scoreLabel = SCORE_LABELS[score]

  const pool = (fortunePool as Record<string, Record<string, { loveMessage: string; todaysWord: string; luckyAction: string }[]>>)
  const variants = pool[gender]?.[score] ?? pool['other'][score] ?? []

  // 日付ベースで選ぶことで同じ日は同じメッセージになる
  const dateKey = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  const idx = dateKey % variants.length
  const picked = variants[idx]

  return {
    score,
    scoreLabel,
    loveMessage: picked.loveMessage,
    todaysWord: picked.todaysWord,
    luckyAction: picked.luckyAction,
  }
}
