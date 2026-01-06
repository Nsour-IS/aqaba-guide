-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  phone text,
  
  constraint username_length check (char_length(full_name) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- Create a table for activities (Dive sites, tours, etc.)
create table activities (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  image_url text,
  category text not null, -- 'Diving', 'Snorkeling', 'Boat Tour', etc.
  price decimal(10, 2) not null,
  duration text,
  difficulty text, -- 'Beginner', 'Intermediate', 'Advanced'
  depth text, -- 'Shallow', 'Medium', 'Deep' (for dive sites)
  rating decimal(3, 2) default 0,
  review_count integer default 0,
  marine_life text[], -- Array of marine life tags
  is_featured boolean default false
);

-- Set up RLS for activities
alter table activities enable row level security;

create policy "Activities are viewable by everyone." on activities
  for select using (true);

-- Only admins/service role can insert/update/delete activities (for now)
-- We'll leave write policies empty so only dashboard/service role can write

-- Create a table for bookings
create table bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  activity_id uuid references activities not null,
  booking_date date not null,
  booking_time time not null,
  adults integer default 1,
  children integer default 0,
  total_price decimal(10, 2) not null,
  status text default 'pending', -- 'pending', 'confirmed', 'cancelled'
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  special_requests text
);

-- Set up RLS for bookings
alter table bookings enable row level security;

create policy "Users can view their own bookings." on bookings
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert their own bookings." on bookings
  for insert with check ((select auth.uid()) = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
