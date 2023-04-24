const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    title:String,
    is_completed:Boolean
})

const taskModel = mongoose.model("taskModel", taskSchema)
module.exports =taskModel