import React from 'react';
import { useParams } from 'react-router-dom';
import { Stage, Layer, Line, Rect, Circle } from 'react-konva';
import { Drawing } from '@/types/types';
import { baseUrl } from '../../../config';


const DrawingPage: React.FC = () => {
  const { drawingId } = useParams<{ drawingId: string }>();
  const [drawing, setDrawing] = React.useState<Drawing>({ lines: [], shapes: [], textAnnotations: [], title: '', _id: '', createdAt: '' });
  React.useEffect(() => {
    const fetchDrawing = async () => {
      const res = await fetch(`${baseUrl}/drawing/${drawingId}`);
      const data = await res.json();
      setDrawing(data?.data);
    };
    fetchDrawing();
  }, [drawingId]);
  const { title, lines, shapes } = drawing || {};
  return (
    <div>
      <h1>{title} {drawingId}</h1>
      <h2> {drawingId}</h2>

      <Stage width={window.innerWidth}
        height={600}>
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}
          {shapes.map((shape, i) => (
            <React.Fragment key={i}>
              {shape.tool === 'rectangle' && (
                <Rect
                  x={shape.x}
                  y={shape.y}
                  width={shape.width || 0}
                  height={shape.height || 0}
                  stroke="#df4b26"
                  strokeWidth={5}
                />
              )}
              {shape.tool === 'circle' && (
                <Circle
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius || 0}
                  stroke="#df4b26"
                  strokeWidth={5}
                />
              )}
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingPage;
