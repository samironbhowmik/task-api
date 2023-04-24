const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./database/connectDB")
const route = require("./route/route")

const app = express()
dotenv.config()
app.use(express.json())

app.use("/", route)

app.listen(process.env.PORT, async(req,res)=>{
    await connectDB()
    console.log(`App is connected at ${process.env.PORT} port`);
})