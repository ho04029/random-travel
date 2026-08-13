'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@/hooks/useUser';

export const favoriteQueryKey = (destinationId: string | null) =>
  ['favorite', destinationId] as const;
export const favoritesQueryKey = ['favorites'] as const;

async function fetchFavorite(destinationId: string | null, userId: string) {
  if (!destinationId) return false;

  const { data } = await supabase
    .from('favorite_destinations')
    .select('id')
    .eq('user_id', userId)
    .eq('destination_id', destinationId)
    .maybeSingle();

  return !!data;
}

export function useFavorite(destinationId: string | null) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: isFavorite, isLoading } = useQuery({
    queryKey: favoriteQueryKey(destinationId),
    queryFn: () => fetchFavorite(destinationId, user!.id),
    enabled: !!user && !!destinationId,
  });

  // 쿼리키 유효성 제거
  const invalidateFavorites = () => {
    queryClient.invalidateQueries({
      queryKey: favoriteQueryKey(destinationId),
    });
    queryClient.invalidateQueries({ queryKey: favoritesQueryKey });
  };

  // 좋아요 추가
  const addMutation = useMutation({
    mutationFn: async () => {
      if (!user || !destinationId) return;
      const { error } = await supabase.from('favorite_destinations').insert({
        user_id: user.id,
        destination_id: destinationId,
      });
      if (error) console.error(error);
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
      if (error) console.error(error);
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
