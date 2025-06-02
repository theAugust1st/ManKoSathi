require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db.js')
const authRoutes = require('./routes/userAuth.js')

// connection to database
connectDB()

const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("MankoSathi is running....")
})

// Routes
app.use('/api/auth',authRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})