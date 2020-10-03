[Back to README.md](../../README.md)

# Get User Parks List

Show user parks list for the current user.

**URL** : `/api/user-parks/:id`

**URL Parameters** : `id=[integer]` where `id` is the ID of the Account on the
server.

**Method** : `GET`

**Auth required** : YES

## Success Response

**Condition** : If Account exists and Authorized User has required permissions.

**Code** : `200 OK`

**Content example**

```json
[
    {
        "parks": ["park-1", "park-2"]
    }
]
```

## Error Responses

**Condition** : If Account does not exist with `id` of provided `id` parameter.

**Code** : `404 NOT FOUND`

**Content** : `{}`

### Or

**Condition** : If Account exists but Authorized User does not have required
permissions.

**Code** : `401 UNAUTHORIZED`

**Content** :

```json
{
    "message": "Unauthorized request"
}
```

## Notes

There are security issues:

* This view allows existing users to test for existence of accounts that exist
    but that they do not have access to.
* Account IDs are sequential so an authorized user can count all the Accounts
    on the system.

[Back to README.md](../../README.md)