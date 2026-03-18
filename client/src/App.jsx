import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SeatSelection from './pages/SeatSelection'
import BookingForm from './pages/BookingForm'
import Navbar from './Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SeatSelection />} />
        <Route path="/book" element={<BookingForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App