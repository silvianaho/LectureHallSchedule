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

## Get Basic Data

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/data |

### Request Parameters

| parameter  | datatype       | example   | optional | default |
| ---------- | -------------- | --------- | -------- | ------- |
| lectureId  | BIGINT         | 123456789 | Yes      |         |
| facultyId  | BIGINT         | 123456789 | Yes      |         |
| semesterId | BIGINT         | 123456789 | Yes      |         |
| dayOfWeek  | SMALLINT (1-7) | 1         | Yes      |         |
| pageSize   | INT            | 2         | Yes      | 10      |
| page       | INT            | 2         | Yes      | 0       |

### Response Body

```json
[
  {
    "lectureId": number,
    "facultyId": number,
    "semesterId": number,
    "dayOfWeek": number,
    "startTime": number,
    "endTime": number
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

## Insert Basic Data

| attribute   | value         |
| ----------- | ------------- |
| HTTP Method | POST          |
| Endpoint    | /basic/insert |

### Request Body

| key        | datatype       | example    | optional |
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
  "data": [
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

## Basic Computation Result

| attribute   | value         |
| ----------- | ------------- |
| HTTP Method | GET           |
| Endpoint    | /basic/result |

### Request Parameters

| parameter  | datatype       | example    | optional |
| ---------- | -------------- | ---------- | -------- |
| facultyId  | BIGINT         | 1234567890 | False    |
| semesterId | BIGINT         | 1234567890 | False    |
| dayOfWeek  | SMALLINT (1-7) | 1          | False    |

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
GET /basic/result?semesterId=1110000000&facultyId=1100000000&dayOfWeek=4
```

### Sample Response

```json
[
  [
    {
      "lectureId": "1000000012",
      "startTime": "09:00:00",
      "endTime": "14:00:00"
    }
  ],
  [
    {
      "lectureId": "1000000010",
      "startTime": "10:00:00",
      "endTime": "11:00:00"
    },
    {
      "lectureId": "1000000011",
      "startTime": "12:00:00",
      "endTime": "13:00:00"
    }
  ],
  [
    {
      "lectureId": "1000000013",
      "startTime": "10:30:00",
      "endTime": "12:30:00"
    },
    {
      "lectureId": "1000000014",
      "startTime": "12:15:00",
      "endTime": "14:25:00"
    }
  ]
]
```

### Sample Error

```json
{
  "error": "Sorry, we could not find what you asked for",
  "code": 404
}
```

## Get Additional Data for Frontend

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /basic/info |

### Request Parameters

There is no parameter for this endpoint.

### Response Body

```json
{
  "facultyid": [
    {
      "facultyid": number
    }
  ],
  "semesterid": [
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

## Get Advance Data

| attribute   | value         |
| ----------- | ------------- |
| HTTP Method | GET           |
| Endpoint    | /advance/data |

### Request Parameters

| parameter    | datatype       | example   | optional | default |
| ------------ | -------------- | --------- | -------- | ------- |
| technicianId | BIGINT         | 123456789 | Yes      |         |
| facultyId    | BIGINT         | 123456789 | Yes      |         |
| semesterId   | BIGINT         | 123456789 | Yes      |         |
| dayOfWeek    | SMALLINT (1-7) | 1         | Yes      |         |
| pageSize     | INT            | 2         | Yes      | 10      |
| page         | INT            | 2         | Yes      | 0       |

### Response Body

```json
[
  {
    "technicianId": number,
    "facultyId": number,
    "semesterId": number,
    "dayOfWeek": number,
    "startTime": number,
    "endTime": number
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
    "technicianid": "1111111111",
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

## Insert Advance Data

| attribute   | value           |
| ----------- | --------------- |
| HTTP Method | POST            |
| Endpoint    | /advance/insert |

### Request Body

| key          | datatype       | example    | optional |
| ------------ | -------------- | ---------- | -------- |
| technicianId | BIGINT         | 1234567890 | No       |
| facultyId    | BIGINT         | 1234567890 | No       |
| semesterId   | BIGINT         | 1234567890 | No       |
| dayOfWeek    | SMALLINT (1-7) | 1          | No       |
| startTime    | TIME           | 23:59:59   | No       |
| endTime      | TIME           | 23:59:59   | No       |

### Response Body

```json
[
  {
    "technicianId": number,
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
  "data": [
    {
      "technicianId": 1111222266,
      "semesterId": 1111222233,
      "facultyId": 1111222233,
      "dayOfWeek": 3,
      "startTime": "1200",
      "endTime": "1400"
    },
    {
      "technicianId": 3000999988,
      "semesterId": 1000999988,
      "facultyId": 1000999978,
      "dayOfWeek": 3,
      "startTime": "1500",
      "endTime": "1700"
    },
    {
      "technicianId": 2288888844,
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
  "error": "Key (technicianid)=(1111222266) already exists.",
  "code": 400
}
```

## Advance Computation Result

| attribute   | value           |
| ----------- | --------------- |
| HTTP Method | GET             |
| Endpoint    | /advance/result |

### Request Parameters

| parameter  | datatype       | example    | optional |
| ---------- | -------------- | ---------- | -------- |
| facultyId  | BIGINT         | 1234567890 | False    |
| semesterId | BIGINT         | 1234567890 | False    |
| dayOfWeek  | SMALLINT (1-7) | 1          | False    |

### Response Body

```json
[
  {
    "surplus": number,
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
GET /advance/result?semesterId=1110000000&facultyId=1100000000&dayOfWeek=4
```

### Sample Response

```json
[
  {
    "surplus": 1,
    "startTime": "0800",
    "endTime": "0900"
  },
  {
    "surplus": 0,
    "startTime": "0900",
    "endTime": "1000"
  },
  {
    "surplus": 1,
    "startTime": "1000",
    "endTime": "1030"
  },
  {
    "surplus": 0,
    "startTime": "1030",
    "endTime": "1100"
  },
  {
    "surplus": 1,
    "startTime": "1100",
    "endTime": "1200"
  }
]
```

### Sample Error

```json
{
  "error": "Unprocessable Entity; Invalid Query Detected",
  "code": 422
}
```
## Get Additional Data for Frontend

| attribute   | value       |
| ----------- | ----------- |
| HTTP Method | GET         |
| Endpoint    | /advance/info |

### Request Parameters

There is no parameter for this endpoint.

### Response Body

```json
{
  "facultyid": [
    {
      "facultyid": number
    }
  ],
  "semesterid": [
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
GET /advance/info
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
