-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROJECTS
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_project_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- QUEUES
CREATE TABLE queues (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    priority INTEGER DEFAULT 1,
    concurrency_limit INTEGER DEFAULT 5,
    is_paused BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_queue_project
        FOREIGN KEY(project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);

-- WORKERS
CREATE TABLE workers (
    id SERIAL PRIMARY KEY,
    worker_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    last_heartbeat TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- JOBS
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    queue_id INTEGER NOT NULL,

    name VARCHAR(255) NOT NULL,

    payload JSONB,

    status VARCHAR(50) DEFAULT 'QUEUED',

    scheduled_at TIMESTAMP NULL,

    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,

    retry_strategy VARCHAR(50) DEFAULT 'FIXED',

    claimed_by_worker INTEGER NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_job_queue
        FOREIGN KEY(queue_id)
        REFERENCES queues(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_job_worker
        FOREIGN KEY(claimed_by_worker)
        REFERENCES workers(id)
);

-- JOB EXECUTIONS
CREATE TABLE job_executions (
    id SERIAL PRIMARY KEY,

    job_id INTEGER NOT NULL,

    worker_id INTEGER NOT NULL,

    started_at TIMESTAMP,

    completed_at TIMESTAMP,

    execution_status VARCHAR(50),

    error_message TEXT,

    CONSTRAINT fk_execution_job
        FOREIGN KEY(job_id)
        REFERENCES jobs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_execution_worker
        FOREIGN KEY(worker_id)
        REFERENCES workers(id)
        ON DELETE CASCADE
);

-- JOB LOGS
CREATE TABLE job_logs (
    id SERIAL PRIMARY KEY,

    job_id INTEGER NOT NULL,

    log_message TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_log_job
        FOREIGN KEY(job_id)
        REFERENCES jobs(id)
        ON DELETE CASCADE
);

-- DEAD LETTER QUEUE
CREATE TABLE dead_letter_queue (
    id SERIAL PRIMARY KEY,

    job_id INTEGER UNIQUE,

    failure_reason TEXT,

    failed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_dlq_job
        FOREIGN KEY(job_id)
        REFERENCES jobs(id)
        ON DELETE CASCADE
);

-- INDEXES

CREATE INDEX idx_jobs_status
ON jobs(status);

CREATE INDEX idx_jobs_scheduled_at
ON jobs(scheduled_at);

CREATE INDEX idx_jobs_queue
ON jobs(queue_id);

CREATE INDEX idx_worker_heartbeat
ON workers(last_heartbeat);