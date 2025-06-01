const experss = require('express')
const app = experss();

const Port = 3000;
app.get('/',(req,res)=>{
    res.send("This is the home page")
})
app.listen(Port,()=>{
    console.log(`http://localhost:${Port}`);
    console.log("Server is running in the ..... ")
})