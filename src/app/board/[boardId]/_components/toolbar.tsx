'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { ToolButton } from './tool-button';
import {
  Circle,
  MousePointer2,
  NotebookIcon,
  Pen,
  Pencil,
  RectangleEllipsis,
  Redo,
  Redo2,
  Square,
  StickyNote,
  StickyNoteIcon,
  Type,
  Undo,
  Undo2,
} from 'lucide-react';
import {
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
} from '../../../../../types/canvas';

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  setLastUsedColor: (color: Color) => void;
  lastUsedColor: Color;
  size: number[];
  setSize?: (value: number[]) => void;
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
  lastUsedColor,
  setLastUsedColor,
  size,
  setSize,
}: ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.Resizing ||
            canvasState.mode === CanvasMode.SelectionNet
          }
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              LayerType: LayerType.Text,
            });
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.LayerType === LayerType.Text
          }
        />
        <ToolButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              LayerType: LayerType.Note,
            });
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.LayerType === LayerType.Note
          }
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              LayerType: LayerType.Rectangle,
            });
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.LayerType === LayerType.Rectangle
          }
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              LayerType: LayerType.Ellipse,
            });
          }}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.LayerType === LayerType.Ellipse
          }
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Pencil,
            });
          }}
          isActive={canvasState.mode === CanvasMode.Pencil}
          setLastUsedColor={setLastUsedColor}
          lastUsedColor={lastUsedColor}
          size={size}
          setSize={setSize}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center">
        <ToolButton
          label="Undo"
          icon={Undo}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div
      className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4
    h-[360px] w-[52px] bg-white shadow-md rounded-md"
    ></div>
  );
};
