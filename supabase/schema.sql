-- profiles テーブル
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  initials text not null,
  birth_date date not null,
  gender text not null check (gender in ('female', 'male', 'other')),
  life_number int not null,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "自分のプロフィールのみ参照可能"
  on public.profiles for select
  using (auth.uid() = id);

create policy "自分のプロフィールのみ作成可能"
  on public.profiles for insert
  with check (auth.uid() = id);

-- subscriptions テーブル
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  stripe_subscription_id text unique,
  stripe_customer_id text,
  status text not null default 'trialing',
  trial_end timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.subscriptions enable row level security;

create policy "自分のサブスクのみ参照可能"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- fortunes テーブル
create table public.fortunes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  date date not null,
  score int not null check (score between 1 and 10),
  score_label text not null,
  love_message text not null,
  todays_word text not null,
  lucky_action text not null,
  created_at timestamptz default now(),
  unique(user_id, date)
);

alter table public.fortunes enable row level security;

create policy "自分の運勢のみ参照可能"
  on public.fortunes for select
  using (auth.uid() = user_id);

create policy "サービス側のみ運勢を作成可能"
  on public.fortunes for insert
  with check (auth.uid() = user_id);
