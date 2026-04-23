function reduceToSingleDigit(n: number): number {
  while (n > 9) {
    n = String(n).split('').reduce((sum, d) => sum + parseInt(d), 0)
  }
  return n
}

export function calcLifeNumber(birthDate: string): number {
  const digits = birthDate.replace(/-/g, '').split('').map(Number)
  const sum = digits.reduce((a, b) => a + b, 0)
  return reduceToSingleDigit(sum)
}

export function calcTodayNumber(date: Date): number {
  const str = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('')
  const digits = str.split('').map(Number)
  const sum = digits.reduce((a, b) => a + b, 0)
  return reduceToSingleDigit(sum)
}

export function calcFortuneScore(lifeNumber: number, todayNumber: number): number {
  const raw = (lifeNumber + todayNumber * 2) % 10 + 1
  return raw
}
