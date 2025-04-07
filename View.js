class View {
    constructor() {
        this.tasksList = document.querySelector("#taskList");
    }

    render(tasks) {
        console.log(tasks);
        this.tasksList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${task.getTaskName()} - ${task.getTaskDescription()} - ${task.getTaskDate()} - ${task.getTaskPriority()} - ${task.getTaskStatus()}`;
            this.tasksList.appendChild(li);

           
            li.addEventListener("click", () => {
                this.toggleHandler(index);
            });

            
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation(); 
                this.deleteHandler(index);
            });
            li.appendChild(deleteButton);
        });
    }

    setToggleHandler(handler) {
        this.toggleHandler = handler;
    }

    setDeleteHandler(handler) {
        this.deleteHandler = handler;
    }
}