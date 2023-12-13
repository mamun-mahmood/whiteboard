import { AppContext } from '@/App';
import DrawingCard from '@/components/DrawingCard';
import { Drawing } from '@/types/types';
import { useContext } from 'react';


const AllDrawings = () => {
  const { drawings } = useContext(AppContext) as { drawings: Array<Drawing> } || [];
  return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {drawings.map((drawing) => (
          <DrawingCard key={drawing._id} drawing={drawing} />
        ))}
      </div>
  );
};

export default AllDrawings;