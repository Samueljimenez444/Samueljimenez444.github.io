const model = new Model();
const view = new View();

view.setToggleHandler((index) => {
    model.toggleTask(index);
    view.render(model.getTasks());
});

view.setDeleteHandler((index) => {
    model.deleteTask(index);
    view.render(model.getTasks());
});

document.getElementById('addTaskButton').onclick = () => {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = taskInput.value.trim();
    if (taskDescription) {
        const taskData = {
            name: taskDescription,
            description: "Task description", 
            date: new Date().toLocaleDateString(),
            priority: "Normal" 
        };
        model.addTask(taskData);
        taskInput.value = ""; 
        view.render(model.getTasks());
    }
}