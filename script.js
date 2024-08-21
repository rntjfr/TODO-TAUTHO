document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let currentEditTask = null; // To keep track of the task being edited

    function createTaskItem(taskText) {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.className = 'task-text';
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button';
        editButton.onclick = function () {
            // Switch to edit mode
            taskInput.value = taskSpan.textContent;
            addTaskButton.textContent = 'Update Task';
            currentEditTask = taskSpan; // Set the task being edited
        };

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.onclick = function () {
            taskList.removeChild(li);
            // If removing the current edit task, reset edit mode
            if (currentEditTask === taskSpan) {
                taskInput.value = '';
                addTaskButton.textContent = 'Add Task';
                currentEditTask = null;
            }
        };

        li.appendChild(taskSpan);
        li.appendChild(editButton);
        li.appendChild(removeButton);

        return li;
    }

    function addTaskHandler() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            if (currentEditTask) {
                // Update the existing task
                currentEditTask.textContent = taskText;
                taskInput.value = '';
                addTaskButton.textContent = 'Add Task';
                currentEditTask = null; // Reset the current edit task
            } else {
                // Add a new task
                const taskItem = createTaskItem(taskText);
                taskList.appendChild(taskItem);
                taskInput.value = '';
            }
        }
    }

    // Add task or update task on button click
    addTaskButton.addEventListener('click', addTaskHandler);

    // Add task or update task on Enter key press
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });
});
