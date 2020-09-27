# Remove Park To User Parks List

Allow the Authenticated User to remove a park from their user parks list.

**URL** : `/api/user-parks/remove-park/:id`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : None

**Data constraints**

```json
{
    "user_id": "[integer]",
    "index": "[integer]",
}
```

Note that `user_id` is the user's id within the table that stores user parks.  Note that `index` refers to the user park list array stored within the database.

**Data examples**

Partial data is not allowed.

## Success Responses

**Condition** : Data provided is valid and User is Authenticated.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. A
User with `id` of `1` remove a park with park code `goga` from their parks list. 

```json
{
    "id": 1,
    "parks": [
        "fopo"
    ],
    "user_id": 1,
    "created_at": "2020-09-21T20:15:45.921Z",
    "updated_at": "2020-09-21T20:15:45.921Z"
}
```

## Notes

* The user has no control over the endpoints/requests made here, they all happen within the app so the error handling is minimal and will respond with "500 internal server error" if an error were to happen.