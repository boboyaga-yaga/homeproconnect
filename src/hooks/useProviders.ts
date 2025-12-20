import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string | null;
  rating: number;
  reviews_count: number;
  experience: string | null;
  is_verified: boolean;
  is_available: boolean;
  specialties: string[] | null;
}

export function useProviders() {
  return useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('is_available', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      return data as Provider[];
    },
  });
}

export function useProvidersByService(serviceName: string) {
  return useQuery({
    queryKey: ['providers', serviceName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('is_available', true)
        .contains('specialties', [serviceName])
        .order('rating', { ascending: false });

      if (error) throw error;
      return data as Provider[];
    },
    enabled: !!serviceName,
  });
}
