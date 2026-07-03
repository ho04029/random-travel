import Link from 'next/link';
import { MapPin, Home, Shuffle, Users, FileText, Share2 } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button, buttonVariants } from './Button';

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
    href: '/shared',
    label: '공유받은 여행지',
    icon: Share2,
    badgeCount: 3, // 없으면 undefined
  },
];

export function Navbar() {
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
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'relative hidden items-center md:flex',
                  item.badgeCount && 'pr-8',
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {item.badgeCount}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>

          <Button variant="outline">{'사용자'}</Button>
          {/* <Button variant="outline">{user?.name || '사용자'}</Button> */}
        </div>
      </div>
    </nav>
  );
}
