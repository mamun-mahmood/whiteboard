import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    // Define your component props here
}

const Navbar: FC<NavbarProps> = (props) => {
    const navigate = useNavigate()
    return (
        <div className='w-full h-20 bg-slate-600 text-white flex justify-between items-center px-5
    
    '>
            <h1 className='text-3xl font-bold'>WhiteBoard</h1>
            <div className='flex gap-10 pr-10 '>
                <button onClick={() => navigate("/")}>Home</button><button onClick={() => navigate("/new-drawing")}>New Drawing</button>
            </div>
        </div>
    );
};

export default Navbar;