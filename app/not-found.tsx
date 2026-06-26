'use client';

import { useRouter } from 'next/navigation';
import { MapPin, Home } from 'lucide-react';
import { Button } from './components/Button';
import { Card, CardContent } from './components/Card';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <MapPin className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="mb-4">404</h1>
          <h2 className="mb-4">페이지를 찾을 수 없습니다</h2>
          <p className="mb-8 text-gray-600">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
          <Button onClick={() => router.push('/')}>
            <Home className="mr-2 h-4 w-4" />
            홈으로 돌아가기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
