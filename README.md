# node-back-end
This repository will server as the backend server for the devdesk queue application

# API documentation

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

**Payload:** an object with the following properties:

```
{
  "title": "Please help",                 // string, max 256 chars, required
  "description": "I need help",           // string, required
  "tried": "I tried this....",            // string, optional
  "student_id": 2,                        // integer, required
}
```

**Returns:** an array with new ticket ID. (can be changed)

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

**Returns:** number of edited resources. (can be changed)
