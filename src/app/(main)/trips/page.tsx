'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';
import { useTripLogs } from '@/hooks/useTripLogs';
import { formatDateRange } from '@/utils/formatDate';
import { getDestinationNames } from '@/utils/trip';
import { Plus, MapPin, Calendar, Star, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/Select';

export default function TripLogsPage() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
  const { data: trips = [], isLoading, isError } = useTripLogs(sortBy);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="size-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <h3 className="mb-2 font-bold text-gray-900">
          여행기를 불러오지 못했습니다
        </h3>
        <p className="text-gray-600">잠시 후 다시 시도해주세요</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2">여행기</h1>
            <p className="text-gray-600">다녀온 여행의 추억을 기록하세요</p>
          </div>
          <Button onClick={() => router.push('/trips/new')}>
            <Plus className="mr-2 h-4 w-4" />
            여행 기록하기
          </Button>
        </div>

        {/* 필터 */}
        {/* TODO 여행지 지역 별 필터링 */}
        <div className="mb-6 flex gap-4">
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as 'latest' | 'oldest')}
          >
            <SelectTrigger className="w-40 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="oldest">오래된순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 여행기 */}
        {trips.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => {
              return (
                <Card
                  key={trip.id}
                  className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
                  onClick={() => router.push(`/trips/${trip.id}`)}
                >
                  <div className="relative aspect-video">
                    {/* todo 여행기 쓰기 페이지에 이미지 추가하면 이쪽에도 추가하기 */}
                    {/* <Image
                      src={trip.photos[0]}
                      alt={trip.title}
                      className="h-full w-full object-cover"
                    /> */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-white px-2 py-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{trip.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-1 truncate font-semibold">
                      {trip.title}
                    </h3>
                    <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span>{getDestinationNames(trip)}</span>
                    </div>
                    <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDateRange(trip.start_date, trip.end_date)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <Calendar className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <p className="mb-4 text-gray-500">아직 여행 기록이 없어요</p>
              <Button onClick={() => router.push('/trips/new')}>
                <Plus className="mr-2 h-4 w-4" />첫 여행 기록하기
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
