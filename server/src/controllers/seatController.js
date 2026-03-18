import pool from '../config/db.js'

// GET all seats
export const getAllSeats = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM seats ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// POST book a seat
export const bookSeat = async (req, res) => {
  const { seat_id, name, gender, phone } = req.body
  try {
    // Check if already booked
    const check = await pool.query(
      'SELECT * FROM seats WHERE id = $1 AND booked = true',
      [seat_id]
    )
    if (check.rows.length > 0) {
      return res.status(400).json({ error: 'Seat already booked' })
    }

    // Book it
    await pool.query(
      `UPDATE seats SET booked = true, passenger_name = $1, 
       gender = $2, phone = $3 WHERE id = $4`,
      [name, gender, phone, seat_id]
    )
    res.json({ message: 'Seat booked successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET one booked seat details
export const getBookedSeat = async (req, res) => {
  const { seatId } = req.params
  try {
    const result = await pool.query(
      'SELECT * FROM seats WHERE id = $1',
      [seatId]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Seat not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}