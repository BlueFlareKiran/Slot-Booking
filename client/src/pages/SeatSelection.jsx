import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SeatSelection() {
  const [seats, setSeats] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/seats`)
      .then(res => res.json())
      .then(data => {
        setSeats(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch seats:', err)
        setLoading(false)
      })
  }, [])

  const handleBook = () => {
    if (!selected) return
    navigate('/book', { state: { seat: selected } })
  }

  const handleSelect = (seat) => {
    if (seat.booked) return
    setSelected(prev => prev?.id === seat.id ? null : seat)
  }

  const rows = []
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4))
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Loading seats...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">

        {/* Bus info card */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <h2 className="text-lg font-bold text-gray-800">Bus 1</h2>
          <p className="text-sm text-gray-500">Mumbai → Pune · 08:00 AM · March 19, 2026</p>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-green-200 border border-green-500 inline-block" />
            Available
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-200 border border-red-400 inline-block" />
            Booked
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-blue-200 border border-blue-500 inline-block" />
            Selected
          </span>
        </div>

        {/* Bus Layout */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">

          {/* Driver area */}
          <div className="flex justify-end mb-4 pb-3 border-b border-dashed border-gray-200">
            <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-xs text-gray-500 font-medium">
              🧑‍✈️ Driver
            </div>
          </div>

          {/* Seat rows */}
          <div className="flex flex-col gap-2">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-2">

                {/* Row number */}
                <span className="text-xs text-gray-300 w-4 text-right">{rowIndex + 1}</span>

                {/* Left 2 seats */}
                <div className="flex gap-2">
                  {row.slice(0, 2).map(seat => (
                    <SeatButton
                      key={seat.id}
                      seat={seat}
                      selected={selected?.id === seat.id}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>

                {/* Aisle */}
                <div className="flex-1" />

                {/* Right 2 seats */}
                <div className="flex gap-2">
                  {row.slice(2, 4).map(seat => (
                    <SeatButton
                      key={seat.id}
                      seat={seat}
                      selected={selected?.id === seat.id}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected seat info */}
        <div className="bg-white rounded-2xl shadow p-4 mb-4 text-sm text-gray-600">
          {selected
            ? <span>Seat <strong>{selected.label}</strong> selected</span>
            : <span className="text-gray-400">No seat selected — tap a green seat</span>
          }
        </div>

        {/* Book button */}
        <button
          disabled={!selected}
          onClick={handleBook}
          className={`w-full py-3 rounded-xl font-semibold text-white transition
            ${selected
              ? 'bg-green-700 hover:bg-green-800 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          {selected ? `Book ${selected.label}` : 'Select a Seat to Book'}
        </button>

      </div>
    </div>
  )
}

function SeatButton({ seat, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(seat)}
      disabled={seat.booked}
      className={`w-14 h-14 rounded-lg text-sm font-semibold border transition
        ${seat.booked
          ? 'bg-red-100 border-red-300 text-red-400 cursor-not-allowed'
          : selected
            ? 'bg-blue-200 border-blue-500 text-blue-800'
            : 'bg-green-100 border-green-400 text-green-800 hover:bg-green-200'
        }`}
    >
      {seat.label}
    </button>
  )
}