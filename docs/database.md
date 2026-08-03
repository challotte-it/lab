# Database Documentation

## Tables

### Tasks
Stores the permanent information for each task.

| Field |
|-------|
| id |
| title |
| topic |
| description |
| due_date |

### TaskHistory
Stores significant events in a task's lifecycle.

| Field |
|-------|
| task_history_id |
| id |
| event |
| event_time |

Possible events:
- CREATED
- EDITED
- COMPLETED
- ARCHIVED

## Design Decisions

- Each task exists only once in the `Tasks` table.
- `TaskHistory` records user actions after the task had been created the first time
- The decision to store task history events was influenced by the need to maintain historical records in order to support future analytics, and avoid duplicating tasks across multiple tables.

## Task States

The following states are **not stored** in the database. They are calculated when the application displays tasks.

| State | Rule |
|--------|------|
| In Progress | More than 2 days before the due date. |
| Todo | Due within the next 2 days. |
| Overdue | Current date is after the due date. Displayed with a red highlight and warning. |

## Completed Tasks

Completion is stored as a `COMPLETED` event in `TaskHistory` because it cannot be derived from the due date.

This allows the application to distinguish between:
- tasks completed before the deadline and tasks that simply became overdue.