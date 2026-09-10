'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useUpdateTrip, useTripLog } from '@/hooks/useTripLogs';
import { useDestinations } from '@/hooks/useDestinations';
import { getErrorMessage } from '@/utils/error';
import { getToday } from '@/utils/getToday';
import { Loader2 } from 'lucide-react';
import { TripForm } from '@/components/TripForm';

export default function TripEditPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { destinations, isLoading: isLoadingDestinations } = useDestinations();
  const { data: trip, isLoading, isError } = useTripLog(id);
  const { updateTrip, isPending } = useUpdateTrip({
    onSuccess: () => router.push('/trips'),
    onError: (error) => alert(getErrorMessage(error)),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="size-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError || !trip) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <h3 className="mb-2 font-bold text-gray-900">
          여행기를 불러오지 못했습니다
        </h3>
        <p className="mb-4 text-gray-600">잠시 후 다시 시도해주세요</p>
        <Link
          href="/trips"
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          여행기 목록으로
        </Link>
      </div>
    );
  }

  return (
    <TripForm
      initialData={{
        title: trip.title,
        destinationIds: trip.trip_record_destinations.map(
          (td) => td.destination_id,
        ),
        startDate: trip.start_date ?? getToday(),
        endDate: trip.end_date ?? getToday(),
        content: trip.content ?? '',
        rating: trip.rating,
      }}
      destinations={destinations}
      isLoadingDestinations={isLoadingDestinations}
      onSubmit={(data) => updateTrip({ id: trip.id, ...data })}
      isPending={isPending}
      pageTitle="여행기 수정"
      onCancel={() => router.back()}
    />
  );
}
