import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type {
  EventCard,
  TeamMember,
  Statistic,
  HeroContent,
  AboutContent,
  FooterContent,
  GalleryImage,
} from '../types';

// =============================================
// TYPE DEFINITIONS
// =============================================

interface RawHeroContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  primary_button_text: string;
  secondary_button_text: string;
}

interface RawFooterContent {
  id: string;
  copyright_text: string;
  note?: string;
}

interface RawOnboardingContent {
  id: string;
  title: string;
  subtitle: string;
  button_text: string;
}

interface RawSectionContent {
  id: string;
  section_key: string;
  label: string;
  title: string;
  description?: string;
}

interface RawButtonLabel {
  id: string;
  key: string;
  text: string;
}

interface RawGalleryImage {
  id: string;
  image_url: string;
  order?: number;
  is_featured?: boolean;
  created_at: string;
}

interface RawSiteData {
  hero_content: RawHeroContent | null;
  about_content: AboutContent | null;
  onboarding_content: RawOnboardingContent | null;
  footer_content: RawFooterContent | null;
  statistics: Statistic[];
  team_members: TeamMember[];
  events: EventCard[];
  gallery_images: RawGalleryImage[];
  section_content: RawSectionContent[];
  button_labels: RawButtonLabel[];
}

// Transformed data for frontend consumption
export interface SiteData {
  heroContent: HeroContent | null;
  aboutContent: AboutContent | null;
  onboardingContent: {
    id: string;
    title: string;
    subtitle: string;
    buttonText: string;
  } | null;
  footerContent: FooterContent | null;
  statistics: Statistic[];
  teamMembers: TeamMember[];
  staffMembers: TeamMember[];
  studentMembers: TeamMember[];
  events: EventCard[];
  galleryImages: GalleryImage[];
  sectionContent: RawSectionContent[];
  buttonLabels: RawButtonLabel[];
}

interface SiteDataContextValue {
  data: SiteData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  refetchSection: (section: keyof SiteData) => Promise<void>;
}

// =============================================
// CONTEXT CREATION
// =============================================

const SiteDataContext = createContext<SiteDataContextValue | undefined>(undefined);

// =============================================
// DATA TRANSFORMATION HELPERS
// =============================================

const transformHeroContent = (raw: RawHeroContent | null): HeroContent | null => {
  if (!raw) return null;
  return {
    id: raw.id,
    title: raw.title,
    subtitle: raw.subtitle,
    description: raw.description,
    primaryButtonText: raw.primary_button_text,
    secondaryButtonText: raw.secondary_button_text,
  };
};

const transformFooterContent = (raw: RawFooterContent | null): FooterContent | null => {
  if (!raw) return null;
  return {
    id: raw.id,
    copyrightText: raw.copyright_text,
    note: raw.note,
  };
};

const transformOnboardingContent = (raw: RawOnboardingContent | null) => {
  if (!raw) return null;
  return {
    id: raw.id,
    title: raw.title,
    subtitle: raw.subtitle,
    buttonText: raw.button_text,
  };
};

const transformRawData = (raw: RawSiteData): SiteData => {
  const teamMembers = raw.team_members || [];
  
  return {
    heroContent: transformHeroContent(raw.hero_content),
    aboutContent: raw.about_content,
    onboardingContent: transformOnboardingContent(raw.onboarding_content),
    footerContent: transformFooterContent(raw.footer_content),
    statistics: raw.statistics || [],
    teamMembers: teamMembers,
    staffMembers: teamMembers.filter(m => m.type === 'staff'),
    studentMembers: teamMembers.filter(m => m.type === 'student'),
    events: raw.events || [],
    galleryImages: (raw.gallery_images || []).map(img => ({
      id: img.id,
      image_url: img.image_url,
      order: img.order,
      is_featured: img.is_featured || false,
      created_at: img.created_at,
    })),
    sectionContent: raw.section_content || [],
    buttonLabels: raw.button_labels || [],
  };
};

// =============================================
// PROVIDER COMPONENT
// =============================================

interface SiteDataProviderProps {
  children: ReactNode;
}

