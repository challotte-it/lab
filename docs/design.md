# Design Documentation

## Design Approach
The application was structured to be easy to understand, easy to extend, and consistent with common layered architecture principles.

### 1. UI structure
- A single-page layout presents the task manager clearly.
- A minimal header introduces the app and its purpose.
- A task form supports creating and editing entries.
- Active and archived tasks are separated into distinct sections.
- Sorting controls allow users to view tasks in a structured way.

### 2. Component separation
- Reusable UI elements such as the form, task cards, badges, and sort controls are placed in the components folder.
- The main page coordinates state and passes data to the components in a controlled way.

### 3. Business logic separation
- Validation rules are kept in the input validation module.
- Task operations such as create, edit, complete, and archive are handled in the service layer.
- Persistence and data access are isolated in the repository layer.

### 4. Data model
- Each task contains a title, topic, description, due date, completion state, and archive state.
- Task states are derived from due date and completion status.
- The structure reflects a clear domain model rather than ad-hoc UI state.

### 5. Design decisions
- The interface uses a minimal black-and-white theme for clarity and readability.
- The app avoids unnecessary complexity so the core workflow is easy to follow.
- The implementation emphasizes maintainability, separation of concerns, and a clean software-design mindset.
