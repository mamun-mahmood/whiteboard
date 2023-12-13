import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-20 bg-slate-600 text-white flex justify-between items-center px-5
    
    '>
            <h1 className='text-3xl font-bold cursor-pointer hover:opacity-80 transition-opacity' onClick={() => navigate("/")}>WhiteBoard</h1>
            <div className='flex gap-10 pr-10 '>
                <button className='hover:opacity-80 transition-opacity' onClick={() => navigate("/")}>Home</button><button className='hover:opacity-80 transition-opacity' onClick={() => navigate("/new-drawing")}>New Drawing</button>
            </div>
        </div>
    );
};

export default Navbar;