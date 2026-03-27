-- Create a table for public profiles
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  email text
);

-- Table for tracking purchased apps per user
CREATE TABLE public.purchased_apps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  app_id text NOT NULL, -- The ID from our apps data
  purchased_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, app_id)
);

-- Table for app-specific customizations
CREATE TABLE public.app_customizations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  app_id text NOT NULL,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, app_id)
);

-- Table for app-specific metadata (credentials, stats)
CREATE TABLE public.app_metadata (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  app_id text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, app_id)
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchased_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_metadata ENABLE ROW LEVEL SECURITY;

-- Policies for Profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policies for Purchased Apps
CREATE POLICY "Users can view their own purchases." ON public.purchased_apps
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own purchases." ON public.purchased_apps
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for Customizations
CREATE POLICY "Users can view their own customizations." ON public.app_customizations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own customizations." ON public.app_customizations
  FOR ALL USING (auth.uid() = user_id);

-- Policies for Metadata
CREATE POLICY "Users can view their own metadata." ON public.app_metadata
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own metadata." ON public.app_metadata
  FOR ALL USING (auth.uid() = user_id);
