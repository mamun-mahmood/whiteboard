import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import WhiteBoard from './pages/WhiteBoard'
import AllDrawings from './pages/AllDrawings'
import DrawingPage from './pages/DrawingPage'
import Navbar from './components/Navbar'
import { createContext, useEffect, useState } from 'react'
import { Drawing } from './types/types'
import { baseUrl } from '../config';
export const AppContext = createContext<any>(null)
function App() {
  const [drawings, setDrawings] = useState<Array<Drawing>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  { loading && <div className="loader" /> }
  useEffect(() => {
    // fetch drawings
    const fetchDrawings = async () => {
      setLoading(true);
      const res = await fetch(`${baseUrl}/drawings`);
      const data = await res.json();
      setDrawings(data?.data);
      setLoading(false);
    }
    fetchDrawings();
  }, []);
  return (
    <AppContext.Provider value={{
      drawings,
      setDrawings
    }}>
      <BrowserRouter basename='/'>
        <Navbar />
        {loading && <div className="loader" />}
        <div className='' >
          <Routes>
            <Route path='/' element={<AllDrawings />} />
            <Route path='drawing/:drawingId' element={<DrawingPage />} />
            <Route path='new-drawing' element={<WhiteBoard />} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
