'use client';
import { memo } from 'react';
import { Camera, Color } from '../../../../../types/canvas';
import { useMutation, useSelf } from '../../../../../liveblocks.config';
import { useSelectionBounds } from '../../../../../hooks/use-selection-bounds';
import { ColorPicker } from './colorPicker';
import { useDeleteLayers } from '../../../../../hooks/use-delete-layers';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { BringToFront, SendToBack, Trash2 } from 'lucide-react';

interface selectionToolProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
  lastUsedColor: Color;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor, lastUsedColor }: selectionToolProps) => {
    const selection = useSelf((me) => me.presence.selection);
    const selectionBounds = useSelectionBounds();
    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get('layerIds');
        const indices: number[] = [];
        const arr = liveLayerIds.toImmutable();
        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection]
    );
    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get('layerIds');
        const indices: number[] = [];
        const arr = liveLayerIds.toImmutable();
        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayerIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );
    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get('layers');

        setLastUsedColor(fill);
        console.log(lastUsedColor);
        selection.forEach((id) => {
          liveLayers.get(id)?.set('fill', fill);
        });
      },
      [selection, setLastUsedColor, lastUsedColor]
    );

    const deleteLayers = useDeleteLayers();
    if (!selectionBounds) return null;
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 15}px - 100%))`,
        }}
      >
        <ColorPicker onClick={setFill} />
        <div className="flex flex-col gap-y-0.5 items-center justify-center">
          <Hint label="Bring To Front" side="bottom">
            <Button variant="board">
              <BringToFront onClick={moveToFront} />
            </Button>
          </Hint>
          <Hint label="Send To Back" side="bottom">
            <Button variant="board">
              <SendToBack onClick={moveToBack} />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-1 ">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = 'SelectionTools';
