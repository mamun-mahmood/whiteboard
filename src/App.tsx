import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import WhiteBoard from './components/WhiteBoard'
import AllDrawings from './pages/AllDrawings'
import DrawingPage from './pages/DrawingPage'

function App() {
  return (
    <div className=' '>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<AllDrawings />} />
          <Route path='drawing/:drawingId' element={<DrawingPage />} />
          <Route path='new-drawing' element={<WhiteBoard />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
