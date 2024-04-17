'use client';
import { memo } from 'react';
import { connectionIdToColor, getTextColor } from '@/lib/utils';
import { MousePointer2 } from 'lucide-react';
import { useOther } from '../../../../../liveblocks.config';
import { Hint } from '@/components/hint';

interface CursorProps {
  connectionId: number;
}
export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user.presence?.cursor);
  console.log(info, cursor);
  const name = info?.name || 'TeamMate';
  if (!cursor) return null;
  const { x, y } = cursor;
  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px) `,
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs font-semibold"
        style={{
          backgroundColor: connectionIdToColor(connectionId),
          color: getTextColor(connectionId),
        }}
      >
        {name}
      </div>
    </foreignObject>
  );
});
Cursor.displayName = 'Cursor';
