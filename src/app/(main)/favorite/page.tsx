'use client';

import { useEffect, useState } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { Card, CardContent } from '@/components/Card';
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {favorites.map((favorite) => (
        <Card key={favorite.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold">{favorite.destinations.name}</h3>

              <div className="text-muted-foreground mt-2 flex items-center gap-1 text-sm">
                <MapPin className="h-4 w-4" />
                {favorite.destinations.province}
              </div>
            </div>

            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
