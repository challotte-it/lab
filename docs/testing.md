# Testing Documentation

### 1. input.validation.test.ts
This file tests the input validation helpers directly.
- It verifies that a non-empty title is accepted.
- It checks that a blank title is rejected.
- It confirms that a valid date passes validation.
- It ensures an invalid date fails validation.
- It tests that a normal topic is accepted and a blank topic is rejected.
- It checks that a valid description passes and an empty description is also accepted.
- It validates a complete task payload and ensures a broken payload fails.

### 2. task.service.create.test.ts
This file focuses on the task creation path in the service layer.
- It confirms that invalid task input returns null.
- It verifies that the repository insert function is not called when validation fails.

### 3. task.service.state.test.ts
This file tests the task state logic in a focused way.
- It verifies that a task due tomorrow is treated as Todo.
- It confirms that a task due several days later is treated as In Progress.
- It checks that completed tasks return the Completed state regardless of due date.
- It verifies that overdue tasks are detected correctly.

### 4. task.service.history.test.ts
This file tests that business actions trigger the correct history events.
- It checks that editing a task records an EDITED event.
- It confirms that completing a task records a COMPLETED event.
- It verifies that archiving a task records an ARCHIVED event.

### 5. task.repository.test.ts
This file tests the repository layer using browser storage.
- It verifies that a task can be inserted and then retrieved successfully.
- It checks that updating a task changes its stored state.
- It confirms that repository data can be read back after an update.

### 6. task.input.types.test.ts
This file checks that the validation logic supports both Date objects and string dates.
- It verifies that a task with a string due date is accepted.
- It confirms that an invalid string date is rejected.

### 7. task.validation.edgecases.test.ts
This file covers edge cases around validation rules.
- It confirms whitespace-only titles are rejected.
- It checks that an empty due date string is rejected.
- It verifies that whitespace-only descriptions are rejected.
- It ensures a task with a blank topic fails validation.


## Running Tests
Run the full test suite with:

```bash
npx vitest run
```