import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import WhiteBoard from './pages/WhiteBoard'
import AllDrawings from './pages/AllDrawings'
import DrawingPage from './pages/DrawingPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className=' '>
      <BrowserRouter basename='/'>
        <Navbar />
        <div className='max-w-screen-2xl' >
          <Routes>
            <Route path='/' element={<AllDrawings />} />
            <Route path='drawing/:drawingId' element={<DrawingPage />} />
            <Route path='new-drawing' element={<WhiteBoard />} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
