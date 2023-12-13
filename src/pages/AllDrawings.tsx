import DrawingCard from '@/components/DrawingCard';
import { Drawing } from '@/types/types';
import { FC, useEffect, useState } from 'react';

interface AllDrawingsProps {
    // Define your component props here
}

const AllDrawings: FC<AllDrawingsProps> = () => {
    const [drawings, setDrawings] = useState<Array<Drawing>>([]);
    useEffect(() => {
        // fetch drawings
        const fetchDrawings = async () => {
            const res = await fetch('http://localhost:3000/drawings');
            const data = await res.json();
            setDrawings(data?.data);
        }
        fetchDrawings();
    }, []);
    console.log('drawings: ', drawings);
    
    return (
        <div>
      <h2>All Drawings</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {drawings.map((drawing) => (
          <DrawingCard key={drawing._id} drawing={drawing} />
        ))}
      </div>
    </div>
    );
};

export default AllDrawings;