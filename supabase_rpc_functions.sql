-- =============================================
-- ZYNORA RPC FUNCTIONS
-- Optimized data fetching with single API call
-- =============================================

-- Drop the function if it exists (for updates)
DROP FUNCTION IF EXISTS get_all_site_content();

-- Create the unified data fetch function
CREATE OR REPLACE FUNCTION get_all_site_content()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'hero_content', (
      SELECT row_to_json(h.*) 
      FROM hero_content h 
      LIMIT 1
    ),
    'about_content', (
      SELECT row_to_json(a.*) 
      FROM about_content a 
      LIMIT 1
    ),
    'onboarding_content', (
      SELECT row_to_json(o.*) 
      FROM onboarding_content o 
      LIMIT 1
    ),
    'footer_content', (
      SELECT row_to_json(f.*) 
      FROM footer_content f 
      LIMIT 1
    ),
    'statistics', (
      SELECT COALESCE(json_agg(s.* ORDER BY s."order"), '[]'::json)
      FROM statistics s
    ),
    'team_members', (
      SELECT COALESCE(json_agg(t.* ORDER BY t."order"), '[]'::json)
      FROM team_members t
    ),
    'events', (
      SELECT COALESCE(json_agg(e.* ORDER BY e.day), '[]'::json)
      FROM events e
    ),
    'gallery_images', (
      SELECT COALESCE(json_agg(g.* ORDER BY g."order"), '[]'::json)
      FROM gallery_images g
    ),
    'section_content', (
      SELECT COALESCE(json_agg(sc.*), '[]'::json)
      FROM section_content sc
    ),
    'button_labels', (
      SELECT COALESCE(json_agg(bl.*), '[]'::json)
      FROM button_labels bl
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql STABLE;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION get_all_site_content() TO authenticated;
GRANT EXECUTE ON FUNCTION get_all_site_content() TO anon;

-- =============================================
-- USAGE EXAMPLE
-- =============================================
-- From frontend:
-- const { data, error } = await supabase.rpc('get_all_site_content');
--
-- Response structure:
-- {
--   hero_content: { id, title, subtitle, ... },
--   about_content: { id, paragraphs, ... },
--   onboarding_content: { id, title, subtitle, button_text },
--   footer_content: { id, copyright_text, note },
--   statistics: [{ id, label, value, order }, ...],
--   team_members: [{ id, name, role, phone, type, order }, ...],
--   events: [{ id, title, description, image, color, symbols, day, vibe }, ...],
--   gallery_images: [{ id, image_url, order }, ...],
--   section_content: [{ id, section_key, label, title, description }, ...],
--   button_labels: [{ id, key, text }, ...]
-- }
