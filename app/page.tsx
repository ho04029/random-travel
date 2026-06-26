'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Shuffle, MapPin, Users, Calendar } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Button } from './components/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from './components/Card';

export default function Home() {
  const router = useRouter();

  const trips = [
    {
      id: '1',
      destinationId: '5',
      destinationName: '강릉',
      title: '커피 향 가득한 강릉 여행',
      visitDate: '2026-05-15',
      photos: [''],
      content:
        '강릉의 아름다운 바다와 맛있는 커피를 즐겼습니다. 경포대 해변에서 일출을 보고, 안목해변 커피거리를 따라 걸으며 여유로운 시간을 보냈어요.',
      rating: 5,
      friendIds: ['2'],
    },
    {
      id: '2',
      destinationId: '6',
      destinationName: '전주',
      title: '한옥마을과 맛집 투어',
      visitDate: '2026-04-20',
      photos: [''],
      content:
        '전주 한옥마을의 아름다운 풍경과 맛있는 비빔밥을 즐겼습니다. 전통 찻집에서 차를 마시며 한옥의 멋을 느꼈어요.',
      rating: 5,
      friendIds: ['2'],
    },
  ];

  const travelGroups = [
    {
      id: '1',
      name: '철수와 여행',
      friendIds: ['2'],
      visitedDestinations: ['5', '6', '1'],
    },
    {
      id: '2',
      name: '민지와 여행',
      friendIds: ['3'],
      visitedDestinations: ['2', '3'],
    },
  ];

  const friends = [
    {
      id: '2',
      name: '박철수',
      email: 'chulsoo@example.com',
      status: 'accepted',
    },
    { id: '3', name: '이민지', email: 'minji@example.com', status: 'accepted' },
    {
      id: '4',
      name: '최영희',
      email: 'younghee@example.com',
      status: 'pending',
    },
  ];

  const visitedDestinationIds = new Set(trips.map((t) => t.destinationId));
  const visitedCities = visitedDestinationIds.size;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 rounded-2xl bg-linear-to-r from-blue-600 to-purple-600 p-8 text-white">
          <h1 className="mb-4">다음 여행은 어디로 떠날까요?</h1>
          <p className="mb-6 text-blue-100">
            랜덤으로 새로운 여행지를 추천받고, 친구와 함께 특별한 추억을
            만들어보세요
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => router.push('/random')}
          >
            <Shuffle className="mr-2 h-5 w-5" />
            여행지 뽑기
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">다녀온 도시</CardTitle>
              <MapPin className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visitedCities}개</div>
              {/* TODO: 전체 갯수 수정 */}
              <p className="text-muted-foreground text-xs">전체 nn개 중</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">여행 친구</CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {friends.filter((f) => f.status === 'accepted').length}명
              </div>
              <p className="text-muted-foreground text-xs">
                함께 여행할 친구들
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">여행 기록</CardTitle>
              <Calendar className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trips.length}개</div>
              <p className="text-muted-foreground text-xs">소중한 추억들</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Trips */}
          <Card>
            <CardHeader>
              <CardTitle>최근 여행기</CardTitle>
              <CardDescription>다녀온 여행의 추억들</CardDescription>
            </CardHeader>
            <CardContent>
              {trips.length > 0 ? (
                <div className="space-y-4">
                  {trips.slice(0, 3).map((trip) => (
                    <div
                      key={trip.id}
                      className="flex cursor-pointer gap-4 rounded-lg p-2 transition-colors hover:bg-gray-50"
                      onClick={() => router.push(`/trips/${trip.id}`)}
                    >
                      {trip.photos[0] ? (
                        <Image
                          src={trip.photos[0]}
                          alt={trip.title}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-lg bg-gray-200"></div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-medium">{trip.title}</h4>
                        <p className="text-sm text-gray-600">
                          {trip.destinationName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {trip.visitDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <Calendar className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                  <p>아직 여행 기록이 없어요</p>
                  <Button
                    variant="link"
                    onClick={() => router.push('/trips/new')}
                  >
                    첫 여행 기록하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Travel Groups */}
          <Card>
            <CardHeader>
              <CardTitle>여행 그룹</CardTitle>
              <CardDescription>친구별 여행 이력</CardDescription>
            </CardHeader>
            <CardContent>
              {travelGroups.length > 0 ? (
                <div className="space-y-4">
                  {travelGroups.map((group) => {
                    const friendNames = group.friendIds
                      .map((fid) => friends.find((f) => f.id === fid)?.name)
                      .filter(Boolean)
                      .join(', ');

                    return (
                      <div
                        key={group.id}
                        className="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-gray-50"
                        onClick={() => router.push('/groups')}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">{group.name}</h4>
                          <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                            {group.visitedDestinations.length}곳 방문
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          함께: {friendNames}
                        </p>
                      </div>
                    );
                  })}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/groups')}
                  >
                    모든 그룹 보기
                  </Button>
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <Users className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                  <p>여행 그룹을 만들어보세요</p>
                  <Button
                    variant="link"
                    onClick={() => router.push('/friends')}
                  >
                    친구 추가하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Button
            variant="outline"
            className="flex h-auto flex-col gap-2 py-6"
            onClick={() => router.push('/random')}
          >
            <Shuffle className="h-6 w-6" />
            <span>랜덤 여행지 뽑기</span>
          </Button>
          <Button
            variant="outline"
            className="flex h-auto flex-col gap-2 py-6"
            onClick={() => router.push('/trips/new')}
          >
            <Calendar className="h-6 w-6" />
            <span>여행 기록하기</span>
          </Button>
          <Button
            variant="outline"
            className="flex h-auto flex-col gap-2 py-6"
            onClick={() => router.push('/friends')}
          >
            <Users className="h-6 w-6" />
            <span>친구 관리</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
