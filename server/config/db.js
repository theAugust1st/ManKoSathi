const mongoose = require('mongoose')
async function connectDB(){
    const uri = process.env.URI
    try {
        const connection =await mongoose.connect(uri);
        if(connection) console.log("database connected successfully.")
    } catch (error) {
        console.log("Error",error)
    }
}

module.exports = connectDB;