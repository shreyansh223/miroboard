'use client';
import { memo } from 'react';
import { useStorage } from '../../../../../liveblocks.config';
import { LayerType } from '../../../../../types/canvas';
import { Rectangle } from './rectangle';
import { Ellipse } from './ellipse';
import { Text } from './text';
import { Note } from './note';
import { Path } from './path';
import { colourToCss } from '@/lib/utils';
interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));
    if (!layer) return null;
    switch (layer.type) {
      case LayerType.Path:
        return (
          <Path
            key={id}
            points={layer.points}
            onPointerDown={(e) => {
              onLayerPointerDown(e, id);
            }}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colourToCss(layer.fill) : '#000'}
            stroke={selectionColor}
          />
        );
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            selectionColor={selectionColor}
            onPointerDown={onLayerPointerDown}
            layer={layer}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            selectionColor={selectionColor}
            onPointerDown={onLayerPointerDown}
            layer={layer}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            selectionColor={selectionColor}
            onPointerDown={onLayerPointerDown}
            layer={layer}
          />
        );
      case LayerType.Note:
        return (
          <Note
            id={id}
            selectionColor={selectionColor}
            onPointerDown={onLayerPointerDown}
            layer={layer}
          />
        );

      default:
        console.warn('Unknown type');
        return null;
    }
  }
);

LayerPreview.displayName = 'LayerPreview';
