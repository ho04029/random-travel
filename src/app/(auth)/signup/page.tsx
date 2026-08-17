'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import { getErrorMessage, throwIfError } from '@/utils/error';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { AuthContent } from '@/components/AuthContent';

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
      throwIfError(error);

      if (data.user) router.replace('/');
    } catch (err) {
      console.error(err);
      alert(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContent
      title="회원가입"
      description="새로운 여행의 시작"
      footerText="이미 계정이 있으신가요?"
      footerLink="/login"
      footerLinkText="로그인"
    >
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
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : '회원가입'}
        </Button>
      </form>
    </AuthContent>
  );
}
