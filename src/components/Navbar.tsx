'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import {
  MapPin,
  Home,
  Shuffle,
  Users,
  FileText,
  Share2,
  Heart,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Button, buttonVariants } from './Button';
import { useUser } from '@/hooks/useUser';

const navItems = [
  {
    href: '/',
    label: '홈',
    icon: Home,
  },
  {
    href: '/random',
    label: '랜덤 뽑기',
    icon: Shuffle,
  },
  {
    href: '/friends',
    label: '친구',
    icon: Users,
  },
  {
    href: '/trips',
    label: '여행기',
    icon: FileText,
  },
  {
    href: '/favorite',
    label: '좋아요',
    icon: Heart,
  },
  {
    href: '/shared',
    label: '공유받은 여행지',
    icon: Share2,
    badgeCount: 3, // 없으면 undefined
  },
];

type NavLinkProps = {
  item: (typeof navItems)[number];
  onClick?: () => void;
  variant: 'desktop' | 'mobile';
};
// nav 메뉴들
function NavLink({ item, onClick, variant }: NavLinkProps) {
  const Icon = item.icon;
  const badge =
    item.badgeCount && item.badgeCount > 0 ? (
      <span
        className={
          variant === 'desktop'
            ? 'absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'
            : 'ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'
        }
      >
        {item.badgeCount}
      </span>
    ) : null;

  if (variant === 'desktop') {
    return (
      <Link
        href={item.href}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'relative hidden items-center md:flex',
          item.badgeCount && 'pr-8',
        )}
      >
        <Icon className="mr-2 h-4 w-4" />
        {item.label}
        {badge}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100"
    >
      <Icon className="h-5 w-5" />
      {item.label}
      {badge}
    </Link>
  );
}

function getDisplayName(user: User) {
  return user.user_metadata?.name ?? user.email;
}

type AuthMenuProps = {
  user: User | null;
  loading: boolean;
  onSignOut: () => void;
  className?: string;
};
// 로그인 로그아웃 버튼
function AuthMenu({ user, loading, onSignOut, className }: AuthMenuProps) {
  if (loading) return null;

  if (!user) {
    return (
      <Link href="/login" className={cn('flex items-center gap-2', className)}>
        <Button variant="outline">로그인</Button>
      </Link>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm font-medium">{getDisplayName(user)} 님</span>
      <Button variant="outline" size="sm" onClick={onSignOut}>
        <LogOut className="mr-1 h-4 w-4" />
        로그아웃
      </Button>
    </div>
  );
}

export function Navbar() {
  const { user, loading, signOut } = useUser();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // 메뉴바 열렸을 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-600 p-2">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">랜덤 국내 여행</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} variant="desktop" />
            ))}
          </div>

          <AuthMenu
            className="hidden md:flex"
            user={user}
            loading={loading}
            onSignOut={handleSignOut}
          />

          <button
            className="z-60 ml-2 md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={closeMenu} />
          <div className="fixed top-0 right-0 z-60 h-full w-64 bg-white shadow-lg">
            <div className="flex flex-col gap-1 p-4 pt-20">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  variant="mobile"
                  onClick={closeMenu}
                />
              ))}
              <AuthMenu
                className="px-2 py-2.5"
                user={user}
                loading={loading}
                onSignOut={handleSignOut}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
