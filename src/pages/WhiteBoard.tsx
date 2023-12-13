import { Line as ILine, Shape } from '@/types/types';
import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Text, Rect, Circle } from 'react-konva';


export default function Whiteboard() {
    const [tool, setTool] = useState<string>('pen');
    const [lines, setLines] = useState<ILine[]>([]);
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [textAnnotations, setTextAnnotations] = useState<string[]>([]);
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
                let lastLine = lines[lines.length - 1];
                lastLine.points = lastLine.points.concat([point.x, point.y]);
                setLines([...lines.slice(0, -1), lastLine]);
                break;
            case 'rectangle':
                let lastRectangle = shapes[shapes.length - 1];
                lastRectangle.width = point.x - lastRectangle.x;
                lastRectangle.height = point.y - lastRectangle.y;
                setShapes([...shapes.slice(0, -1), lastRectangle]);
                break;
            case 'circle':
                let lastCircle = shapes[shapes.length - 1];
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

    const saveDrawing = async () => {
        // Combine lines, shapes, and text annotations for API request
        const drawingData = {
            lines,
            shapes,
            textAnnotations,
            title: 'My Drawing',
        };
        await fetch('http://localhost:3000/drawing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(drawingData),
        }).then(res => {
            console.log(res);
        }
        ).catch(err => {
            console.log(err);
        }
        );
    };

    return (
        <div>
            <select
                value={tool}
                onChange={(e) => {
                    setTool(e.target.value);
                }}
            >
                <option value="pen">Pen</option>
                <option value="rectangle">Rectangle</option>
                <option value="circle">Circle</option>
            </select>
            <button onClick={saveDrawing}>Save Drawing</button>
            <Stage
                width={window.innerWidth / 1.05}
                height={window.innerHeight / 1.18}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <Layer>
                    <Text text="Start drawing" x={5} y={30} />
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
}
