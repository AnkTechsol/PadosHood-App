-- AAPLE MOSHI HYPER-LOCAL PLATFORM - SUPABASE POSTGRESQL SCHEMA

-- 1. User Profiles & Blood Donor Preferences
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone_number TEXT UNIQUE,
  address TEXT,
  occupation TEXT,
  blood_group TEXT CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')),
  pcmc_ward TEXT DEFAULT 'Ward 4 (Moshi Pradhikaran)',
  is_blood_donor BOOLEAN DEFAULT false,
  locality_zone TEXT DEFAULT 'Moshi Gaon',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Local Businesses, Groceries & Restaurants
CREATE TABLE IF NOT EXISTS merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Restaurants', 'Kirana/Groceries', 'Dairy & Bakery', 'Clothing & Boutique', 'Electronics & Hardware', 'Medical & Health')),
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp_number TEXT,
  google_maps_url TEXT,
  banner_image TEXT,
  rating DECIMAL(2,1) DEFAULT 4.5,
  is_verified BOOLEAN DEFAULT true,
  special_offer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Digital Menu / Merchant Product Catalog Items
CREATE TABLE IF NOT EXISTS catalog_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT DEFAULT 'Main Menu',
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_special BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Community Announcements, Civic Alerts & Forum Posts
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  author_name TEXT DEFAULT 'Citizen',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT CHECK (category IN ('civic', 'emergency', 'event', 'general', 'lost_found')),
  ward_number TEXT DEFAULT 'Ward 4',
  image_url TEXT,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Skilled Tradesmen & Local Services
CREATE TABLE IF NOT EXISTS tradesmen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  trade_category TEXT NOT NULL CHECK (trade_category IN ('Plumber', 'Electrician', 'Appliance Repair', 'Carpenter', 'Painter', 'Domestic Help / Maid', 'Home Cleaning')),
  phone TEXT NOT NULL,
  whatsapp_number TEXT,
  locality TEXT DEFAULT 'Moshi',
  rating DECIMAL(2,1) DEFAULT 4.7,
  hourly_rate TEXT DEFAULT '₹250 / visit',
  is_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
