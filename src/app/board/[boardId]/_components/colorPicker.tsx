'use client';

import { colourToCss, hashtorgb } from '@/lib/utils';
import { Color } from '../../../../../types/canvas';
import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  onClick: (color: Color) => void;
}

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

export const ColorPicker = ({ onClick }: ColorPickerProps) => {
  const [colors, setColors] = useState<Color[]>([
    { r: 243, g: 82, b: 35 },
    { r: 255, g: 249, b: 177 },
    { r: 68, g: 202, b: 99 },
    { r: 39, g: 142, b: 237 },
    { r: 155, g: 105, b: 245 },
    { r: 252, g: 142, b: 42 },
    { r: 0, g: 0, b: 0 },
    { r: 255, g: 255, b: 255 },
  ]);

  // Load additional colors from local storage on mount
  useEffect(() => {
    const colorStorage = localStorage.getItem('colors');
    if (colorStorage) {
      const colorArray = JSON.parse(colorStorage);
      setColors((prevColors) => [...colorArray]);
    }
  }, [setColors]);

  const colorPicker = useRef<HTMLInputElement>(null);

  // Handle the button click to trigger the hidden color input
  const handleButtonClick = () => {
    if (colorPicker.current) {
      colorPicker.current.click();
    }
  };

  // Handle color selection
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = hashtorgb(event.target.value);

    // Update colors array if color is unique
    if (!colors.some((c) => JSON.stringify(c) === JSON.stringify(color))) {
      const storage = localStorage.getItem('colors');
      if (storage) {
        const updatedColors = [...JSON.parse(storage), color];
        setColors(updatedColors);
        localStorage.setItem('colors', JSON.stringify(updatedColors));
      } else {
        const updatedColors = [color];
        setColors(updatedColors);
        localStorage.setItem('colors', JSON.stringify(updatedColors));
      }
      // Update local storage
    }

    onClick(color); // Trigger onClick callback with the selected color
  };

  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200 relative">
      {colors.map((color, index) => (
        <ColorButton key={index} onClick={onClick} color={color} />
      ))}

      <button
        className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
        onClick={handleButtonClick}
      >
        <Plus className="h-8 w-8 rounded-md border border-neutral-300" />
      </button>

      <input
        type="color"
        name="colorPicker"
        id="colorPicker"
        ref={colorPicker}
        onChange={handleColorChange}
        className="opacity-0 absolute top-0 left-0"
      />
    </div>
  );
};

// ColorButton Component
const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{ background: colourToCss(color) }}
      />
    </button>
  );
};
