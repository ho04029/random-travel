// import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from './components/Button';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <h1 className="mb-4">다음 여행은 어디로 떠날까요?</h1>
          <p className="mb-6 text-blue-100">
            랜덤으로 새로운 여행지를 추천받고, 친구와 함께 특별한 추억을
            만들어보세요
          </p>
          <Button
            // size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => router.push('/random')}
          >
            {/* <Shuffle className="mr-2 h-5 w-5" /> */}
            여행지 뽑기
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">다녀온 도시</CardTitle>
              <MapPin className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visitedCities}개</div>
              <p className="text-muted-foreground text-xs">
                전체 {destinations.length}개 중
              </p>
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
          </Card> */}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Trips */}
          {/* <Card>
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
                      <Image
                        src={trip.photos[0]}
                        alt={trip.title}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
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
          </Card> */}

          {/* Travel Groups */}
          {/* <Card>
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
          </Card> */}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Button
            // variant="outline"
            className="flex h-auto flex-col gap-2 py-6"
            onClick={() => router.push('/random')}
          >
            {/* <Shuffle className="h-6 w-6" /> */}
            <span>랜덤 여행지 뽑기</span>
          </Button>
          <Button
            // variant="outline"
            className="flex h-auto flex-col gap-2 py-6"
            onClick={() => router.push('/trips/new')}
          >
            {/* <Calendar className="h-6 w-6" /> */}
            <span>여행 기록하기</span>
          </Button>
          <Button
            // variant="outline"
            className="flex h-auto flex-col gap-2 py-6"
            onClick={() => router.push('/friends')}
          >
            {/* <Users className="h-6 w-6" /> */}
            <span>친구 관리</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
