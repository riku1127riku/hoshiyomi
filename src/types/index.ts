export type Gender = 'female' | 'male' | 'other'

export interface Profile {
  id: string
  initials: string
  birth_date: string
  gender: Gender
  life_number: number
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string | null
  stripe_customer_id: string | null
  status: 'trialing' | 'active' | 'canceled' | 'past_due'
  trial_end: string | null
  current_period_end: string | null
}

export interface Fortune {
  id: string
  user_id: string
  date: string
  score: number
  score_label: string
  love_message: string
  todays_word: string
  lucky_action: string
  created_at: string
}
