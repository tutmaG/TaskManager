const Task = require('../models/task.mod')
const asyncWrapper = require('../middleware/async.js')
const {createCustomError } = require('../errors/custom-error.js')


const getAllTasks = asyncWrapper(async (req,res,next)=>{
        const tasks = await Task.find({})
        res.status(200).json({nbHits:tasks.length,tasks})
})

const createTask = asyncWrapper(async (req,res,next)=>{
    const task = await Task.create(req.body)
    res.status(201).json({data:task})
})

const getSingleTask = asyncWrapper(async (req,res,next)=>{
    const task = await Task.findOne({_id:req.params.id})
    if(!task){
        return next(createCustomError(`No task with id : ${req.params.id}`,404))
    }
    res.status(200).json({data:task})
})


const DelateTask = asyncWrapper(async (req,res,next)=>{
    const task = await Task.findOneAndDelete({_id:req.params.id})
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
      }
    res.status(200).json({data:task,status:"delated"})
})

const updateTask = asyncWrapper(async (req,res,next)=>{
    const task = await Task.findOneAndUpdate({_id:req.params.id},req.body,{
        new:true,
        runValidators:true,
    })
    if(!task){
        return next(createCustomError(`No task with id : ${req.params.id}`,404))
    }
    res.status(200).json({data:task})
})


module.exports = {getAllTasks, getSingleTask,createTask,updateTask,DelateTask};