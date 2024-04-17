'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { OrganizationSwitcher } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Ghost, LayoutDashboard, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

const Orgsidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get('favorites');
  return (
    <div className=" hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pr-3 pt-5">
      <Link href={'/'}>
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" alt="logo" height={60} width={60} />
          <span className={cn('font-semibold text-2xl', font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          asChild
          size="lg"
          variant={favorites ? 'ghost' : 'secondary'}
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-1" />
            Boards in this Team
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant={favorites ? 'secondary' : 'ghost'}
          className="font-normal justify-start px-2 w-full"
        >
          <Link
            href={{
              pathname: '/',
              query: { favorites: true },
            }}
          >
            <Star className="h-4 w-4 mr-1" />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Orgsidebar;