import type React from "react";

/**
 * Type augmentation for @xyflow/react v12 — fills in missing type exports
 * that are broken in the package's dist/esm/index.d.ts (incorrect relative paths).
 */
declare module "@xyflow/react" {
  export const Controls: React.ComponentType<{
    position?: string;
    showZoom?: boolean;
    showFitView?: boolean;
    showInteractive?: boolean;
    className?: string;
    style?: React.CSSProperties;
    orientation?: "horizontal" | "vertical";
  }>;

  export const MiniMap: React.ComponentType<{
    nodeColor?: string | ((node: unknown) => string);
    nodeStrokeColor?: string;
    nodeBorderRadius?: number;
    maskColor?: string;
    style?: React.CSSProperties;
    className?: string;
    position?: string;
    zoomable?: boolean;
    pannable?: boolean;
  }>;

  export const Background: React.ComponentType<{
    color?: string;
    gap?: number | [number, number];
    size?: number;
    variant?: BackgroundVariant;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
  }>;

  export enum BackgroundVariant {
    Lines = "lines",
    Dots = "dots",
    Cross = "cross",
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type NodeTypes = Record<string, React.ComponentType<any>>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface NodeProps<
    T extends Record<string, unknown> = Record<string, unknown>,
  > {
    id: string;
    data: T;
    selected?: boolean;
    isConnectable?: boolean;
    type?: string;
    dragging?: boolean;
    positionAbsoluteX?: number;
    positionAbsoluteY?: number;
    zIndex?: number;
    width?: number | null;
    height?: number | null;
    deletable?: boolean;
    selectable?: boolean;
    dragHandle?: string;
  }
}
