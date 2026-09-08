'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useUpdateTrip, useTripLog } from '@/hooks/useTripLogs';
import { useDestinations } from '@/hooks/useDestinations';
import { getErrorMessage } from '@/utils/error';
import { getToday } from '@/utils/getToday';
import { ArrowLeft, Loader2, Star } from 'lucide-react';
import { DestinationCombobox } from '@/components/DestinationCombobox';
import { TripFormData, TripWithDestinations } from '@/types/trip';
import { Destination } from '@/types/destination';

type TripEditFormProps = {
  trip: TripWithDestinations;
  destinations: Destination[];
  updateTrip: (args: { id: string } & Partial<TripFormData>) => void;
  isPending: boolean;
  isLoadingDestinations: boolean;
  onCancel: () => void;
};

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
    <TripEditForm
      trip={trip}
      destinations={destinations}
      updateTrip={updateTrip}
      isPending={isPending}
      isLoadingDestinations={isLoadingDestinations}
      onCancel={() => router.back()}
    />
  );
}

function TripEditForm({
  trip,
  destinations,
  updateTrip,
  isPending,
  isLoadingDestinations,
  onCancel,
}: TripEditFormProps) {
  const [formData, setFormData] = useState(() => ({
    title: trip.title,
    destinationIds: trip.trip_record_destinations.map(
      (td) => td.destination_id,
    ),
    startDate: trip.start_date ?? getToday(),
    endDate: trip.end_date ?? getToday(),
    content: trip.content ?? '',
    rating: trip.rating,
  }));

  // 유효하지 않은 destination Id 제거
  const destinationIds = formData.destinationIds.filter((id) =>
    destinations.some((destination) => destination.id === id),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validations = [
      { check: !formData.title.trim(), message: '제목을 입력해주세요.' },
      { check: destinationIds.length === 0, message: '여행지를 선택해주세요.' },
      { check: !formData.startDate, message: '시작일을 선택해주세요.' },
      { check: !formData.endDate, message: '종료일을 선택해주세요.' },
      {
        check: formData.endDate < formData.startDate,
        message: '종료일은 시작일보다 이후여야 합니다.',
      },
    ];

    const error = validations.find((v) => v.check);
    if (error) {
      alert(error.message);
      return;
    }

    updateTrip({ id: trip.id, ...formData, destinationIds });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="p-6">
        <Link
          href="/trips"
          className="mb-4 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="size-4" />
          여행기 목록으로
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">여행기록 수정</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {/* 제목 */}
        <div>
          <label className="mb-2 block font-semibold text-gray-900">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="여행기 제목을 입력하세요"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* 여행지 */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold text-gray-900">
              여행지 <span className="text-red-500">*</span>
            </label>
            <DestinationCombobox
              destinations={destinations}
              value={destinationIds}
              onChange={(ids) =>
                setFormData({ ...formData, destinationIds: ids })
              }
              isLoading={isLoadingDestinations}
            />
          </div>

          {/* 별점 */}
          <div>
            <label className="mb-2 block font-semibold text-gray-900">
              별점
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`size-10 ${
                      star <= formData.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 방문일 */}
        <div>
          <label className="mb-2 block font-semibold text-gray-900">
            방문일 <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => {
                const newStart = e.target.value;
                setFormData({
                  ...formData,
                  startDate: newStart,
                  endDate:
                    newStart > formData.endDate ? newStart : formData.endDate,
                });
              }}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={formData.endDate}
              min={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* 후기 description */}
        <div>
          <label className="mb-2 block font-semibold text-gray-900">후기</label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="여행 후기를 자유롭게 작성해주세요"
            rows={8}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* TODO 친구 */}

        {/* 버튼 영역 */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending && <Loader2 className="size-5 animate-spin" />}
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
