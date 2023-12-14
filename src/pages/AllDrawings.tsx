import { AppContext } from '@/App';
import DrawingCard from '@/components/DrawingCard';
import { Drawing } from '@/types/types';
import { useContext } from 'react';


const AllDrawings = () => {
  const { drawings } = useContext(AppContext) as { drawings: Array<Drawing> } || [];
  if (!drawings?.length) {
    return <div className='flex flex-col justify-center items-center mt-[10%]' >
      <img className='w-[200px]' src="/whiteboard.svg" alt="" />
      <h1 className='text-3xl font-bold text-center'>No drawings found</h1>
    </div>
  }
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