'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { Input } from '@/app/components/Input';
import { Label } from '@/app/components/Label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/Card';

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    // TODO: alert -> toast나 다른 모달창으로 수정하기
    e.preventDefault();
    // 유효성 검사
    if (!name || !email || !password || !confirmPassword) {
      alert('모든 필드를 입력해주세요');
      return;
    }
    if (password.length < 6) {
      alert('비밀번호를 6자 이상 입력해주세요');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }

    // 회원가입 로직
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        console.error(error);
        alert('회원가입 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요');
        return;
      }
      if (data.user) {
        alert('회원가입에 성공하셨습니다');
        router.replace('/');
      }
    } catch (err) {
      console.error(err);
      alert('회원가입 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요');
    } finally {
      setLoading(false);
    }
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
          <CardTitle>회원가입</CardTitle>
          <CardDescription>새로운 여행의 시작</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                '회원가입'
              )}
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
            이미 계정이 있으신가요?{' '}
            <Link href={'/login'} className="text-blue-600 hover:underline">
              로그인
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
