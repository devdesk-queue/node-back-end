# node-back-end
This repository will server as the backend server for the devdesk queue application

# API documentation

# Resource: Authentication

## [POST] registration

**URL:** /api/auth/register

**Payload:** an object with the following properties.

```json
{
  "email": "whiskers@example.com",
  "username": "mr. kitty",
  "password": "purr"
}
```

Returns an object with new user data.

Example:

```json
{
  "user": {
    "id": 6,
    "email": "whiskers@example.com",
    "username": "mr. kitty",
    "role": "student",
    "created_at": "2019-04-16 18:43:41"
  },
  "token": "<hidden>"
}
```

## [POST] login

**URL:** /api/auth/login

**Payload:** an object with the following properties.

```json
{
  "username": "mr. kitty",
  "password": "purr"
}
```

Returns an object with user token.

Example:

```json
{
  "message": "Welcome, mr. kitty!",
  "token": "<hidden>"
}
```

# Resource: Tickets

## [GET] all tickets

**URL:** /api/tickets

Returns an array of ticket objects.

Example:

```
[
  {
    "id": 1,
    "status": "resolved",
    "title": "problem1",
    "description": "big problem",
    "tried": "cry",
    "student_id": 2,
    "admin_id": 1,
    "created_at": "2019-04-17 01:57:26",
    "updated_at": "2019-04-17 01:57:26",
    "categories": [
      {
        "id": 2,
        "name": "User Interface II"
      },
      {
        "id": 3,
        "name": "User Interface III"
      }
    ]
  }
]
```

## [GET] ticket by ID

**URL:** /api/tickets/:id

Returns a ticket object.

Example:

```
{
  "id": 1,
  "status": "resolved",
  "title": "problem1",
  "description": "big problem",
  "tried": "cry",
  "student_id": 2,
  "admin_id": 1,
  "created_at": "2019-04-17 01:57:26",
  "updated_at": "2019-04-17 01:57:26",
  "categories": [
    {
      "id": 2,
      "name": "User Interface II"
    },
    {
      "id": 3,
      "name": "User Interface III"
    }
  ]
}
```

## [POST] new ticket

**URL:** /api/tickets

**Payload:** an object with the following properties.

*Category* can be a string from pre-selected list!

```json
{
  "title": "Please help",          // string, max 256 chars, required
  "description": "I need help",    // string, required
  "tried": "I tried this....",     // string, optional
  "category": "JavaScript I",      // string, required
}
```

**Returns:** new ticket object.

## [PUT] ticket

**URL:** /api/tickets/:id

**Payload:** an object with the `status` and `user_id` property.
Valid `status` values are "inQueue", "opened", "resolved" strings.

```json
{
  "status": "inQueue",    // Required
}
```

**Returns:** updated ticket object.
