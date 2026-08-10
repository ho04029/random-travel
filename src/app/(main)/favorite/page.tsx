'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MapPin, FileText } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { Card, CardContent } from '@/components/Card';
import { Button } from '@/components/Button';
import { QueryData } from '@supabase/supabase-js';

const query = supabase.from('favorite_destinations').select(`
    id,
    destinations (
      id,
      name,
      province,
      regn_cd,
      signgu_cd
    )
  `);

type Favorites = QueryData<typeof query>;

export default function FavoritePage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorites>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await query.eq('user_id', user.id);

      if (error) {
        console.error(error);
      } else {
        setFavorites(data);
      }

      setLoading(false);
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <p>불러오는 중...</p>;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-muted-foreground flex h-80 items-center justify-center">
        좋아요한 여행지가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-4 px-4 py-4 md:grid-cols-2 lg:grid-cols-3">
      {favorites.map((favorite) => (
        <Card key={favorite.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="mb-2 font-semibold">
                {favorite.destinations.name}
              </h3>

              <div className="mb-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                  <MapPin className="mr-1 h-3 w-3" />
                  {favorite.destinations.province
                    ? favorite.destinations.province
                    : favorite.destinations.name}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() =>
                  // todo: 경로 어떻게 할지 좀 더 생각해보기
                  router.push(
                    `/trips/new?destination=${favorite.destinations.id}`,
                  )
                }
              >
                <FileText />
                여행기 쓰기
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
