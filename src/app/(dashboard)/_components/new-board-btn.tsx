'use client';

import { cn } from '@/lib/utils';

import { Plus } from 'lucide-react';
import { api } from '../../../../convex/_generated/api';
import { useApiMutation } from '../../../../hooks/use-api-mutation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}
export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = async () => {
    mutate({ orgId, title: 'Untitled' })
      .then((id) => {
        toast.success(`Board created${id}`);
        router.push(`/board/${id}`);
      })
      .catch(() => toast.error('Failed to create board'));
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        'col-span-1 aspect-[100/127 bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col justify-center items-center py-6 duration-300',
        (pending || disabled) &&
          'opacity-75 hover:bg-blue-600 cursor-not-allowed'
      )}
    >
      <Plus className="w-12 h-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New Board</p>
    </button>
  );
};

//3:10:34
//cd miroboard
