'use client';
import { useOrganization, UserButton } from '@clerk/nextjs';
import { EmptyOrg } from './_components/emptyorg';
import { BoardList } from './_components/board-list';

interface DashBoardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export default function DashBoard({ searchParams }: DashBoardPageProps) {
  const { organization } = useOrganization();
  return (
    <div className="flex-1 h-[calc(100%-85px)] p-6 ">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
}
