-- =============================================
-- ZYNORA STORAGE BUCKETS SETUP
-- Supabase Storage with Row Level Security (RLS)
-- =============================================

-- =============================================
-- 1. CREATE STORAGE BUCKET FOR GALLERY IMAGES
-- =============================================

-- Insert the gallery bucket into storage.buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,  -- Public bucket (allows public read access to files)
  52428800,  -- 50MB file size limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']  -- Allowed image types
)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- 2. ENABLE ROW LEVEL SECURITY ON STORAGE
-- =============================================

-- Enable RLS on storage.objects table (where actual files are stored)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 3. PUBLIC READ ACCESS POLICY
-- Allow anyone to view/download images from gallery bucket
-- =============================================

CREATE POLICY "Public can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

-- =============================================
-- 4. ADMIN INSERT/UPLOAD POLICY
-- Only authenticated admins can upload images to gallery bucket
-- =============================================

CREATE POLICY "Admins can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'gallery' 
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- =============================================
-- 5. ADMIN UPDATE POLICY
-- Only authenticated admins can update images in gallery bucket
-- =============================================

CREATE POLICY "Admins can update gallery images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'gallery'
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
)
WITH CHECK (
  bucket_id = 'gallery'
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- =============================================
-- 6. ADMIN DELETE POLICY
-- Only authenticated admins can delete images from gallery bucket
-- =============================================

CREATE POLICY "Admins can delete gallery images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'gallery'
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- =============================================
-- OPTIONAL: CREATE ADDITIONAL STORAGE BUCKETS
-- =============================================

-- Example: Create a bucket for event posters
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'event-posters',
  'event-posters',
  true,
  52428800,  -- 50MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Public read for event posters
CREATE POLICY "Public can view event posters"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-posters');

-- Admin upload for event posters
CREATE POLICY "Admins can upload event posters"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'event-posters' 
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Admin update for event posters
CREATE POLICY "Admins can update event posters"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'event-posters'
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
)
WITH CHECK (
  bucket_id = 'event-posters'
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Admin delete for event posters
CREATE POLICY "Admins can delete event posters"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'event-posters'
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- =============================================
-- Example: Create a private bucket for admin documents
-- =============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'admin-documents',
  'admin-documents',
  false,  -- Private bucket (no public access)
  104857600,  -- 100MB
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- Only admins can read private documents
CREATE POLICY "Admins can view admin documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'admin-documents'
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Admins can upload private documents
CREATE POLICY "Admins can upload admin documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'admin-documents' 
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Admins can update private documents
CREATE POLICY "Admins can update admin documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'admin-documents'
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
)
WITH CHECK (
  bucket_id = 'admin-documents'
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- Admins can delete private documents
CREATE POLICY "Admins can delete admin documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'admin-documents'
  AND EXISTS (
    SELECT 1 FROM public.admins 
    WHERE admins.email = auth.jwt() ->> 'email'
  )
);

-- =============================================
-- VERIFY SETUP
-- =============================================
-- Run these queries to verify your storage setup:

-- 1. Check all buckets
-- SELECT * FROM storage.buckets;

-- 2. Check all storage policies
-- SELECT * FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects';

-- 3. List all files in gallery bucket
-- SELECT * FROM storage.objects WHERE bucket_id = 'gallery';

-- =============================================
-- NOTES AND BEST PRACTICES
-- =============================================
-- 
-- 1. BUCKET CONFIGURATION:
--    - public: true = Files are publicly accessible via URL
--    - public: false = Files require authentication to access
--    - file_size_limit: in bytes (52428800 = 50MB, 104857600 = 100MB)
--    - allowed_mime_types: restrict file types for security
--
-- 2. RLS POLICY PATTERNS:
--    - FOR SELECT: Controls who can view/download files
--    - FOR INSERT: Controls who can upload files
--    - FOR UPDATE: Controls who can update file metadata
--    - FOR DELETE: Controls who can delete files
--
-- 3. ADMIN VERIFICATION:
--    - auth.jwt() ->> 'email' extracts email from JWT token
--    - EXISTS check verifies email is in admins table
--    - Policies are evaluated on every storage operation
--
-- 4. SECURITY CONSIDERATIONS:
--    - Always enable RLS on storage.objects
--    - Use restrictive allowed_mime_types
--    - Set reasonable file_size_limit
--    - Never expose service_role key in frontend
--    - Use anon key for public operations
--
-- 5. USAGE IN APPLICATION:
--    - Upload: supabase.storage.from('gallery').upload(path, file)
--    - Download: supabase.storage.from('gallery').download(path)
--    - Get URL: supabase.storage.from('gallery').getPublicUrl(path)
--    - Delete: supabase.storage.from('gallery').remove([path])
--
-- =============================================
