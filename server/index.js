import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import seatRoutes from './src/routes/seats.js'

dotenv.config()

const app = express()
app.use(cors({
  origin: ['http://localhost:5173', 'https://bus-slot.netlify.app'],
  methods: ['GET', 'POST'],
}))
app.use(express.json())

app.use('/api/seats', seatRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))