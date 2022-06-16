# README

## Commands
- Before anything else   
  ```npm install```
- Add MongoDB URI to `.env`  
  ```ATLAS_URI=mongodb+srv://{username}:{password}@cluster0.yros1ft.mongodb.net/?retryWrites=true&w=majority```  
- To run the project in dev mode (with auto-reload)   
  ```npm run dev```
- To run the project in product mode  
  ```npm run start```
- Before you commit, please run ESlint with the command below and fix the errors    
  ```npm run lint```   

## API Test Data  
### User Related Operations
**_create new user_**  
`POST /users`
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

**_login test_**     
`POST /users/login`
```Json
{
  "user": {
    "email": "ke.chen@tum.de",
    "password": "ke_pw"
  }
}
```
if valid, the request will return the objectid of current user   


**_update user profile_**   
`PUT /users/62a789378472dadd433093b4`
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

**_get user data by id_**   
`GET /users/62a789378472dadd433093b4`

**_delete user by id_**  
`DELETE /users/62a789378472dadd433093b4`


