const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("FrontEnd"))

mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected")

})
.catch((err) => {

    console.log(err)

})

const taskSchema = new mongoose.Schema({

    date:{
        type:String,
        required:true
    },

    area:{
        type:String,
        required:true
    }

})

const Task = mongoose.model("Task", taskSchema)

app.get("/tasks",async(req,res)=>{

    try{

        const tasks = await Task.find()
        res.json(tasks)

    }

    catch(error){

        res.status(500).json({
            message:error.message
        })

    }

})

app.put("/tasks/:id",async(req,res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id,{
            date:req.body.date,
            area:req.body.area
        },{
            returnDocument:"after"
        })
        res.json(task)
    }
    catch(error){

        res.status(500).json({
            message:error.message
        })

    }

})

app.post("/tasks",async(req,res)=>{

    try{

        const task = new Task({

            date:req.body.date,
            area:req.body.area

        })

        await task.save()
        res.json(task)

    }

    catch(error){

        res.status(500).json({
            message:error.message
        })

    }

})

app.delete("/tasks/:id",async(req,res)=>{

    try{

        await Task.findByIdAndDelete(req.params.id)
        res.json({message:"Deleted Successfully"})

    }

    catch(error){

        res.status(500).json({
            message:error.message
        })

    }

})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{

    console.log(
        `Server Running On Port ${PORT}`
    )

})