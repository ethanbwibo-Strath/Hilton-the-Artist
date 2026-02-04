-- Supabase Setup Script for Hilton Art
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  availability TEXT NOT NULL DEFAULT 'Available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  artwork_type TEXT NOT NULL,
  size TEXT NOT NULL,
  reference_image TEXT,
  special_instructions TEXT,
  estimated_price NUMERIC,
  status TEXT NOT NULL DEFAULT 'Pending',
  estimated_completion DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_artworks_category ON artworks(category);
CREATE INDEX IF NOT EXISTS idx_artworks_availability ON artworks(availability);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

-- Enable Row Level Security (optional - can disable for simpler setup)
-- ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to artworks
-- CREATE POLICY "Public read access" ON artworks FOR SELECT USING (true);

-- Create policy for authenticated users to manage artworks
-- CREATE POLICY "Authenticated users can manage artworks" ON artworks
--   FOR ALL USING (auth.role() = 'authenticated');

-- Create storage bucket for artworks images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('artworks', 'artworks', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for commission reference images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('commissions', 'commissions', true)
ON CONFLICT (id) DO NOTHING;

-- Grant public access to storage buckets
CREATE POLICY "Public read access" ON storage.objects 
  FOR SELECT USING (bucket_id IN ('artworks', 'commissions'));

CREATE POLICY "Authenticated users can upload" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id IN ('artworks', 'commissions'));

CREATE POLICY "Authenticated users can update" ON storage.objects 
  FOR UPDATE USING (bucket_id IN ('artworks', 'commissions'));

CREATE POLICY "Authenticated users can delete" ON storage.objects 
  FOR DELETE USING (bucket_id IN ('artworks', 'commissions'));
