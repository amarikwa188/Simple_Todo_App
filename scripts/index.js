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
    // get the parent .list-item div
    const task = button.parentElement;
    // get the list box
    const taskParent = task.parentElement;
    // remove the list-item from the list box
    taskParent.removeChild(task);
    
    // remove the task from the list and local storage
    const taskText = task.childNodes[1].innerHTML;
    const index = taskList.indexOf(taskText);
    taskList.splice(index, 1);
    saveTasks();
    
    // check whether the list box has no list elements and display 'no current tasks'
    var isListEmpty = taskParent.querySelector('.list-item') == null;

    if(isListEmpty){
        document.getElementById("no-todos").style = "display: revert";
    }
}

function editTask(button){
    // get the parent .list-item div
    const task = button.parentElement;
    // get the paragraph that displays the task
    const taskText = task.childNodes[1];
    // get the current task text
    const currentTask = taskText.innerHTML;

    // get the edited task text from the user
    const newTask = prompt('New Task', currentTask);
    // set the new task text only if it is not empty, else keep the old task
    taskText.textContent = (newTask === "") ? currentTask : newTask;
}

function addTask(){
    // get the task entered in the input field
    const taskEntry = document.getElementById("add-task-entry");
    const task = taskEntry.value;

    //return if the entry field is empty
    if(task == ""){
        return;
    }

    // update the ui with the new task
    renderTask(task);

    // save the task to local storage
    taskList.push(task);
    saveTasks();

    // reset input entry
    taskEntry.value = "";
}

function renderTask(task){
    // clear 'no tasks' message
    document.getElementById("no-todos").style = "display: none";

    // 
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
    // load the string of tasks from local storage
    taskString = localStorage.getItem('taskStr');

    if(taskString === ""){
        // no tasks
        taskList = [];
    }else if (!(taskString.includes('::'))){
        // only one task, add it to the taskList
        taskList.push(taskString);
    }else{
        // multiple tasks, split the string in tasks and 
        // save them in the task list
        taskList = taskString.split('::');
    }

    // aupdate the list box ui with the tasks
    for(task of taskList){
        renderTask(task);
    }
}

function saveTasks(){
    // store all tasks as one string
    // ex: task1::task2::task3
    taskString = taskList.join('::');
    // save the string to local storage
    localStorage.setItem('taskStr', taskString)
}