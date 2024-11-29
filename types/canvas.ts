import { Camera } from 'lucide-react';

export type Color = {
  r: number;
  g: number;
  b: number;
};
export type Camera = { x: number; y: number };

export enum LayerType {
  Rectangle,
  Ellipse,
  Text,
  Note,
  Path,
}
export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};
export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};
export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  points: number[][];
  value?: string;
  size: number[];
};
export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};
export type NoteLayer = {
  type: LayerType.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type Point = {
  x: number;
  y: number;
};
export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export enum Side {
  Top = 1,
  Bottom = 2,
  Right = 8,
  Left = 4,
}
export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Resizing,
  Pencil,
  Inserting,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.Pressing;
      origin: Point;
    }
  | {
      mode: CanvasMode.Translating;
      current: Point;
    }
  | {
      mode: CanvasMode.Pencil;
    }
  | {
      mode: CanvasMode.Inserting;
      LayerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note;
    }
  | {
      mode: CanvasMode.Resizing;
      initialBounds: XYWH;
      corner: Side;
    };

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | TextLayer
  | NoteLayer
  | PathLayer;
