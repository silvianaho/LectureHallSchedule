# SQL Statements

For this worksheet you will need to provide an example of your own SQL statement. The two given are examples.

## INSERT

Example:
```sql
INSERT INTO 
  lectures (lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime)
VALUES 
  (1999922213, 1234567890, 1234567890, 4, '1200', '1330')
RETURNING 
  lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime
```

## SELECT All with Pagination

Example:
```sql
SELECT * FROM lectures LIMIT 10 OFFSET 0;
```

## SELECT Total Count

Example:
```sql
SELECT COUNT(*) FROM lectures LIMIT 10 OFFSET 0;
```

## SELECT with Filtering and Pagination

Example:
```sql
SELECT * FROM lectures WHERE facultyid = 1234567890 AND semesterid = 1234567890 AND dayOfWeek= 3 LIMIT 10 OFFSET 0;
```

## Select unique facultyid

Example:
```sql
SELECT
  DISTINCT facultyid
FROM
  lectures
GROUP BY facultyid;`;
```

## Select unique semesterid


Example:
```sql
SELECT
  DISTINCT semesterid
FROM
  lectures
GROUP BY semesterid;`;
```
