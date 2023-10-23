const express = require('express')
const app = express()
const tasks = require('./routes/task.route')
const connectDB = require('./DB/connect')
require('dotenv').config()
const notFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler.js')


app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks',tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

port = process.env.PORT || 4000 
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}...`)
        })
    }catch(error){
        console.log(`ERROR: ${error} `)
    }
}

start()