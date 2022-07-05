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

---

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
`PUT /users`   
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

**_get current user data**   
`GET /users`   

**_delete user by id_**  
`DELETE /users/62a789378472dadd433093b4`

**_update book collection list_**  
`PUT /users/bclist`
```JSON
[
  {
    "ISBN": "9783551354013",
    "title": "Harry Potter und der Stein der Weisen",
    "authors":["Joanne K. Rowling"],
    "categories":["Juvenile Fiction"],
    "image": "http://books.google.com/books/content?id=m1khPAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "description": "Eigentlich hatte Harry geglaubt, er sei ein ganz normaler Junge. Zumindest bis zu seinem elften Geburtstag. Da erfährt er, dass er sich an der Schule für Hexerei und Zauberei einfinden soll. Und warum? Weil Harry ein Zauberer ist. Und so wird für Harry das erste Jahr in der Schule das spannendste, aufregendste und lustigste in seinem Leben. Er stürzt von einem Abenteuer in die nächste ungeheuerliche Geschichte, muss gegen Bestien, Mitschüler und Fabelwesen kämpfen. Da ist es gut, dass er schon Freunde gefunden hat, die ihm im Kampf gegen die dunklen Mächte zur Seite stehen."
  },
  {
    "ISBN": "9781338596700",
    "title": "Harry Potter and the Sorcerer's Stone: Minalima Edition (Harry Potter, Book 1), Volume 1",
    "authors":["J. K. Rowling"],
    "categories":["Juvenile Fiction"],
    "image": "http://books.google.com/books/content?id=LapIzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "description": "A dazzling new edition of J.K. Rowling's Harry Potter and the Sorcerer's Stone, fully illustrated in brilliant color and featuring exclusive interactive paper craft elements, including a fold-out Hogwarts letter and more! In this stunning new edition of Harry Potter and the Sorcerer's Stone, experience the story as never before. J.K. Rowling's complete and unabridged text is accompanied by full-color illustrations on nearly every page and eight exclusive, interactive paper craft elements: Readers will open Harry's Hogwarts letter, reveal the magical entryway to Diagon Alley, make a sumptuous feast appear in the Great Hall, and more. Designed and illustrated by award-winning design studio MinaLima - best known for establishing the visual graphic style of the Harry Potter and Fantastic Beasts films - this edition is sure to be a keepsake for Harry Potter fans, a beautiful addition to any collector's bookshelf, and an enchanting way to introduce the first book in this beloved series to a new generation of readers."
  },
  {
    "ISBN": "9781781100806",
    "title": "Harry Potter und der Orden des Phönix",
    "authors":["J.K. Rowling"],
    "categories":["Fiction"],
    "image": "http://books.google.com/books/content?id=9N8qdq07gswC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Es sind Sommerferien und wieder einmal sitzt Harry bei den unmöglichen Dursleys im Ligusterweg fest. Doch diesmal treibt ihn größere Unruhe denn je - Warum schreiben seine Freunde Ron und Hermine nur so rätselhafte Briefe? Und vor allem: Warum erfährt er nichts über die dunklen Mächte, die inzwischen neu erstanden sind und sich unaufhaltsam über Harrys Welt verbreiten? Noch ahnt er nicht, was der geheimnisvolle Orden des Phönix gegen Voldemort ausrichten kann ... Als Harrys fünftes Schuljahr in Hogwarts beginnt, werden seine Sorgen nur noch größer. Und dann schlägt der Dunkle Lord wieder zu. Harry muss seine Freunde um sich scharen, sonst gibt es kein Entrinnen."
  }
]

```
**_update wish list_**  
`PUT /users/wslist`   
Pretty the same as `PUT /users/bclist`

---

### Book Related Operations
**_get data from google books api_**  
`GET /books/gbooks/{"title" :"Harry", "author":  "rowling", "publisher":null, "isbn": null}`  



