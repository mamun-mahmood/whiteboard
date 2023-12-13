import { FC, LegacyRef, useContext } from 'react';
import Swal from 'sweetalert2';
import { baseUrl } from '../../config';
import { AppContext } from '@/App';
import { useNavigate } from 'react-router-dom';

interface ToolBarProps {
    titleRef: LegacyRef<HTMLInputElement>;
    setTool: React.Dispatch<React.SetStateAction<string>>;
    saveDrawing: () => void;
    loading?: boolean;
    tool: string;
    drawingId?: string;
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolBar: FC<ToolBarProps> = ({ titleRef, setTool, saveDrawing, tool, loading, drawingId, setLoading }) => {
    const { setDrawings } = useContext(AppContext);
    const tools = ['pen', 'rectangle', 'circle', 'text']
    const navigate = useNavigate();
    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#e53e3e",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading && setLoading(true);
                fetch(`${baseUrl}/drawing/${drawingId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json()).then(_data => {
                    setDrawings((prev: any) => prev.filter((d: any) => d._id !== drawingId))
                    Swal.fire('Deleted!', '', 'success')
                    navigate('/')
                }).catch(err => {
                    console.log(err);
                }
                ).finally(() => {
                    setLoading && setLoading(false);
                })
            }
        });
    }
    return (
        <div className="w-full h-10 bg-slate-400 flex justify-between px-5 items-center"  >
            <div className='flex items-center gap-5'>
                <input ref={titleRef} type="text" defaultValue={`My Drawings`} className='
                 h-8 text-xl font-bold px-5 rounded-md' />
                {drawingId && <button className={`bg-slate-100 text-white p-1.5 rounded-md 
                    hover:bg-[#e53e3e] transition
                    `} onClick={handleDelete
                    } title={"Delete"}>
                    <img className='w-5 h-5' src={`/trash.svg`} alt="trash.svg" />
                </button>}
            </div>
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
            <button disabled={loading} className='text-white  text-2xl hover:opacity-80 transition-opacity font-bold' onClick={saveDrawing}>Save</button>
        </div>
    );
};

export default ToolBar;