export const SiteDataProvider: React.FC<SiteDataProviderProps> = ({ children }) => {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Main fetch function using RPC
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try RPC first (single API call)
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_all_site_content');

      if (rpcError) {
        console.warn('RPC not available, falling back to parallel queries:', rpcError.message);
        // Fallback to parallel queries if RPC is not set up yet
        await fetchWithParallelQueries();
        return;
      }

      if (rpcData) {
        setData(transformRawData(rpcData as RawSiteData));
      }
    } catch (err: any) {
      console.error('Error fetching site data:', err);
      setError(err.message);
      // Try fallback
      await fetchWithParallelQueries();
    } finally {
      setLoading(false);
    }
  }, []);

  // Fallback: Fetch all data with Promise.all (still optimized - parallel)
  const fetchWithParallelQueries = async () => {
    try {
      const [
        heroRes,
        aboutRes,
        onboardingRes,
        footerRes,
        statsRes,
        teamRes,
        eventsRes,
        galleryRes,
        sectionsRes,
        buttonsRes,
      ] = await Promise.all([
        supabase.from('hero_content').select('*').single(),
        supabase.from('about_content').select('*').single(),
        supabase.from('onboarding_content').select('*').single(),
        supabase.from('footer_content').select('*').single(),
        supabase.from('statistics').select('*').order('order', { ascending: true }),
        supabase.from('team_members').select('*').order('order', { ascending: true }),
        supabase.from('events').select('*').order('day', { ascending: true }),
        supabase.from('gallery_images').select('*').order('order', { ascending: true }),
        supabase.from('section_content').select('*'),
        supabase.from('button_labels').select('*'),
      ]);

      const rawData: RawSiteData = {
        hero_content: heroRes.data,
        about_content: aboutRes.data,
        onboarding_content: onboardingRes.data,
        footer_content: footerRes.data,
        statistics: statsRes.data || [],
        team_members: teamRes.data || [],
        events: eventsRes.data || [],
        gallery_images: galleryRes.data || [],
        section_content: sectionsRes.data || [],
        button_labels: buttonsRes.data || [],
      };

      setData(transformRawData(rawData));
      setError(null);
    } catch (err: any) {
      console.error('Fallback fetch failed:', err);
      setError(err.message);
    }
  };

  // Refetch a specific section (for admin updates)
  const refetchSection = useCallback(async (section: keyof SiteData) => {
    if (!data) return;

    try {
      let updatedData = { ...data };

      switch (section) {
        case 'heroContent': {
          const { data: heroData } = await supabase.from('hero_content').select('*').single();
          updatedData.heroContent = transformHeroContent(heroData);
          break;
        }
        case 'aboutContent': {
          const { data: aboutData } = await supabase.from('about_content').select('*').single();
          updatedData.aboutContent = aboutData;
          break;
        }
        case 'onboardingContent': {
          const { data: onboardingData } = await supabase.from('onboarding_content').select('*').single();
          updatedData.onboardingContent = transformOnboardingContent(onboardingData);
          break;
        }
        case 'footerContent': {
          const { data: footerData } = await supabase.from('footer_content').select('*').single();
          updatedData.footerContent = transformFooterContent(footerData);
          break;
        }
        case 'statistics': {
          const { data: statsData } = await supabase.from('statistics').select('*').order('order', { ascending: true });
          updatedData.statistics = statsData || [];
          break;
        }
        case 'teamMembers':
        case 'staffMembers':
        case 'studentMembers': {
          const { data: teamData } = await supabase.from('team_members').select('*').order('order', { ascending: true });
          const members = teamData || [];
          updatedData.teamMembers = members;
          updatedData.staffMembers = members.filter(m => m.type === 'staff');
          updatedData.studentMembers = members.filter(m => m.type === 'student');
          break;
        }
        case 'events': {
          const { data: eventsData } = await supabase.from('events').select('*').order('day', { ascending: true });
          updatedData.events = eventsData || [];
          break;
        }
        case 'galleryImages': {
          const { data: galleryData } = await supabase.from('gallery_images').select('*').order('order', { ascending: true });
          updatedData.galleryImages = (galleryData || []).map(img => ({
            id: img.id,
            image_url: img.image_url,
            order: img.order,
            is_featured: img.is_featured || false,
            created_at: img.created_at,
          }));
          break;
        }
        case 'sectionContent': {
          const { data: sectionData } = await supabase.from('section_content').select('*');
          updatedData.sectionContent = sectionData || [];
          break;
        }
        case 'buttonLabels': {
          const { data: buttonData } = await supabase.from('button_labels').select('*');
          updatedData.buttonLabels = buttonData || [];
          break;
        }
      }

      setData(updatedData);
    } catch (err: any) {
      console.error(`Error refetching ${section}:`, err);
    }
  }, [data]);

  // Initial fetch on mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const value: SiteDataContextValue = {
    data,
    loading,
    error,
    refetch: fetchAllData,
    refetchSection,
  };

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
};

// =============================================
// CUSTOM HOOK
// =============================================

export const useSiteData = (): SiteDataContextValue => {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};

export default SiteDataContext;
