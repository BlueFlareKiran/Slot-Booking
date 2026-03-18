import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function BookingForm() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const seat = state?.seat

  const [form, setForm] = useState({
    name: '',
    gender: '',
    phone: '',
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.gender) e.gender = 'Please select gender'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    return e
  }

  const handleConfirm = async () => {
  const e = validate()
  if (Object.keys(e).length) { setErrors(e); return }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}api/seats/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        seat_id: seat.id,
        name: form.name,
        gender: form.gender,
        phone: form.phone,
      })
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    alert(`Seat ${seat?.label} booked for ${form.name}!`)
    navigate('/')
  } catch (err) {
    alert('Something went wrong. Try again.')
  }
}

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">

        {/* Trip summary */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Trip Details</p>
          <p className="text-gray-800 font-semibold">Bus 1 — Mumbai → Pune</p>
          <p className="text-sm text-gray-500">08:00 AM · March 19, 2026</p>
          <div className="mt-3 inline-block bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold px-3 py-1 rounded-lg">
            Seat {seat?.label}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-4">Passenger Details</p>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Ananya Desai"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              value={form.gender}
              onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="e.g. 98765 43210"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50"
          >
            ← Back
          </button>
          <button
            onClick={handleConfirm}
            className="flex-2 w-full py-3 rounded-xl bg-green-700 text-white text-sm font-semibold hover:bg-green-800"
          >
            Confirm Booking
          </button>
        </div>

      </div>
    </div>
  )
}
