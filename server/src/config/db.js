import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

pool.connect((err) => {
  if (err) {
    console.error('DB connection error:', err.message)
  } else {
    console.log('DB connected successfully!')
  }
})

export default pool