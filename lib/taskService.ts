export enum TaskState {
    IN_PROGRESS,
    TODO,
    OVERDUE,
    COMPLETED
}

export function getTaskState(
    dueDate: Date,
    isCompleted: boolean
): TaskState {

    if (isCompleted) {
        return TaskState.COMPLETED;
    }

    const today = new Date();

    const daysRemaining =
        (dueDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24);

    if (daysRemaining < 0) {
        return TaskState.OVERDUE;
    }

    if (daysRemaining <= 2) {
        return TaskState.TODO;
    }

    return TaskState.IN_PROGRESS;
}





export function createTask() {

}

export function editTask() {

}

export function completeTask() {

}

export function archiveTask() {

}


