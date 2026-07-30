'use client';

import { useState } from 'react';
// import Image from 'next/image';
import { supabase } from '@/utils/supabase/client';
import { cn } from '@/utils/cn';
import { Destination } from '@/types/destination';
import { Shuffle, Share2, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Card';
import { Checkbox } from '@/components/Checkbox';

export default function RandomPick() {
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);
  const [excludeVisited, setExcludeVisited] = useState(false);
  const [result, setResult] = useState<Destination | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // todo: 기존에 갔던 여행지 제외하기
  const handleRandomPick = async () => {
    try {
      const { data, error } = await supabase.rpc('random_destination');
      setResult(data[0]);
      if (error) {
        console.error(error);
        alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요');
        return;
      }
    } catch (error) {
      console.error(error);
      alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요');
    }
  };

  // todo: 친구에게 공유 기능 만들기
  const handleShare = () => {
    if (!result) return;
    if (selectedFriendIds.length === 0) {
      alert('공유할 친구를 선택해주세요');
      return;
    }
    selectedFriendIds.forEach((friendId) => {
      console.log(friendId);
      // shareDestination(result.id, friendId, `${result.name} 같이 가요!`);
    });
    alert('여행지를 공유했습니다!');
  };

  // todo: 좋아요
  const handleFavorite = async () => {
    // 좋아요 삭제
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      // 좋아요
      setIsFavorite(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-2">랜덤 여행지 추첨</h1>
            <p className="text-gray-600">
              필터를 설정하고 운명의 여행지를 뽑아보세요!
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* 필터 */}
            <Card>
              <CardHeader>
                <CardTitle>필터 설정</CardTitle>
                <CardDescription>원하는 조건을 선택하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="exclude"
                    checked={excludeVisited}
                    onCheckedChange={(checked) => setExcludeVisited(!!checked)}
                  />
                  <label
                    htmlFor="exclude"
                    className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    기존 여행지 제외
                  </label>
                </div>

                <Button className="w-full" size="lg" onClick={handleRandomPick}>
                  <Shuffle className="mr-2 h-5 w-5" />
                  랜덤 여행지 뽑기
                </Button>
              </CardContent>
            </Card>

            {/* 추첨 결과*/}
            <Card>
              <CardHeader>
                <CardTitle>추첨 결과</CardTitle>
                <CardDescription>당신의 다음 여행지는?</CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    {/* todo: description과 img 어떻게 할지 고민하기 */}
                    {/* <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={result.imageUrl}
                        alt={result.name}
                        className="h-full w-full object-cover"
                      />
                    </div> */}
                    <div>
                      <h2 className="mb-2">{result.name}</h2>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                          <MapPin className="mr-1 h-3 w-3" />
                          {result.province ? result.province : result.name}
                        </span>
                      </div>
                      {/* <p className="mb-4 text-gray-600">{result.description}</p> */}

                      <div className="flex gap-2">
                        <Button
                          onClick={handleRandomPick}
                          variant="outline"
                          className="flex-1"
                        >
                          <Shuffle className="mr-2 h-4 w-4" />
                          다시 뽑기
                        </Button>
                        <Button
                          onClick={handleShare}
                          variant="outline"
                          disabled={selectedFriendIds.length === 0}
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          공유
                        </Button>
                        <Button variant="outline" onClick={handleFavorite}>
                          <Heart
                            className={cn(
                              'h-4 w-4 transition-colors',
                              isFavorite && 'fill-red-500 text-red-500',
                            )}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-16 text-center text-gray-400">
                    <Shuffle className="mx-auto mb-4 h-16 w-16" />
                    <p>필터를 설정하고 여행지를 뽑아보세요</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
