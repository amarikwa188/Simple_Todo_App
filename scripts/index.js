var taskList = [];
loadTasks();

function markTask(button){
    const task = button.parentElement;
    const taskText = task.childNodes[1];

    if (taskText.style[0] == null){
        taskText.style = "text-decoration: line-through;";
        button.innerHTML = "<i class='bx bxs-checkbox-minus bx-sm'></i>";
    }else{
        taskText.style = null;
        button.innerHTML = "<i class='bx bxs-checkbox-checked bx-sm'></i>";
    }
}

function deleteTask(button){
    const task = button.parentElement;
    const taskParent = task.parentElement;
    taskParent.removeChild(task);
    
    const taskText = task.childNodes[1].innerHTML;
    const index = taskList.indexOf(taskText);
    taskList.splice(index, 1);
    saveTasks();
    
    var isListEmpty = taskParent.querySelector('.list-item') == null;

    if(isListEmpty){
        document.getElementById("no-todos").style = "display: revert";
    }
}

function editTask(button){
    const task = button.parentElement;
    const taskText = task.childNodes[1];
    const currentTask = taskText.innerHTML;

    const newTask = prompt('New Task', currentTask);
    taskText.textContent = (newTask === "") ? currentTask : newTask;
}

function addTask(){
    const taskEntry = document.getElementById("add-task-entry");
    const task = taskEntry.value;

    if(task == ""){
        return;
    }

    renderTask(task);

    taskList.push(task);
    saveTasks();

    taskEntry.value = "";
}

function renderTask(task){
    document.getElementById("no-todos").style = "display: none";

    document.getElementById('list-box').innerHTML +=
    `
    <div class="list-item">
        <p>${task}</p>
        <button class="edit-button"
                onclick="editTask(this)">
            <i class='bx bxs-edit-alt'></i>
        </button>
        <button class="check-button"
                onclick="markTask(this)">
            <i class='bx bxs-checkbox-checked bx-sm'></i>
        </button>
        <button class="delete-button"
                onclick="deleteTask(this)">
            <i class='bx bxs-trash-alt'></i>
        </button>
    </div>
    `;
}

function loadTasks(){
    taskString = localStorage.getItem('taskStr');

    if(taskString === ""){
        // no tasks
        taskList = [];
    }else if (!(taskString.includes('::'))){
        // only one task
        taskList.push(taskString);
    }else{
        // multiple tasks
        taskList = taskString.split('::');
    }

    for(task of taskList){
        renderTask(task);
    }
}

function saveTasks(){
    // store all tasks as one string
    // ex: task1::task2::task3
    taskString = taskList.join('::');
    localStorage.setItem('taskStr', taskString)
}