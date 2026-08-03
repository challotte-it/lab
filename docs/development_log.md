# Project Documentation

## Issue Documentation: GitHub Authentication Failure When Pushing to Repository

### Summary
A Git push to the repository https://github.com/challotte-it/lab.git failed with a 403 permission error. The issue persisted for more than a day before I was able to resolve it.

### Error Observed
When running Git Bash in the project folder and attempting to push changes, the following error was received:

- remote: Permission to challotte-it/lab.git denied to emihleChallotteBooi.
- fatal: unable to access 'https://github.com/challotte-it/lab.git/': The requested URL returned error: 403

### Root Cause
The problem was caused by Git using the wrong GitHub account for authentication. Windows Credential Manager had stored credentials for the account emihleChallotteBooi which is my personal account, but the repository belonged to challotte-it which is my student account. I tried logging in and logging out of my VS Code using my GitHub student account, but that did not solve the problem.

### Fix Applied
The following steps were taken to resolve the issue using Copilot Chat:

1. Verified that Git Bash and Git were functioning correctly.
2. Confirmed that the remote repository URL was:
   - https://github.com/challotte-it/lab.git
3. Located the stored GitHub credential entry in Windows Credential Manager:
   - LegacyGeneric:target=git:https://github.com
4. Removed the incorrect credential entry on PowerShell using this command:
   - cmdkey /delete:"LegacyGeneric:target=git:https://github.com"
5. Retried the push in Git Bash.
6. Git prompted for the correct GitHub credentials, and the push completed successfully.

### Notes
- The issue was not caused by Git itself.
- The issue was not caused by the repository configuration.
- The failure was due to cached authentication data stored in Windows Credential Manager.

### Recommended Follow-Up
- If this happens again, check Windows Credential Manager for outdated or incorrect GitHub credentials.
- Ensure the correct GitHub account is selected when prompted for authentication.
- Keep repository remote URLs and account permissions aligned.

- 
## Database Design
- Designed the database using the `Tasks` and `TaskHistory` tables.
- Chose to store task lifecycle events in `TaskHistory` instead of storing multiple status fields in the `Tasks` table.

---

## Business Logic
- Defined the business rules for task states.
- Separated the application into validation, business logic, and database layers.

---

## Testing
- Selected Vitest as the testing framework.
- Planned unit tests before implementation following a top-down development approach.

---

## Bug Fix: Task Status Filtering
During development, the task filtering feature did not correctly display **Todo** and **Completed** tasks.

To avoid affecting the main branch, a separate feature branch called "status_filter_bug" was created to isolate, investigate, and resolve the issue before merging the fix.

---

## Documentation
- I docu
