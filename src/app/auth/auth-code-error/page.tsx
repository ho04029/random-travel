'use client';

import { useRouter } from 'next/navigation';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card, CardContent } from '@/components/Card';

export default function AuthCodeError() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="mb-4">로그인 오류</h1>
          <h2 className="mb-4">로그인 중 오류가 발생했습니다</h2>
          <p className="mb-8 text-gray-600">
            인증 코드 처리 중 문제가 발생했습니다. 다시 시도해주세요.
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
