interface Line {
  tool: string;
  points: number[];
}

interface Shape {
  tool: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
}
interface Drawing {
  _id: string;
  title: string;
  lines: Line[];
  shapes: Shape[];
  textAnnotations: string[];
  createdAt: string;
  updatedAt: string;
}
export type {  Drawing, Line, Shape };
