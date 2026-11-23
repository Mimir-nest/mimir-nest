-- Bug Squash Arena: run once in the Supabase SQL editor.

create table if not exists public.arena_completions (
  id          bigint generated always as identity primary key,
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  slug        text not null check (slug ~ '^[a-z0-9-]+$'),
  src_sha256  text not null check (src_sha256 ~ '^[0-9a-f]{64}$'),
  duration_s  integer not null check (duration_s >= 0),
  mode        text not null check (mode in ('standard', 'interview', 'ai-pr')),
  autopsy     text check (autopsy is null or length(autopsy) <= 8000),
  created_at  timestamptz not null default now(),
  unique (user_id, slug, src_sha256)
);

alter table public.arena_completions enable row level security;

create policy "own rows: read"   on public.arena_completions for select using (auth.uid() = user_id);
create policy "own rows: insert" on public.arena_completions for insert with check (auth.uid() = user_id);
create policy "own rows: autopsy" on public.arena_completions for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Public per-challenge totals for the ticket wall, without exposing who completed what.
create or replace function public.arena_completion_counts()
returns table (slug text, completions bigint)
language sql stable security definer set search_path = public
as $$
  select slug, count(distinct user_id) from public.arena_completions group by slug;
$$;

grant execute on function public.arena_completion_counts() to anon, authenticated;
