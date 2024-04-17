import { getSvgPathFromStroke } from '@/lib/utils';
import { getStroke } from 'perfect-freehand';

interface PathProps {
  x: number;
  y: number;
  points: number[][];
  onPointerDown?: (e: React.PointerEvent) => void;
  fill: string;
  stroke?: string;
}
export const Path = ({
  x,
  y,
  points,
  onPointerDown,
  fill,
  stroke,
}: PathProps) => {
  return (
    <path
      className="drop-shadow-md "
      onPointerDown={onPointerDown}
      fill={fill}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 8,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      style={{
        transform: `translate(${x}px,${y}px)`,
      }}
      x={0}
      y={0}
      stroke={stroke}
      strokeWidth={1}
    />
  );
};
