export function validateTitle(title: string): boolean {
    return title.trim().length > 0;
}

export function validateDueDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
}

export function validateTopic(topic: string): boolean {
    return topic.trim().length > 0;
}

export function validateDescription(description: string): boolean {
    return description === '' || description.trim().length > 0;
}

export function validateTask(task: {
    title: string;
    topic: string;
    description?: string;
    dueDate: Date;
}): boolean {
    return validateTitle(task.title)
        && validateTopic(task.topic)
        && validateDescription(task.description ?? '')
        && validateDueDate(task.dueDate);
}

