// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Overlay } from './overlay';
// import { useAuth } from '@clerk/nextjs';
// import { formatDistanceToNow } from 'date-fns';
// import { Star } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
// import { Skeleton } from '@/components/ui/skeleton';
// interface BoardCardProps {
//   id: string;
//   title: string;
//   imageUrl: string;
//   authorId: string;
//   authorName: string;
//   createdAt: number;
//   orgId: string;
//   isFavorite: boolean;
// }
// interface FooterProps {
//   onClick: () => void;
//   disabled: boolean;
// }
// export const BoardCard = (
//   {
//     id,
//     title,
//     imageUrl,
//     authorId,
//     authorName,
//     createdAt,
//     orgId,
//     isFavorite,
//   }: BoardCardProps,
//   { onClick, disabled }: FooterProps
// ) => {
//   const { userId } = useAuth();
//   const authorLabel = userId === authorId ? 'me' : `${authorName}`;
//   const createdAtLabel = formatDistanceToNow(createdAt, {
//     addSuffix: true,
//   });

//   return (
//     <Link
//       href={`/board/${id}`}
//       className=" group aspect-[100/127] flex flex-col justify-between bg-[rgba(246,240,219,0.53)] rounded-lg transition duration-200 border-amber-100 border "
//     >
//       <div className="relative w-full  ">
//         <Image
//           src={imageUrl}
//           alt={title}
//           className="object-fit w-full h-full rounded-t-lg  bg-opacity-0 bg-black group-hover:bg-opacity-50 duration-300"
//           width={'100'}
//           height={'100'}
//         />
//       </div>
//       <div className="p-4 relative ">
//         <h3 className="text-md ">{title}</h3>
//         <p className=" text-muted-foreground text-xs mt-1 opacity-75 ">
//           Created by {authorLabel}
//         </p>
//         <p className=" text-muted-foreground text-xs mt-1 opacity-75 ">
//           {createdAtLabel}
//         </p>

//         <Button
//           onClick={onClick}
//           disabled={disabled}
//           className={cn(
//             'opacity-0 group-hover:opacity-100 transition text-muted-foreground bg-transparent hover:bg-transparent absolute top-[7px] -right-[7px]  ',

//             disabled && 'cursor-not-allowed  opacity-75'
//           )}
//         >
//           <Star
//             className={cn(
//               'h-4 w-4 hover:text-blue-600',
//               isFavorite && 'fill-blue-600 text-blue-600'
//             )}
//           />
//         </Button>
//       </div>
//     </Link>
//   );
// };

// BoardCard.Skeleton = function BoardCardSkeleton() {
//   return (
//     <div className="aspect-[100/127]  bg-[rgba(246,240,219,0.53)] rounded-lg  border-amber-100 border ">
//       <Skeleton className="w-full " />
//     </div>
//   );
// };

'use client';

import { toast, Toaster } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';
import { MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import { api } from '../../../../../convex/_generated/api';

import { Skeleton } from '@/components/ui/skeleton';
import { useApiMutation } from '../../../../../hooks/use-api-mutation';

import { Footer } from './footer';
import { Overlay } from './overlay';
import { Actions } from '@/components/actions';
import { favorite } from '../../../../../convex/board';

interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite
  );
  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch((error) => {
        toast.error('failed to unfavorite');
      });
    } else {
      onFavorite({ id, orgId }).catch((error) => {
        toast.error('failed to favorite');
      });
    }
  };
  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
