'use client';
import { LucideIcon } from 'lucide-react';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

import { ColorPicker } from './colorPicker';
import { useMutation } from '../../../../../liveblocks.config';
import { Color } from '../../../../../types/canvas';

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  setLastUsedColor?: (color: Color) => void;
  lastUsedColor?: Color;
  size?: number[];
  setSize?: (value: number[]) => void;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
  setLastUsedColor,
  lastUsedColor,
  size,
  setSize,
}: ToolButtonProps) => {
  const setColor = (color: Color) => {
    if (setLastUsedColor) setLastUsedColor(color);
  };
  switch (label) {
    case 'Pen':
      return (
        <Hint label={label} side="right" sideOffset={14}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={isDisabled}
                onClick={onClick}
                size="icon"
                variant={isActive ? 'boardActive' : 'board'}
              >
                <Icon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="center"
              side="right"
              sideOffset={20}
              className="flex flex-col w-60 p-3"
            >
              <div className={'p-2 '}>
                <Slider
                  min={1}
                  max={20}
                  step={0.5}
                  defaultValue={size}
                  onValueCommit={setSize}
                />
                <div className="text-xs pt-2">
                  Thickness: {size ? size[0] : 8}
                </div>
              </div>
              <ColorPicker onClick={setColor} />
            </PopoverContent>
          </Popover>
        </Hint>
      );
      break;
    default:
      return (
        <Hint label={label} side="right" sideOffset={14}>
          <Button
            disabled={isDisabled}
            onClick={onClick}
            size="icon"
            variant={isActive ? 'boardActive' : 'board'}
          >
            <Icon />
          </Button>
        </Hint>
      );
  }
};
