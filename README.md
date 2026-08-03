# Task Manager Lab

This project is a clean, minimal task management application.

## Design goals

- Interface is simple, readable, and intentionally structured.
- Separate presentation from application logic.
- Use a clear component-based architecture.
- Demonstrate a maintainable approach to state, validation, and repository access.

## Project structure

- Components are responsible for UI rendering.
- Business rules live in the service layer.
- Validation is handled in the input validation module.
- Data access and persistence are isolated in the repository layer.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the application.
