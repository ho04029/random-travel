'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import { getErrorMessage, throwIfError } from '@/utils/error';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { AuthContent } from '@/components/AuthContent';

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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      throwIfError(error);

      if (data.user) router.replace('/');
    } catch (err) {
      console.error(err);
      alert(getErrorMessage(err));
    }
  };

  return (
    <AuthContent
      title="로그인"
      description="랜덤 국내 여행에 오신 것을 환영합니다"
      footerText="계정이 없으신가요?"
      footerLink="/signup"
      footerLinkText="회원가입"
    >
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
    </AuthContent>
  );
}
