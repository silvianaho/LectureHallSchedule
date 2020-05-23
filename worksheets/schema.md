# Schema

This document will gives user a good idea of how your database's structure looks like.

You may refer to the following link to learn more about postgresql schema:

1. [CREATE statements](https://www.postgresqltutorial.com/postgresql-create-table/)
2. [Foreign Keys](https://www.postgresqltutorial.com/postgresql-foreign-key/)

The following are examples of how you can create a table, replace the examples with your own create statements of all your table.
```sql
CREATE TABLE IF NOT EXISTS lectures(
   lectureId BIGINT PRIMARY KEY,
   facultyId BIGINT NOT NULL,
   semesterId BIGINT NOT NULL,
   dayOfWeek SMALLINT NOT NULL,
   startTime TIME WITHOUT TIME ZONE NOT NULL,
   endTime TIME WITHOUT TIME ZONE NOT NULL
)

CREATE TABLE IF NOT EXISTS technicians(
   technicianId BIGINT PRIMARY KEY,
   facultyId BIGINT NOT NULL,
   semesterId BIGINT NOT NULL,
   dayOfWeek SMALLINTNOT NULL,
   startTime TIME[MINUTE][WITHOUT TIME ZONE] NOT NULL,
   endTime TIME[MINUTE][WITHOUT TIME ZONE] NOT NULL
)
```
