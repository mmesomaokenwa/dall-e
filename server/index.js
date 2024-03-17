import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDB from './mongodb/connect.js'

import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config()

const url = process.env.MONGODB_URL;
const encondedPassword = encodeURIComponent(process.env.MONGODB_PASSWORD);
const urlWithEncodedPassword = url.replace("<password>", encondedPassword);

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb'})) // to support JSON-encoded bodies

// Routes
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const startServer = async () => {
  try {
    connectDB(urlWithEncodedPassword)
    app.listen(process.env.PORT, () => console.log(`Server is running on port http://localhost:${process.env.PORT}`))
  } catch (error) {
    console.log(error)
  }
}

startServer()