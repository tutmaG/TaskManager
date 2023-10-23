const express = require('express')
const router = express.Router()

const {
    getAllTasks, 
    getSingleTask,
    createTask,
    updateTask,
    DelateTask,
    } = require('../controllers/task.cont')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getSingleTask).delete(DelateTask).patch(updateTask)

module.exports = router