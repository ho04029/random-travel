'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@/hooks/useUser';
import { throwIfError } from '@/utils/error';

// Query Key factories
export const favoriteKeys = {
  all: ['favorite'] as const,
  lists: () => [...favoriteKeys.all, 'list'] as const,
  list: (userId: string) => [...favoriteKeys.lists(), userId] as const,
  details: () => [...favoriteKeys.all, 'detail'] as const,
  detail: (userId: string, destinationId: string) =>
    [...favoriteKeys.details(), userId, destinationId] as const,
};

async function fetchFavorite(destinationId: string | null, userId: string) {
  if (!destinationId) return false;

  const { data, error } = await supabase
    .from('favorite_destinations')
    .select('id')
    .eq('user_id', userId)
    .eq('destination_id', destinationId)
    .maybeSingle();

  throwIfError(error);

  return !!data;
}

export function useFavorite(destinationId: string | null) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: isFavorite, isLoading } = useQuery({
    queryKey: favoriteKeys.detail(user?.id ?? '', destinationId ?? ''),
    queryFn: () => fetchFavorite(destinationId, user!.id),
    enabled: !!user && !!destinationId,
  });

  // 쿼리키 유효성 제거
  const invalidateFavorites = () => {
    if (!user) return;

    queryClient.invalidateQueries({
      queryKey: favoriteKeys.detail(user.id, destinationId!),
    });
    queryClient.invalidateQueries({ queryKey: favoriteKeys.list(user.id) });
  };

  // 좋아요 추가
  const addMutation = useMutation({
    mutationFn: async () => {
      if (!user || !destinationId) return;
      const { error } = await supabase.from('favorite_destinations').insert({
        user_id: user.id,
        destination_id: destinationId,
      });
      throwIfError(error);
    },
    onSuccess: invalidateFavorites,
  });

  // 좋아요 삭제
  const removeMutation = useMutation({
    mutationFn: async () => {
      if (!user || !destinationId) return;
      const { error } = await supabase
        .from('favorite_destinations')
        .delete()
        .eq('user_id', user.id)
        .eq('destination_id', destinationId);
      throwIfError(error);
    },
    onSuccess: invalidateFavorites,
  });

  const toggleFavorite = async () => {
    if (!user || !destinationId) return;
    if (isFavorite) {
      await removeMutation.mutateAsync();
    } else {
      await addMutation.mutateAsync();
    }
  };

  return { isFavorite: !!isFavorite, isLoading, toggleFavorite };
}
