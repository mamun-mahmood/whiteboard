import { FC, LegacyRef } from 'react';

interface ToolBarProps {
    titleRef: LegacyRef<HTMLInputElement> ;
    setTool: React.Dispatch<React.SetStateAction<string>>;
    saveDrawing: () => void;
    loading?: boolean;
    tool: string;
}

const ToolBar: FC<ToolBarProps> = ({titleRef, setTool, saveDrawing, tool, loading}) => {
    const tools = ['pen', 'rectangle', 'circle']
  return (
    <div className="w-full h-10 bg-slate-400 flex justify-between px-5 items-center"  >
                <input ref={titleRef} type="text" defaultValue={`My Drawings`} className='
                 h-8 text-xl font-bold px-5 rounded-md' />
                {/* tool buttons */}
                <div className='flex gap-10'>
                    {tools.map((t: string) => <button className={`bg-slate-100 text-white p-1.5 rounded-md ${tool === t ? 'opacity-50' : 'opacity-100'} 
                    hover:opacity-80 transition
                    `} onClick={
                        () => setTool(t)
                    } key={t} title={t}>
                        <img className='w-5 h-5' src={`/${t}.svg`} alt="pen.svg" />
                    </button>)}
                </div>
                <button disabled={loading} className='text-white  text-lg hover:font-bold transition' onClick={saveDrawing}>
                    {loading ? 'Saving...' : 'Save     '}
                </button>
            </div>
  );
};

export default ToolBar;