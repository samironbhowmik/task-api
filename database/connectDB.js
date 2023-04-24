const mongoose = require("mongoose")

const connectDB = ()=>{
    mongoose.connect(process.env.MY_DB).then(()=>{
        console.log("Database is connected");
    })
}
module.exports = connectDB