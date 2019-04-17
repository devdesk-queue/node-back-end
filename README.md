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
  "id": 6,
  "message": "Welcome, mr. kitty!",
  "token": "<hidden>"
}
```


# Resource: Tickets


## [GET] all tickets

**URL:** /api/tickets

Returns an array of ticket objects.

Example:

```json
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
      }
    ],
    "student": {
      "username": "Joe"
    },
    "helper": {
      "username": "mrKitty"
    }
  }
]
```


## [GET] ticket by ID

**URL:** /api/tickets/:id

Returns a ticket object.

Example:

```json
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
    "username": "Joe"
  },
  "helper": {
    "username": "mrKitty"
  }
}
```


## [POST] new ticket

**URL:** /api/tickets

**Restricted:** User must be logged in.

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

**Restricted:** User must be logged in.

**Authorisation:** User must be a helper, admin, or the student who created the ticket.

**Payload:** an object with the `status` and `helper_id` property.
Valid `status` values are "inQueue", "opened", "resolved" strings.
`helper_id` is the user_id of helper user role, who is editing the ticket.

```json
{
  "status": "inQueue",    // Required
  "helper_id": 1          // Integer, Required.
}
```

**Returns:** updated ticket object.


# Resource: Categories


## [GET] all categories

**URL:** /api/categories

Returns an array of categories objects.

Example:

```json
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

**URL:** /api/categories

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin.

**Payload:** an object with the following properties.

```json
{
  "name": "React Native"
}
```

**Returns:** new category object.



## [PUT] edit category

**URL:** /api/categories/:id

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin.

**Payload:** an object with the following properties.

```json
{
  "name": "React Native"
}
```

**Returns:** updated category object.



## [DELETE] category

**URL:** /api/categories/:id

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin.

**Returns:** success message.

```json
{
  "id": 2,
  "message": "Category with ID 2 was deleted."
}
```


# Resource: Users


## [GET] all users

**URL:** /api/users

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin.

Returns an array of user objects.

Example:

```json
[
  {
    "id": 4,
    "email": "omar@kittycuddlers.net",
    "username": "kittycuddler",
    "password": "$2a$10$msOd.CoK6PEk9hcq7/Ss0uoscsKkPy2N9faxvyxrCPixFqFSLIyvO",
    "role": "student",
    "created_at": "2019-04-17 06:41:38"
  },
  {
      "id": 5,
      "email": "whiskers@example.com",
      "username": "mrKitty",
      "password": "$2a$10$7HaI6cU9rViU6mbYZrP0rOgc4hTH166r/iYXqrI/WKyQqtgHgHTZq",
      "role": "student",
      "created_at": "2019-04-17 06:54:30"
  }
]
```


## [GET] user by ID

**URL:** /api/users/:id

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin or the user being fetched.

Returns a user object.

Example:

```json
{
  "id": 5,
  "email": "whiskers@example.com",
  "username": "mrKitty",
  "role": "student",
  "created_at": "2019-04-17 06:54:30"
}
```


## [PUT] edit user

**URL:** /api/users/:id

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin or the user being edited.

**Payload:** an object with one or both following properties.

```json
{
  "password": "newSecretPasswordOver9000!",
  "email": "joe@test.com"
}
```

**Returns:** updated user object.

```json
{
  "id": 6,
  "email": "joe@test.com",
  "username": "Joe",
  "role": "student",
  "created_at": "2019-04-17 10:06:14"
}
```



## [DELETE] user

**URL:** /api/users/:id

**Restricted:** User must be logged in.

**Authorisation:** User must be an admin.

**Returns:** success message.

```json
{
  "id": 2,
  "message": "User with ID 2 was deleted."
}
```


# Resource: Roles


## [GET] all roles

**URL:** /api/roles

Returns an array of user roles.

Example:

```json
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
