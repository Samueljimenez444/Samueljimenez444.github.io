class Task {
    constructor(name, description, date, priority, status = false) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.status = status;
    }

    toggleStatus() {
        this.status = !this.status;
    }

    getTaskName() {
        return this.name;
    }

    getTaskDescription() {
        return this.description;
    }

    getTaskDate() {
        return this.date;
    }

    getTaskPriority() {
        return this.priority;
    }

    getTaskStatus() {
        return this.status ? 'Completed' : 'Pending';
    }
}