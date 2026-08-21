'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import { throwIfError, getErrorMessage } from '@/utils/error';
import { useUser } from '@/hooks/useUser';

type TripFormData = {
  title: string;
  destinationIds: string[];
  startDate: string;
  endDate: string;
  content: string;
  rating: number;
};

export function useCreateTrip() {
  const router = useRouter();
  const { user } = useUser();

  const createTripMutation = useMutation({
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
    onSuccess: () => router.push('/trips'),
    onError: (error) => {
      console.error(error);
      alert(getErrorMessage(error));
    },
  });

  return {
    createTrip: createTripMutation.mutate,
    isPending: createTripMutation.isPending,
  };
}
