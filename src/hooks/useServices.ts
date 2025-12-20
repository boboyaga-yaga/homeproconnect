import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string | null;
  price_min: number;
  price_max: number;
  duration: string | null;
  rating: number;
  bookings_count: number;
  is_active: boolean;
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('bookings_count', { ascending: false });

      if (error) throw error;
      return data as Service[];
    },
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Service;
    },
    enabled: !!id,
  });
}
