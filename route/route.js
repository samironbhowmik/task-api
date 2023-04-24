const taskModel = require("../model/task")

const route = require("express").Router()

//Test Case 1 - Create a new Task
route.post("/v1/tasks", async(req,res)=>{
    try {
        const {title, is_completed} = req.body
        const task = await taskModel.create({
            title:title,
            is_completed:is_completed
        })
        res.status(201).json({
            status:"success",
            task
        })
    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})


// Test Case 2 - List all tasks created
route.get("/v1/tasks", async(req,res)=>{
    try {
        const {id} = req.body
        const task = await taskModel.find({id:id})
        res.status(200).json({
            status:"success",
            task
        })
    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

// Test Case 3 - Get a specific task
route.get("/v1/tasks/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const task = await taskModel.findById(id)
        
        res.status(200).json({
            status:"success",
            task
        })
    } catch (error) {
        res.status(404).json({
            status:"failed",
            error:"There is no task at that id"
        })
    }
})

// Test Case 4- Delete a specific task
route.delete("/v1/tasks/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const task = await taskModel.findByIdAndDelete(id)

        res.status(204).json({
            staus:"success"
        })
    } catch (error) {
        res.status(204).json({
            status:"failed",
            message:error.message
        })
    }
})

// Test Case 5 - Edit the title or completion of a specific task
route.put("/v1/tasks/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const {title, is_completed} = req.body
        const edit = {
            title:title,
            is_completed:is_completed
        }
        const task = await taskModel.findByIdAndUpdate(id, edit, {new:true})
        res.status(200).json({
            status:"success",
            task
        })
    } catch (error) {
        res.status(404).json({
            status:"failed",
            error:"There is no task at that id"
        })
    }
})

// Test Case 6 - Bulk add tasks
route.post("/v1/tasks", async(req,res)=>{
    try {
        const tasks = req.body
        const bulkAddTasks = await taskModel.create(tasks, {insertMany:true})

        res.status(201).json({
            status:"success",
            bulkAddTasks
        })
    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

// Test Case 7 - Bulk delete tasks
route.delete("/v1/tasks", async(req,res)=>{
    try {
        const {id} = req.body
        const deleteTasks = await taskModel.deleteMany({
            _id: {$in:id}
        })
        res.status(204).json({
            status:"success"
        })
    } catch (error) {
        res.status(204).json({
            status:"failed",
            message:error.message
        })
    }
})

module.exports = route