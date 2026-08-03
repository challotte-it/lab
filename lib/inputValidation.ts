export function validateTitle(title: string): boolean {
  return title.trim().length > 0;
}

export function validateDueDate(date: Date | string): boolean {
  if (date instanceof Date) {
    return !Number.isNaN(date.getTime());
  }

  if (typeof date === 'string') {
    return date.trim().length > 0 && !Number.isNaN(new Date(date).getTime());
  }

  return false;
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
  dueDate: Date | string;
}): boolean {
  return (
    validateTitle(task.title) &&
    validateTopic(task.topic) &&
    validateDescription(task.description ?? '') &&
    validateDueDate(task.dueDate)
  );
}

