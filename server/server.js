require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db.js')
const authRoutes = require('./routes/authRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const habitRoutes = require("./routes/habitRoutes.js")
const quoteRoutes = require("./routes/quoteRoutes.js")
const meditationRoutes = require("./routes/meditationRoutes.js")
const feedSoundRoutes = require("./routes/feedSoundRoutes.js")
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js')

// connection to database
connectDB()

const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("MankoSathi is running....")
})
// Routes
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
// Routes that handle the habit 
app.use('/api/habits',habitRoutes)
//Routes that handle the quote
app.use('/api/quotes',quoteRoutes)
// Routes that handle the meditation-session
app.use('/api/meditation',meditationRoutes)
// Routes to feed the background music
app.use('/api/background',feedSoundRoutes)
// Error handling
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})