import express from 'express'
import {
  getAllSeats,
  bookSeat,
  getBookedSeat
} from '../controllers/seatController.js'

const router = express.Router()

router.get('/', getAllSeats)           // GET all seats
router.post('/book', bookSeat)         // POST book a seat
router.get('/:seatId', getBookedSeat)  // GET one booked seat details

export default router