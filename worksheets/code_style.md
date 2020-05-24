# Code Style

This documents helps to guide the look and feel of the code so that even when there are multiple developer, the style remains consistent. You may read more about it [here](https://javascript.info/coding-style).

## Style Guide

| Rules             | Choices   |
| ----------------- | --------- |
| Case Styles       | camelCase |
| Acronym Case      | Ibm       |
| Indentation Style | 1TBS      |
| Indentation       | Space     |
| Indentation Space | 2         |
| Semicolon         | Mandatory |

## Examples

Case Styles<br>

### 👎 Bad Example

```js
var HelloWorld = "a"; // this is pascal case
var HELLOWORLD = "b";
var hello_world = "c"; // this is snake case
```

### 👍 Good Example

```js
var helloWorld = "correct";
```

Acronym Case

### 👎 Bad Example

```js
var LectureID = 123;
var LECTUREID = 456;
```

### 👍 Good Example

```js
var lectureId = 789;
```

Indentation Style

### 👎 Bad Example

```js
return;
{
  name: "Jane";
}
```

### 👍 Good Example

```js
function foo(x, y, z) {
  if (x) {
    a();
  } else {
    b();
    c();
  }
}
```

Indentation

### 👎 Bad Example

```js
if (hoursAwake > 17 hours) {
    goToSleep();
} else {
    goToSleepAnyway();
}
```

### 👍 Good Example

```js
if (hoursAwake > 17 hours) {
  goToSleep();
} else {
  goToSleepAnyway();
}
```

Semicolon

### 👎 Bad Example

```js
var facultyId = 123
```

### 👍 Good Example

```js
var facultyId = 123;
```
