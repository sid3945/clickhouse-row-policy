CREATE TABLE databaseName.tableName
(
    `event_id` String,
    `event_name` String,
    `event_timestamp` DateTime,
    `user_id` String,
    `sales_amout` String,
    INDEX idx_user_id user_id TYPE set(0) GRANULARITY 4
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(event_timestamp)
ORDER BY (event_timestamp, event_id)
SETTINGS index_granularity = 8192