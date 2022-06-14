

User related operations

_create new user_   
POST /users
```JSON
{
  "user": {
    "firstName": "ke",
    "lastName": "chen",
    "email": "ke.chen@tum.de", //email should be unique
    "password": "ke_pw"
  }
}
```

_login test_   
POST /users/login
```Json
{
  "user": {
    "email": "ke.chen@tum.de",
    "password": "ke_pw"
  }
}
```
if valid, the request will return the objectid of current user   


_update user profile_   
PUT /users/62a789378472dadd433093b4
```JSON
{
  "user": {
    "bio": "I like reading",
    "gender": "female",
    "address": {
      "houseNumber": "456",
      "postcode": "80803"
    }
  }
}
```

_delete user by id_
DELETE /users/62a789378472dadd433093b4


