import { Hint } from '@/components/hint';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Fallback } from '@radix-ui/react-avatar';

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar = ({
  src,
  name,
  fallback,
  borderColor,
}: UserAvatarProps) => {
  return (
    <Hint label={name || 'TeamMate'} side="bottom" sideOffset={18}>
      <Avatar className="h-8 w-8 border-4" style={{ borderColor }}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};
