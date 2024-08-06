// Get references to necessary elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterAllBtn = document.getElementById('filterAllBtn');
const filterCompletedBtn = document.getElementById('filterCompletedBtn');
const filterIncompletedBtn = document.getElementById('filterIncompletedBtn');

// Array to hold tasks
let tasks = [];

// Function to create a new task element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.textContent = task.text;

    // Checkbox for marking task as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
        task.completed = checkbox.checked;
        if (task.completed) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        deleteTask(task);
    });

    li.prepend(checkbox); // Add checkbox before the task text
    li.appendChild(deleteBtn);
    if (task.completed) {
        li.classList.add('completed');
        checkbox.checked = true;
    }

    return li;
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = {
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        updateTaskList();
        taskInput.value = ''; // Clear the input field
    } else {
        alert('Please enter a task!');
    }
}

// Function to delete a task
function deleteTask(taskToDelete) {
    tasks = tasks.filter(task => task !== taskToDelete);
    updateTaskList();
}

// Function to update the task list display
function updateTaskList() {
    taskList.innerHTML = ''; // Clear the current task list
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

// Function to filter tasks
function filterTasks(filter) {
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') {
            return task.completed;
        } else if (filter === 'incomplete') {
            return !task.completed;
        }
        return true; // For 'all'
    });
    taskList.innerHTML = ''; // Clear the current task list
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
filterAllBtn.addEventListener('click', () => filterTasks('all'));
filterCompletedBtn.addEventListener('click', () => filterTasks('completed'));
filterIncompletedBtn.addEventListener('click', () => filterTasks('incomplete'));

// Load tasks on page load (if you want to persist tasks, implement localStorage)
window.addEventListener('load', updateTaskList);
