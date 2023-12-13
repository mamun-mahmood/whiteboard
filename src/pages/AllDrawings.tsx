import { AppContext } from '@/App';
import DrawingCard from '@/components/DrawingCard';
import { Drawing } from '@/types/types';
import { useContext } from 'react';


const AllDrawings = () => {
  const { drawings } = useContext(AppContext) as { drawings: Array<Drawing> } || [];
  return (
      <div 
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 '
      >
        {drawings.map((drawing) => (
          <DrawingCard key={drawing._id} drawing={drawing} />
        ))}
      </div>
  );
};

export default AllDrawings;