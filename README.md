# node-back-end
This repository will server as the backend server for the devdesk queue application

# API documentation

# Resource: Authentication

## [POST] registration

**URL:** /api/auth/register

**Payload:** an object with the following properties.

```
{
  "email": "test@example.com",
  "username": "mr. kitty",
  "password": "purr"
}
```

Returns an object with new user data.

Example:

```
{
  "id": 6,
  "email": "test@example.com",
  "username": "mr. kitty",
  "admin": false,
  "created_at": "2019-04-16 18:43:41"
}
```

## [POST] login

**URL:** /api/auth/login

**Payload:** an object with the following properties.

```
{
  "username": "mr. kitty",
  "password": "purr"
}
```

Returns an object with user token.

Example:

```
{
  "message": "Welcome, admin!",
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
    "ticket_id": 1,
    "status": "resolved",
    "title": "problem1",
    "description": "big problem",
    "tried": "cry",
    "student_id": 2,
    "admin_id": 1,
    "created_at": "2019-04-15 07:16:35",
    "updated_at": "2019-04-15 07:16:35",
    "categories": [
        "Administration",
        "ISA"
    ]
  },
]
```

## [POST] new ticket

**URL:** /api/tickets

**Payload:** an object with the following properties.

*Category* can be a string from pre-selected list!

```
{
  "title": "Please help",                 // string, max 256 chars, required
  "description": "I need help",           // string, required
  "tried": "I tried this....",            // string, optional
  "category": "JavaScript I",             // string, required
  "student_id": 2,                        // integer, required
}
```

**Returns:** new ticket object.

## [PUT] ticket

**URL:** /api/tickets/:id

**Payload:** an object with the `status` and `user_id` property.
Valid `status` values are "inQueue", "opened", "resolved" strings.

```
{
  status: "inQueue", // Required
  user_id: 1         // Integer, Required
}
```

**Returns:** updated ticket object.
