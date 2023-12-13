import React, { useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stage, Layer, Line, Rect, Circle } from 'react-konva';
import {  Drawing, Line as ILine, Shape } from '@/types/types';
import { baseUrl } from '../../config';
import ToolBar from '@/components/ToolBar';
import { AppContext } from '@/App';


const DrawingPage: React.FC = () => {
  const { drawingId } = useParams<{ drawingId: string }>();
  const titleRef = useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const fetchDrawing = async () => {
      const res = await fetch(`${baseUrl}/drawing/${drawingId}`);
      const data = await res.json();
      setLines(data?.data?.lines);
      setShapes(data?.data?.shapes);
      setTextAnnotations(data?.data?.textAnnotations);
      if (titleRef.current) {
        titleRef.current.value = data?.data?.title || '';
      }
    };
    fetchDrawing();
  }, [drawingId]);
  
  const [tool, setTool] = useState<string>('pen');
  const [lines, setLines] = useState<ILine[]>([]);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [textAnnotations, setTextAnnotations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isDrawing = useRef<boolean>(false);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    switch (tool) {
      case 'pen':
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
        break;
      case 'rectangle':
        setShapes([...shapes, { tool, x: pos.x, y: pos.y, width: 0, height: 0 }]);
        break;
      case 'circle':
        setShapes([...shapes, { tool, x: pos.x, y: pos.y, radius: 0 }]);
        break;
      default:
        break;
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    switch (tool) {
      case 'pen':
        // eslint-disable-next-line no-case-declarations
        const lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        setLines([...lines.slice(0, -1), lastLine]);
        break;
      case 'rectangle':
        // eslint-disable-next-line no-case-declarations
        const lastRectangle = shapes[shapes.length - 1];
        lastRectangle.width = point.x - lastRectangle.x;
        lastRectangle.height = point.y - lastRectangle.y;
        setShapes([...shapes.slice(0, -1), lastRectangle]);
        break;
      case 'circle':
        // eslint-disable-next-line no-case-declarations
        const lastCircle = shapes[shapes.length - 1];
        lastCircle.radius = Math.sqrt(
          Math.pow(point.x - lastCircle.x, 2) + Math.pow(point.y - lastCircle.y, 2)
        );
        setShapes([...shapes.slice(0, -1), lastCircle]);
        break;
      default:
        break;
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  const {setDrawings} = useContext(AppContext)
  const saveDrawing = async () => {
    setLoading(true);
    const drawingData = {
      lines,
      shapes,
      textAnnotations,
      title: titleRef.current?.value,
    };
    await fetch(`${baseUrl}/drawing/${drawingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(drawingData),
    }).then(res => res.json()).then(data => {
      console.log(data);
      setDrawings((prev: Drawing[]) => prev.map((d: any) => d._id === drawingId ? data.data : d))
    }
    ).catch(err => {
      console.log(err);
    }
    ).finally(() => {
      setLoading(false);
    }
    );
  };

  return (
    <div>
      <ToolBar titleRef={titleRef} setTool={setTool} saveDrawing={saveDrawing} tool={tool} loading={loading} />
      {loading && <div className="absolute w-full" ><div className="loader" /></div>}
      <Stage
        width={window.innerWidth }
        height={window.innerHeight / 1.18}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
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
