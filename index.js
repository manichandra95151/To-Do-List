window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    const filterOptions = document.querySelectorAll('input[name="filter"]');
	const totalTasksParagraph = document.getElementById('total-tasks-paragraph');


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        if (task == "") {
            alert("Enter a task");
            return;
        }

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_checkbox = document.createElement('input');
        task_checkbox.type = 'checkbox';
        task_checkbox.classList.add('checkbox');
        task_content_el.appendChild(task_checkbox);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = '';

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);
            updateCounts();
        });

        // Update count
        updateCounts();
    });

    // Filter tasks based on selected option
    filterOptions.forEach(option => {
        option.addEventListener('change', () => {
            const filterValue = option.value;
            const tasks = document.querySelectorAll('.task');
            tasks.forEach(task => {
                const isChecked = task.querySelector('.checkbox').checked;
                if (filterValue === 'all' ||
                    (filterValue === 'completed' && isChecked) ||
                    (filterValue === 'uncompleted' && !isChecked)) {
                    task.style.display = 'flex';
					
                } else {
                    task.style.display = 'none';
					
                }
            });
        });
    });

    // Initial count
    updateCounts();

    // Function to update count
    function updateCounts() {
        document.getElementById('total-tasks').textContent = list_el.querySelectorAll('.task').length;
    }
});
