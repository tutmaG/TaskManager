const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')

const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName


const showTask = async () => {
    try {
        const response = await axios.get(`/api/v1/tasks/${id}`)
        const { _id: taskID, completed, name } = response.data.data
        taskIDDOM.textContent = taskID
        taskNameDOM.value = name
        tempName = name
      if (completed) {
        taskCompletedDOM.checked = true
      }
    } catch (error) {
      console.log(error)
    }
  }
  showTask()

editFormDOM.addEventListener('submit', async (e) =>{
    e.preventDefault()
    editBtnDOM.textContent = 'Loading...'
    try{
        const response = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskNameDOM.value,
            completed: taskCompletedDOM.checked,
        })
        const { _id: taskID, completed, name } = response.data.data
        taskIDDOM.textContent = taskID
        taskNameDOM.value = name
        tempName = name
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, edited task`
        formAlertDOM.classList.add('text-success')
        if (completed) {
            taskCompletedDOM.checked = true
          }
    }catch(error){
        console.log(error)
        taskNameDOM.value = tempName
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }
    editBtnDOM.textContent = 'Edit'
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
    }, 3000)

})