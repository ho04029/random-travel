'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCreateTrip } from '@/hooks/useCreateTrip';
import { useDestinations } from '@/hooks/useDestinations';
import { getToday } from '@/utils/getToday';
import { DestinationCombobox } from '@/components/DestinationCombobox';
import { Star, ArrowLeft } from 'lucide-react';

export default function TravelLogCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createTrip } = useCreateTrip();
  const { destinations, isLoading: isLoadingDestinations } = useDestinations();
  const [formData, setFormData] = useState(() => ({
    title: '',
    destinationIds: searchParams.get('destination')
      ? [searchParams.get('destination')!]
      : [],
    startDate: getToday(),
    endDate: getToday(),
    content: '',
    rating: 0,
  }));

  // 유효하지 않은 destination Id 제거
  const destinationIds = formData.destinationIds.filter((id) =>
    destinations.some((destination) => destination.id === id),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destinationIds.length === 0) {
      alert('여행지를 선택해주세요.');
      return;
    }
    createTrip({ ...formData, destinationIds });
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
        <h1 className="text-2xl font-bold text-gray-900">여행기 작성</h1>
      </div>

      {/* 폼 */}
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
        {/* <div>
          <label className="mb-2 block font-semibold text-gray-900">
            함께 간 친구
          </label>
          <div className="flex flex-wrap gap-2">
            {friends.map((friend) => (
              <button
                key={friend.id}
                type="button"
                onClick={() => {}}
                className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                  formData.selectedFriends.includes(friend.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {formData.selectedFriends.includes(friend.id) && (
                  <X className="mr-1 inline size-4" />
                )}
                {friend.name}
              </button>
            ))}
          </div>
        </div> */}

        {/* 버튼 영역 */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}
