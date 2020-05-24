# API Documentation

This document allows you to define your API schema.

Each API should include

1. HTTP Method
2. Endpoint
3. Request body/Parameters
4. Response body
5. Error Body
6. Sample Request
7. Sample Response
8. Sample Error

> Errors and it's corresponding code can be defined by yourself. You need not follow HTTP errors.

## Get Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/data |

### Parameters

| parameter  | datatype       | example   | optional  | default |
| ---------- | -------------- | --------- | --------- | ------- |
| lectureId  | BIGINT         | 123456789 | Yes       |         |
| facultyId  | BIGINT         | 123456789 | Yes       |         |
| semesterId | BIGINT         | 123456789 | Yes       |         |
| dayOfWeek  | SMALLINT (1-7) | 1         | Yes       |         |
| pageSize   | INT            | 2         | Yes       | 10      |
| page       | INT            | 2         | Yes       | 0       |

### Response Body

```json
[
  {
    "lectureId": number,
    "facultyId": number,
    "semesterId": number,
    "dayOfWeek": number,
    "pageSize": number,
    "page": number
  }
]
```

### Error

```json
{
  "error": string,
  "code": number
}
```

### Sample Request

```http
GET /basic/data?dayOfWeek=7
```

### Sample Response

```json
[
  {
    "lectureid": "1111111111",
    "facultyid": "1111111111",
    "semesterid": "2222222222",
    "dayofweek": 1,
    "starttime": "10:00:00",
    "endtime": "11:00:00"
  },
  ...
]
```

### Sample Error

```json
{
  "error": "Not Found",
  "code": 404
}
```


## Insert Data

| attribute   | value         |
| ----------- | ------------- |
| HTTP Method | POST          |
| Endpoint    | /basic/insert |

### Parameters

| parameter  | datatype       | example    | optional |
| ---------- | -------------- | ---------- | -------- |
| lectureId  | BIGINT         | 1234567890 | No       |
| facultyId  | BIGINT         | 1234567890 | No       |
| semesterId | BIGINT         | 1234567890 | No       |
| dayOfWeek  | SMALLINT (1-7) | 1          | No       |
| startTime  | TIME           | 23:59:59   | No       |
| endTime    | TIME           | 23:59:59   | No       |

### Response Body

```json
[
  {
    "lectureId": number,
    "facultyId": number,
    "semesterId": number,
    "dayOfWeek": number,
    "startTime": time,
    "endTime": time
  }
]
```

### Error

```json
{
  "error": string,
  "code": number
}
```

### Sample Request

```http
POST /basic/insert
```

### Sample Response

```json
{
    "data" : [
        {
            "lectureId": 1111222266,
            "semesterId": 1111222233,
            "facultyId": 1111222233,
            "dayOfWeek": 3,
            "startTime": "1200",
            "endTime": "1400"
        },
        {
            "lectureId": 3000999988,
            "semesterId": 1000999988,
            "facultyId": 1000999978,
            "dayOfWeek": 3,
            "startTime": "1500",
            "endTime": "1700"
        },
        {
            "lectureId": 2288888844,
            "semesterId": 8888888844,
            "facultyId": 8888888844,
            "dayOfWeek": 2,
            "startTime": "1200",
            "endTime": "1400"
        }
    ]
}
```

### Sample Error

```json
{
  "error": "Key (lectureid)=(9874567822) already exists.",
  "code": 400
}
```

## Computation Result

| attribute   | value         |
| ----------- | ------------- |
| HTTP Method | GET           |
| Endpoint    | /basic/result |

### Parameters

| parameter  | datatype       | example    |
| ---------- | -------------- | ---------- |
| facultyId  | BIGINT         | 1234567890 |
| semesterId | BIGINT         | 1234567890 |
| dayOfWeek  | SMALLINT (1-7) | 1          |

### Response Body

```json
[
  {
    "lectureId": number,
    "startTime": time,
    "endTime": time
  }
]
```

### Error

```json
{
  "error": string,
  "code": number
}
```

### Sample Request

```http
GET /basic/result?dayOfWeek=3
```

### Sample Response

```json
[
  [
    {
      "lectureId": "1111111111",
      "startTime": "10:00:00",
      "endTime": "11:00:00"
    },
    {
      "lectureId": "1234567891",
      "startTime": "14:00:00",
      "endTime": "16:00:00"
    },
    {
      "lectureId": "9874567821",
      "startTime": "16:00:00",
      "endTime": "17:30:00"
    }
  ],
  [
    {
      "lectureId": "1000999988",
      "startTime": "15:00:00",
      "endTime": "17:00:00"
    }
  ],
]
```

### Sample Error

```json
{
  "error": "Sorry, we could not find what you asked for",
  "code": 404
}
```


## Get Other Data for Frontend

| attribute   | value         |
| ----------- | ------------- |
| HTTP Method | GET           |
| Endpoint    | /basic/info   |

### Parameters

There is no parameter for this endpoint.

### Response Body

```json
{
    "facultyid": [
        {
            "facultyid": number
        }
    ],
    "semesterid":[
        {
            "semesterid": number
        }
    ],
    "totalCount": number
}
```

### Error

```json
{
  "error": string,
  "code": number
}
```

### Sample Request

```http
GET /basic/info
```

### Sample Response

```json
{
  "facultyid": [
    {
      "facultyid": "1111111111"
    },
    {
      "facultyid": "2000999978"
    }
  ],
  "semesterid": [
    {
      "semesterid": "1000999988"
    },
    {
      "semesterid": "2000999988"
    }
  ],
  "totalCount": "13"
}
```

### Sample Error

```json
{
  "error": "Not Found",
  "code": 404
}
```
