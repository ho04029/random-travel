import Link from 'next/link';
import { Button } from '@/components/Button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Card';

interface AuthContentProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

export function AuthContent({
  children,
  title,
  description,
  footerText,
  footerLink,
  footerLinkText,
}: AuthContentProps) {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
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
          {footerText}{' '}
          <Link href={footerLink} className="text-blue-600 hover:underline">
            {footerLinkText}
          </Link>
        </p>
      </CardContent>
    </>
  );
}
