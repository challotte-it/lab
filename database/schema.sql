CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    topic TEXT NOT NULL,
    description TEXT,
    due_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS task_history (
    task_history_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    event TEXT NOT NULL CHECK (
        event IN (
            'CREATED',
            'EDITED',
            'COMPLETED',
            'ARCHIVED',
            'RESTORED'
        )
    ),
    event_time DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (task_id)
        REFERENCES tasks(id)
        ON DELETE CASCADE
);