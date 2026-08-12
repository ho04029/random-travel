'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/client';

export const userQueryKey = ['user'] as const;

async function fetchCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export function useUser() {
  const queryClient = useQueryClient();
  const { data, isPending: loading } = useQuery({
    queryKey: userQueryKey,
    queryFn: fetchCurrentUser,
    staleTime: Infinity,
  });
  const user = data ?? null;

  const signOut = async () => {
    await supabase.auth.signOut();
    queryClient.setQueryData(userQueryKey, null);
  };

  return { user, loading, signOut };
}
