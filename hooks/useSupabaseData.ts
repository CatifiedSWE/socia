import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type {
  EventCard,
  TeamMember,
  Statistic,
  HeroContent,
  AboutContent,
  FooterContent,
} from '../types';

// =============================================
// STORAGE BUCKET OPERATIONS
// =============================================

export interface StorageFile {
  id: string;
  name: string;
  url: string;
  size: number;
  created_at: string;
}

// Helper function to extract file path from Supabase URL
const extractPathFromUrl = (url: string, bucketName: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(new RegExp(`/storage/v1/object/public/${bucketName}/(.+)$`));
    return pathMatch ? pathMatch[1] : null;
  } catch {
    return null;
  }
};

// Generic Storage Operations Hook
export const useStorageOperations = () => {
  const uploadToStorage = async (bucket: string, file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const deleteFromStorage = async (bucket: string, url: string): Promise<void> => {
    const filePath = extractPathFromUrl(url, bucket);
    if (!filePath) {
      console.warn('Could not extract file path from URL:', url);
      return;
    }

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;
  };

  const listFiles = async (bucket: string): Promise<StorageFile[]> => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) throw error;

    return data.map((file) => {
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(file.name);
      return {
        id: file.id,
        name: file.name,
        url: urlData.publicUrl,
        size: file.metadata?.size || 0,
        created_at: file.created_at || new Date().toISOString(),
      };
    });
  };

  return {
    uploadToStorage,
    deleteFromStorage,
    listFiles,
  };
};

// Hook for fetching hero content
export const useHeroContent = () => {
  const [data, setData] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: heroData, error: heroError } = await supabase
        .from('hero_content')
        .select('*')
        .single();

      if (heroError) throw heroError;

      setData({
        id: heroData.id,
        title: heroData.title,
        subtitle: heroData.subtitle,
        description: heroData.description,
        primaryButtonText: heroData.primary_button_text,
        secondaryButtonText: heroData.secondary_button_text,
      });
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

// Hook for fetching about content
export const useAboutContent = () => {
  const [data, setData] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: aboutData, error: aboutError } = await supabase
        .from('about_content')
        .select('*')
        .single();

      if (aboutError) throw aboutError;
      setData(aboutData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

// Hook for fetching statistics
export const useStatistics = () => {
  const [data, setData] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: statsData, error: statsError } = await supabase
        .from('statistics')
        .select('*')
        .order('order', { ascending: true });

      if (statsError) throw statsError;
      setData(statsData || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

// Hook for fetching team members
export const useTeamMembers = () => {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: teamData, error: teamError } = await supabase
        .from('team_members')
        .select('*')
        .order('order', { ascending: true });

      if (teamError) throw teamError;
      setData(teamData || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const staffMembers = data.filter((m) => m.type === 'staff');
  const studentMembers = data.filter((m) => m.type === 'student');

  return { data, staffMembers, studentMembers, loading, error, refetch: fetchData };
};

// Hook for fetching events
export const useEvents = () => {
  const [data, setData] = useState<EventCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('day', { ascending: true });

      if (eventsError) throw eventsError;
      setData(eventsData || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

// =============================================
// ADMIN DOCUMENTS HOOK
// =============================================

export interface AdminDocument {
  id: string;
  name: string;
  url: string;
  size: number;
  uploaded_at: string;
}

export const useAdminDocuments = () => {
  const [data, setData] = useState<AdminDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { listFiles } = useStorageOperations();

  const fetchData = async () => {
    try {
      setLoading(true);
      const files = await listFiles('admin-documents');
      setData(files.map(f => ({
        id: f.id,
        name: f.name,
        url: f.url,
        size: f.size,
        uploaded_at: f.created_at,
      })));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

// Hook for fetching gallery images
export const useGalleryImages = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: galleryData, error: galleryError } = await supabase
        .from('gallery_images')
        .select('image_url')
        .order('order', { ascending: true });

      if (galleryError) throw galleryError;
      setData(galleryData?.map((item) => item.image_url) || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

// Hook for fetching onboarding content
export const useOnboardingContent = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: onboardingData, error: onboardingError } = await supabase
        .from('onboarding_content')
        .select('*')
        .single();

      if (onboardingError) throw onboardingError;
      setData(onboardingData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

// Hook for fetching section content
export const useSectionContent = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: sectionData, error: sectionError } = await supabase
        .from('section_content')
        .select('*');

      if (sectionError) throw sectionError;
      setData(sectionData || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper function to get section by key
  const getSectionByKey = (key: string) => data.find(section => section.section_key === key);

  return { data, getSectionByKey, loading, error, refetch: fetchData };
};

// Hook for fetching button labels
export const useButtonLabels = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: buttonData, error: buttonError } = await supabase
        .from('button_labels')
        .select('*');

      if (buttonError) throw buttonError;
      setData(buttonData || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Helper function to get button label by key
  const getButtonByKey = (key: string) => data.find(btn => btn.key === key)?.text || '';

  return { data, getButtonByKey, loading, error, refetch: fetchData };
};

// Hook for fetching footer content
export const useFooterContent = () => {
  const [data, setData] = useState<FooterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: footerData, error: footerError } = await supabase
        .from('footer_content')
        .select('*')
        .single();

      if (footerError) throw footerError;

      setData({
        id: footerData.id,
        copyrightText: footerData.copyright_text,
        note: footerData.note,
      });
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};
