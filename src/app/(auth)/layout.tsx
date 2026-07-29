import { MapPin } from 'lucide-react';
import { Card } from '@/components/Card';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex justify-center pt-6">
          <div className="rounded-full bg-blue-600 p-3">
            <MapPin className="h-8 w-8 text-white" />
          </div>
        </div>
        {children}
      </Card>
    </div>
  );
}
