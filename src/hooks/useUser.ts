'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/client';
import { throwIfError } from '@/utils/error';

export const userQueryKey = ['user'] as const;

async function fetchCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  throwIfError(error);
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

    // 사용자 스코프 캐시 제거.
    queryClient.removeQueries({ queryKey: ['trip'] });
    queryClient.removeQueries({ queryKey: ['favorite'] });
  };

  return { user, loading, signOut };
}
