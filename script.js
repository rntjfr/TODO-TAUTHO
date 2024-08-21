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
        removeButton.onclick = async function () {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });
            if (result.isConfirmed) {
                taskList.removeChild(li);
                // If removing the current edit task, reset edit mode
                if (currentEditTask === taskSpan) {
                    taskInput.value = '';
                    addTaskButton.textContent = 'Add Task';
                    currentEditTask = null;
                }
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                );
            }
        };

        li.appendChild(taskSpan);
        li.appendChild(editButton);
        li.appendChild(removeButton);

        return li;
    }

    async function addTaskHandler() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            if (currentEditTask) {
                // Confirm update action
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: "You want to update this task?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, update it!'
                });
                if (result.isConfirmed) {
                    // Update the existing task
                    currentEditTask.textContent = taskText;
                    taskInput.value = '';
                    addTaskButton.textContent = 'Add Task';
                    currentEditTask = null; // Reset the current edit task
                    Swal.fire(
                        'Updated!',
                        'Your task has been updated.',
                        'success'
                    );
                }
            } else {
                // Confirm add action
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: "You want to add this task?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, add it!'
                });
                if (result.isConfirmed) {
                    // Add a new task
                    const taskItem = createTaskItem(taskText);
                    taskList.appendChild(taskItem);
                    taskInput.value = '';
                    Swal.fire(
                        'Added!',
                        'Your task has been added.',
                        'success'
                    );
                }
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
