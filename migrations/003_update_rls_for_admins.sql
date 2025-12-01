-- Update RLS policies for websites table to allow admins full access

-- 1. Websites Table Policies

drop policy if exists "Users can select own websites" on public.websites;
create policy "Users can select own websites" on public.websites for select using (
  owner = auth.uid() OR 
  (assignededitors is not null AND assignededitors @> jsonb_build_array(auth.jwt() ->> 'email')) OR
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

drop policy if exists "Users can insert websites" on public.websites;
create policy "Users can insert websites" on public.websites for insert with check (
  owner = auth.uid() OR
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

drop policy if exists "Users can update own websites" on public.websites;
create policy "Users can update own websites" on public.websites for update using (
  owner = auth.uid() OR 
  (assignededitors is not null AND assignededitors @> jsonb_build_array(auth.jwt() ->> 'email')) OR
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
) with check (
  owner = auth.uid() OR 
  (assignededitors is not null AND assignededitors @> jsonb_build_array(auth.jwt() ->> 'email')) OR
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

drop policy if exists "Users can delete own websites" on public.websites;
create policy "Users can delete own websites" on public.websites for delete using (
  owner = auth.uid() OR
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- 2. Chat Support Config Table Policies

drop policy if exists "Owners and editors can update chat config" on public.chat_support_config;
create policy "Owners and editors can update chat config" on public.chat_support_config
  for update using (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
    exists (
      select 1 from public.websites
      where websites.id = chat_support_config.website_id
      and (
        websites.owner = auth.uid()
        or (websites.assignededitors is not null and websites.assignededitors @> jsonb_build_array(auth.jwt() ->> 'email'))
      )
    )
  );

drop policy if exists "Owners and editors can insert chat config" on public.chat_support_config;
create policy "Owners and editors can insert chat config" on public.chat_support_config
  for insert with check (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin' OR
    exists (
      select 1 from public.websites
      where websites.id = chat_support_config.website_id
      and (
        websites.owner = auth.uid()
        or (websites.assignededitors is not null and websites.assignededitors @> jsonb_build_array(auth.jwt() ->> 'email'))
      )
    )
  );
