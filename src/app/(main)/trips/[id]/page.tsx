'use client';

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useTripLog, useDeleteTrip } from '@/hooks/useTripLogs';
import { getErrorMessage } from '@/utils/error';
import { formatDateRange } from '@/utils/formatDate';
import { getDestinationNames } from '@/utils/trip';
import { MapPin, Calendar, Star, Loader2, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';

export default function TripDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: trip, isLoading, isError } = useTripLog(id);
  const { deleteTrip, isPending } = useDeleteTrip({
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
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
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
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push('/trips')}>
            ← 목록으로
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/trips/${id}/edit`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              수정
            </Button>
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => {
                if (window.confirm('정말 삭제하시겠습니까?')) {
                  deleteTrip(id);
                }
              }}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              삭제
            </Button>
          </div>
        </div>

        {/* 본문 */}
        <Card>
          <CardContent className="p-0">
            <div className="p-8">
              <h1 className="mb-4">{trip.title}</h1>

              {/* Meta Info */}
              <div className="mb-6 flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{getDestinationNames(trip)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDateRange(trip.start_date, trip.end_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-5 w-5 ${
                        idx < trip.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 컨텐츠 */}
              <div className="prose max-w-none">
                <h3>여행 후기</h3>
                <p className="whitespace-pre-wrap text-gray-700">
                  {trip.content}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
