# Design Documentation

## Overview
The design phase focused on creating a simple task management app with a clean black-and-white interface, clear task states, and a separation between UI, business logic, and data handling.

## Design Approach
The app was structured in a way that keeps the user experience simple while still allowing task operations to be easy to maintain.

### 1. UI structure
- A single page displays the task manager interface.
- A navigation header introduces the app.
- A task form allows users to create and edit tasks.
- Active and archived tasks are shown in separate sections.
- A small sorting control allows tasks to be ordered by due date or title.

### 2. Component separation
- Reusable UI elements such as the form, task cards, badges, and sort controls were placed in the components folder.
- The main page coordinates the state and passes data to the components.

### 3. Business logic separation
- Validation rules were kept in the lib/inputValidation.ts module.
- Task operations such as create, edit, complete, and archive were implemented in lib/taskService.ts.
- Repository functions for storing and retrieving tasks were separated into lib/taskRepository.ts.

### 4. Data model
- Each task contains a title, topic, description, due date, completion state, and archive state.
- Tasks are grouped into active and archived lists.
- Task states are derived from due date and completion status.

### 5. Design decisions
- The interface uses a minimal black-and-white theme to keep the layout clear and readable.
- The app avoids unnecessary complexity so the core workflow is easy to understand.
- The design supports future growth, such as adding restore, filtering, or search features.
