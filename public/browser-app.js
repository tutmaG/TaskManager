const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
const btnForm = document.querySelector('.form-btn')


// show all task
const showTasks = async() =>{
    try{
        const {data : {tasks}} = await axios.get('api/v1/tasks')
        if (tasks.length < 1) {
            tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
            loadingDOM.style.visibility = 'hidden'
            return
        }
        const allTasks = tasks.map((task)=>{
            const { completed, _id: taskID, name } = task
            return ` <div class="single-task ${completed && 'task-completed'}">
                        <h5 class="black"><span><i class="far fa-check-circle"></i> </span><p>${name}</p></h5>
                        <div class="task-links">
                            <a href="task.html?id=${taskID}" class="edit-link"><i class="fas fa-edit"></i></a>
                            <button type="button" class="delete-btn" data-id="${taskID}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>`
        }).join('')
        tasksDOM.innerHTML= allTasks
    }catch(error){
        console.log(`ERROR: ${error}`)
        tasksDOM.innerHTML ='<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
    
}
showTasks()

// delate task
tasksDOM.addEventListener('click',async (e) =>{
    loadingDOM.style.visibility = "visible"
    const el = e.target
    if(el.parentElement.classList.contains('delete-btn')){
        const id = el.parentElement.dataset.id
        try{
            await axios.delete(`/api/v1/tasks/${id}`)
            showTasks()
        }catch(error){
            console.log(error)
        }
    }
    loadingDOM.style.visibility = "hidden"
})

// creat task
btnForm.addEventListener('click',async (e) =>{
    e.preventDefault()
    const name = taskInputDOM.value
    try{
        await axios.post('/api/v1/tasks', { name })
        showTasks()
        taskInputDOM.value = ''
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML= `success, task added`
        formAlertDOM.classList.add("text-success")
    }catch(error){
        formAlertDOM.innerHTML = `error, please try again`
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
      }, 500)
})
