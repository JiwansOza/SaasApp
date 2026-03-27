-- Create a table for marketplace applications managed by admins
CREATE TABLE public.marketplace_apps (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  status text NOT NULL DEFAULT 'Draft',
  icon text NOT NULL DEFAULT '/icon-game-1.png',
  short_description text,
  description text,
  tags text[] DEFAULT '{}'::text[],
  features text[] DEFAULT '{}'::text[],
  preview_image text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.marketplace_apps ENABLE ROW LEVEL SECURITY;

-- Policies for marketplace apps
-- Everyone can view published apps (though admin side sees all)
CREATE POLICY "Anyone can view marketplace apps." ON public.marketplace_apps
  FOR SELECT USING (true);

-- Only admins can insert/update/delete (this assumes a custom claim or superuser, 
-- but for demo, let's keep it simple or restricted to a specific email)
CREATE POLICY "Admins can manage marketplace apps." ON public.marketplace_apps
  FOR ALL TO authenticated USING (
    (auth.jwt() ->> 'email') = 'admin@jiwans.com' -- Mock admin check
  );
