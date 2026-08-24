'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/client';
import { throwIfError } from '@/utils/error';
import { Destination } from '@/types/destination';

export const destinationsQueryKey = ['destinations'] as const;

async function fetchDestinations(): Promise<Destination[]> {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('regn_cd')
    .order('name');

  throwIfError(error);

  return data ?? [];
}

export function useDestinations() {
  const { data, isPending } = useQuery({
    queryKey: destinationsQueryKey,
    queryFn: fetchDestinations,
    staleTime: Infinity,
  });

  return { destinations: data ?? [], isLoading: isPending };
}
