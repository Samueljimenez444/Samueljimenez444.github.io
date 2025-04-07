class Model {
    constructor() {
        this.tasks = [];
    }

    addTask(description) {
        const task = new Task(description.name, description.description, description.date, description.priority);
        this.tasks.push(task);
    }

    toggleTask(index) {
        if (this.tasks[index]) {
            this.tasks[index].toggleStatus();
        }
    }

    deleteTask(index) {
        if (this.tasks[index]) {
            this.tasks.splice(index, 1);
        }
    }

    getTasks() {
        return this.tasks;
    }
}