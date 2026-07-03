'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Card';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    // TODO: alert -> toast나 다른 모달창으로 수정하기
    e.preventDefault();
    // 유효성 검사
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요');
      return;
    }

    // 로그인
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error);
        alert('로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요');
        return;
      }
      if (data.user) {
        alert('로그인에 성공하셨습니다');
        router.replace('/');
      }
    } catch (err) {
      console.error(err);
      alert('회원가입 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요');
    }
    alert('로그인 성공!');
    router.replace('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-blue-600 p-3">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            랜덤 국내 여행에 오신 것을 환영합니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              로그인
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">또는</span>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full" type="button">
              카카오로 계속하기
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              회원가입
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
