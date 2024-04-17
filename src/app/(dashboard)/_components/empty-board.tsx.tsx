'use client';
import { useMutation } from 'convex/react';
import Image from 'next/image';
import { api } from '../../../../convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useApiMutation } from '../../../../hooks/use-api-mutation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const EmptyBoard = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);
  const onclick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: 'Untitled Board',
    })
      .then((id) => {
        toast.success('Board created successfully.');
        router.push(`/board/${id}`);
      })
      .catch((err) => {
        toast.error('Failed to create board');
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={'/note.svg'} alt="Empty" height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create your first Board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        start by creating a board for your organization
      </p>
      <Button disabled={pending} onClick={onclick} className="mt-6">
        Create Board
      </Button>
    </div>
  );
};
