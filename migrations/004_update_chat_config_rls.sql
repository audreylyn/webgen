-- Update chat_support_config RLS policies to allow operations for authenticated users if website exists

drop policy if exists "Owners and editors can update chat config" on public.chat_support_config;
create policy "Allow update chat config for authenticated users" on public.chat_support_config
  for update using (
    auth.uid() is not null and
    exists (select 1 from public.websites where websites.id = chat_support_config.website_id)
  );

drop policy if exists "Owners and editors can insert chat config" on public.chat_support_config;
create policy "Allow insert chat config for authenticated users" on public.chat_support_config
  for insert with check (
    auth.uid() is not null and
    exists (select 1 from public.websites where websites.id = chat_support_config.website_id)
  );