'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/client';
import { throwIfError } from '@/utils/error';
import { useUser } from '@/hooks/useUser';
import { TripFormData, TripWithDestinations } from '@/types/trip';

export const tripsQueryKey = (sortBy?: string) => ['trips', sortBy] as const;
export const tripQueryKey = (id: string | null) => ['trip', id] as const;

export type TripSortOption = 'latest' | 'oldest';

type TripCallbacks = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

// 여행기 목록 조회
export function useTripLogs(sortBy: TripSortOption = 'latest') {
  const { user } = useUser();

  return useQuery({
    queryKey: tripsQueryKey(sortBy),
    queryFn: async (): Promise<TripWithDestinations[]> => {
      if (!user) return [];

      const query = supabase
        .from('trip_records')
        .select(
          '*, trip_record_destinations(destination_id, destinations(name, province))',
        )
        .eq('user_id', user.id);

      const { data, error } =
        sortBy === 'latest'
          ? await query
              .order('start_date', { ascending: false, nullsFirst: false })
              .order('created_at', { ascending: false })
          : await query
              .order('start_date', { ascending: true, nullsFirst: true })
              .order('created_at', { ascending: true });

      throwIfError(error);

      return data ?? [];
    },
    enabled: !!user,
  });
}

// 여행기 단일 조회
export function useTripLog(id: string | null) {
  const { user } = useUser();

  return useQuery({
    queryKey: tripQueryKey(id),
    queryFn: async (): Promise<TripWithDestinations | null> => {
      if (!user || !id) return null;

      const { data, error } = await supabase
        .from('trip_records')
        .select(
          '*, trip_record_destinations(destination_id, destinations(name, province))',
        )
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      throwIfError(error);

      return data;
    },
    enabled: !!user && !!id,
  });
}

// 여행기 생성
export function useCreateTrip({ onSuccess, onError }: TripCallbacks = {}) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: TripFormData) => {
      if (!user) throw new Error('로그인이 필요합니다.');

      const { error } = await supabase.rpc('create_trip_record', {
        p_title: formData.title,
        p_start_date: formData.startDate || '',
        p_end_date: formData.endDate || '',
        p_content: formData.content || '',
        p_rating: formData.rating || 0,
        p_destination_ids: formData.destinationIds,
      });

      throwIfError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      onSuccess?.();
    },
    onError,
  });

  return {
    createTrip: mutation.mutate,
    isPending: mutation.isPending,
  };
}

// 여행기 수정
export function useUpdateTrip({ onSuccess, onError }: TripCallbacks = {}) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: Partial<TripFormData> & { id: string }) => {
      if (!user) throw new Error('로그인이 필요합니다.');

      const { error } = await supabase
        .from('trip_records')
        .update({
          title: updates.title,
          content: updates.content,
          start_date: updates.startDate,
          end_date: updates.endDate,
          rating: updates.rating,
        })
        .eq('id', id)
        .eq('user_id', user.id);

      throwIfError(error);

      // 기존 조인 테이블 삭제 후 재생성
      if (updates.destinationIds) {
        const { error: deleteError } = await supabase
          .from('trip_record_destinations')
          .delete()
          .eq('trip_record_id', id);

        throwIfError(deleteError);

        if (updates.destinationIds.length > 0) {
          const { error: insertError } = await supabase
            .from('trip_record_destinations')
            .insert(
              updates.destinationIds.map((destination_id) => ({
                trip_record_id: id,
                destination_id,
              })),
            );

          throwIfError(insertError);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: tripQueryKey(null) });
      onSuccess?.();
    },
    onError,
  });

  return {
    updateTrip: mutation.mutate,
    isPending: mutation.isPending,
  };
}

// 여행기 삭제
export function useDeleteTrip({ onSuccess, onError }: TripCallbacks = {}) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      if (!user) throw new Error('로그인이 필요합니다.');

      // 조인 테이블 삭제
      const { error: joinError } = await supabase
        .from('trip_record_destinations')
        .delete()
        .eq('trip_record_id', id);

      throwIfError(joinError);

      // 여행기 삭제
      const { error } = await supabase
        .from('trip_records')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      throwIfError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      onSuccess?.();
    },
    onError,
  });

  return {
    deleteTrip: mutation.mutate,
    isPending: mutation.isPending,
  };
}
