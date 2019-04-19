# API documentation

# Resource: Authentication

## [POST] registration

**URL:** `/api/auth/register`

**Payload:** an object with the following properties.

```js
{
  "email": "whiskers@example.com",
  "username": "mr. kitty",
  "password": "purr"
}
```

**Returns:** an object with user data and authentication token.

Example:

```js
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

**URL:** `/api/auth/login`

**Payload:** an object with the following properties.

```js
{
  "username": "mr. kitty",
  "password": "purr"
}
```

**Returns:** an object with same data as [registration](#post-registration).

# Resource: Tickets

## [GET] all tickets

**URL:** `/api/tickets`

**Returns:** an array of ticket objects.

Example:

```js
[
  {
    "id": 1,
    "status": "resolved",
    "title": "problem1",
    "description": "big problem",
    "tried": "cry",
    "student_id": 2,
    "helper_id": 1,
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
    ],
    "student": {
      "username": "macjabeth"
    },
    "helper": {
      "username": "admin"
    }
  }
]
```


## [GET] ticket by ID

**URL:** `/api/tickets/:id`

**Returns:** a ticket object.

Example:

```js
{
  "id": 1,
  "status": "resolved",
  "title": "problem1",
  "description": "big problem",
  "tried": "cry",
  "student_id": 2,
  "helper_id": 1,
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

**URL:** `/api/tickets`

**Restricted:** User must be logged in.

**Payload:** an object with the following properties.

```js
{
  "title": "Please help",        // string, max 256 chars, required
  "description": "I need help",  // string, required
  "tried": "I tried this....",   // string, optional
  "categories": ["JavaScript I"],  // array, required
}
```

**Returns:** a new ticket object.

Example:

```js
{
  "id": 5,
  "status": "pending",
  "title": "Ticket Test",
  "description": "Will this work?",
  "tried": "Posting a new ticket.",
  "student_id": 1,
  "helper_id": null,
  "created_at": "2019-04-18 00:22:41",
  "updated_at": "2019-04-18 00:22:41",
  "categories": [
    {
      "id": 40,
      "name": "Inserting and Modifying Data"
    }
  ]
}
```

## [PUT] ticket

**URL:** `/api/tickets/:id`

**Restricted:** User must be logged in.

**Authorisation:** User must be a helper, admin, or the student who created the ticket.

**Payload:** an object with the `status` and `helper_id` property.

Valid `status` values are "pending", "helping", "resolved", "archived" strings.

The `helper_id` refers to the `user_id` of the user who was assigned to help resolve this ticket.

```js
{
  "status": "pending",  // string, required
  "helper_id": 1        // number, optional, defaults to user updating the ticket.
}
```

**Returns:** a ticket object with the updated status.

# Resource: Categories

## [GET] all categories

**URL:** `/api/categories`

**Returns:** an array of category objects.

Example:

```js
[
  {
    "id": 1,
    "name": "User Interface I"
  },
  {
    "id": 2,
    "name": "User Interface II"
  }
]
```

## [POST] new category

**URL:** `/api/categories`

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin.

**Payload:** an object with the following properties.

```js
{
  "name": "React Native"
}
```

**Returns:** new category object.

## [PUT] edit category

**URL:** `/api/categories/:id`

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin.

**Payload:** an object with the following properties.

```js
{
  "id": 40
  "name": "Updated Category"
}
```

**Returns:** updated category object.

## [DELETE] category

**URL:** `/api/categories/:id`

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin.

**Returns:** success message.

```js
{
  "id": 5,
  "message": "Category with ID 5 was deleted."
}
```

# Resource: Users

## [GET] all users

**URL:** `/api/users`

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin.

**Returns:** an array of user objects.

Example:

```js
[
  {
    "id": 4,
    "email": "omar@kittycuddlers.net",
    "username": "kittycuddler",
    "role": "student",
    "created_at": "2019-04-17 06:41:38",
    "updated_at": "2019-04-17 06:41:38"
  },
  {
    "id": 5,
    "email": "whiskers@example.com",
    "username": "mrKitty",
    "role": "student",
    "created_at": "2019-04-17 06:54:30",
    "updated_at": "2019-04-17 06:54:30"
  }
]
```

## [GET] user by ID

**URL:** `/api/users/:id`

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin or the user being fetched.

**Returns:** a user object.

Example:

```js
{
  "id": 5,
  "email": "whiskers@example.com",
  "username": "mrKitty",
  "role": "student",
  "created_at": "2019-04-17 06:54:30",
  "updated_at": "2019-04-17 06:54:30"
}
```

## [PUT] edit user

**URL:** `/api/users/:id`

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin or the user being edited.

**Payload:** an object with the following properties.

```js
{
  "currentPassword": "currentuserpw",  // string, required
  "newPassword": "clevernewpw",        // string, optional
  "email": "professional@email.com",     // string, optional
  "username": "Coolio",               // string, optional
  "role": "helper",                    // string, optional (only admins can change this)
}
```

**Returns:** updated user object.

```js
{
  "id": 6,
  "email": "professional@email.com",
  "username": "Coolio",
  "role": "helper",
  "created_at": "2019-04-17 10:06:14"
  "updated_at": "2019-04-21 13:22:06"
}
```

## [DELETE] user

**URL:** `/api/users/:id`

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin.

**Returns:** success message.

```js
{
  "id": 5,
  "message": "User with ID 5 was deleted."
}
```

# Resource: Roles

## [GET] all roles

**URL:** `/api/roles`

**Returns:** an array of user roles.

Example:

```js
[
  {
    "id": 1,
    "name": "student"
  },
  {
    "id": 2,
    "name": "helper"
  },
  {
    "id": 3,
    "name": "admin"
  }
]
```
