const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connectDB = require('./db')
const cors = require("cors")
const AuthRouter = require("./routes/AuthRouter")
const ProductRouter = require("./routes/ProductRouter")



dotenv.config()
connectDB()

app.use(express.json()); 
app.use(cors())
app.use("/auth", AuthRouter)
app.use("/products", ProductRouter)


const PORT = process.env.PORT || 8080
app.get("/ping", (req, res)=>{
    res.send("hii zakya u r going good just believe a liitle")
    
})

app.listen(PORT, ()=>{
    console.log(`server is running at 8080`);
    
})
