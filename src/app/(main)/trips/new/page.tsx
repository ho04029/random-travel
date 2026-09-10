'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCreateTrip } from '@/hooks/useTripLogs';
import { useDestinations } from '@/hooks/useDestinations';
import { getErrorMessage } from '@/utils/error';
import { getToday } from '@/utils/getToday';
import { TripForm } from '@/components/TripForm';

export default function TravelLogCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createTrip } = useCreateTrip({
    onSuccess: () => router.push('/trips'),
    onError: (error) => alert(getErrorMessage(error)),
  });
  const { destinations, isLoading: isLoadingDestinations } = useDestinations();

  return (
    <TripForm
      initialData={{
        title: '',
        destinationIds: searchParams.get('destination')
          ? [searchParams.get('destination')!]
          : [],
        startDate: getToday(),
        endDate: getToday(),
        content: '',
        rating: 0,
      }}
      destinations={destinations}
      isLoadingDestinations={isLoadingDestinations}
      onSubmit={(data) => createTrip(data)}
      pageTitle="여행기 작성"
      onCancel={() => router.back()}
    />
  );
}
