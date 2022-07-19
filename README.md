# README

## Commands

- Before anything else  
  `npm install`
- Add MongoDB URI to `.env`  
  `ATLAS_URI=mongodb+srv://{username}:{password}@cluster0.yros1ft.mongodb.net/?retryWrites=true&w=majority`
- Add JWT_SECRET to `.env`  
  `JWT_SECRET=TopSecret`
- To run the project in dev mode (with auto-reload)  
  `npm run dev`
- To run the project in product mode  
  `npm run start`
- Before you commit, please run ESlint with the command below and fix the errors  
  `npm run lint`

---

## API Test Data

### User Related Operations

**_create new user_**  
`POST /auth/register`

```JSON
{
  "email": "ke.samantha.chen.test@tum.de", //email should be unique
  "password": "ke_pw"
}
```

**_login test_**  
`POST /auth/login`

```Json
{
  "email": "ke.samantha.chen.test@tum.de",
  "password": "ke_pw"
}
```

if valid, will reply a token, which should be added to header `Authorization: token` for the following apis:

**_update user profile_**  
`PUT /users`

```JSON
{
  "user": {
    "firstName": "Ke",
    "lastName": "Chen",
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

**_get current user data_**  
`GET /users`

**_delete user by id_**  
`DELETE /users/62a789378472dadd433093b4`

**_update book collection list_**  
Contains general categories for book model and exchangeable for book exchange service  
`PUT /users/bclist`

```JSON
[
  {
    "ISBN": "9783551354013",
    "title": "Harry Potter und der Stein der Weisen",
    "authors":["Joanne K. Rowling"],
    "categories":["Juvenile Fiction"],
    "exchangeable":0,
    "image": "http://books.google.com/books/content?id=m1khPAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "description": "Eigentlich hatte Harry geglaubt, er sei ein ganz normaler Junge. Zumindest bis zu seinem elften Geburtstag. Da erfährt er, dass er sich an der Schule für Hexerei und Zauberei einfinden soll. Und warum? Weil Harry ein Zauberer ist. Und so wird für Harry das erste Jahr in der Schule das spannendste, aufregendste und lustigste in seinem Leben. Er stürzt von einem Abenteuer in die nächste ungeheuerliche Geschichte, muss gegen Bestien, Mitschüler und Fabelwesen kämpfen. Da ist es gut, dass er schon Freunde gefunden hat, die ihm im Kampf gegen die dunklen Mächte zur Seite stehen."
  },
  {
    "ISBN": "9781338596700",
    "title": "Harry Potter and the Sorcerer's Stone: Minalima Edition (Harry Potter, Book 1), Volume 1",
    "authors":["J. K. Rowling"],
    "categories":["Juvenile Fiction"],
    "exchangeable":1,
    "image": "http://books.google.com/books/content?id=LapIzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "description": "A dazzling new edition of J.K. Rowling's Harry Potter and the Sorcerer's Stone, fully illustrated in brilliant color and featuring exclusive interactive paper craft elements, including a fold-out Hogwarts letter and more! In this stunning new edition of Harry Potter and the Sorcerer's Stone, experience the story as never before. J.K. Rowling's complete and unabridged text is accompanied by full-color illustrations on nearly every page and eight exclusive, interactive paper craft elements: Readers will open Harry's Hogwarts letter, reveal the magical entryway to Diagon Alley, make a sumptuous feast appear in the Great Hall, and more. Designed and illustrated by award-winning design studio MinaLima - best known for establishing the visual graphic style of the Harry Potter and Fantastic Beasts films - this edition is sure to be a keepsake for Harry Potter fans, a beautiful addition to any collector's bookshelf, and an enchanting way to introduce the first book in this beloved series to a new generation of readers."
  },
  {
    "ISBN": "9781781100806",
    "title": "Harry Potter und der Orden des Phönix",
    "authors":["J.K. Rowling"],
    "categories":["Fiction"],
    "exchangeable":0,
    "image": "http://books.google.com/books/content?id=9N8qdq07gswC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Es sind Sommerferien und wieder einmal sitzt Harry bei den unmöglichen Dursleys im Ligusterweg fest. Doch diesmal treibt ihn größere Unruhe denn je - Warum schreiben seine Freunde Ron und Hermine nur so rätselhafte Briefe? Und vor allem: Warum erfährt er nichts über die dunklen Mächte, die inzwischen neu erstanden sind und sich unaufhaltsam über Harrys Welt verbreiten? Noch ahnt er nicht, was der geheimnisvolle Orden des Phönix gegen Voldemort ausrichten kann ... Als Harrys fünftes Schuljahr in Hogwarts beginnt, werden seine Sorgen nur noch größer. Und dann schlägt der Dunkle Lord wieder zu. Harry muss seine Freunde um sich scharen, sonst gibt es kein Entrinnen."
  }
]


```

**_update wish list_**  
`PUT /users/wslist`

```JSON
[
  {
    "ISBN": "9783638586337",
    "title": "Die NAFTA. North American Free Trade Agreement",
    "authors":["Oliver Thomas"],
    "categories":["Political Science"],
    "image": "http://books.google.com/books/content?id=oa0-I7llC9wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Studienarbeit aus dem Jahr 2006 im Fachbereich Politik - Internationale Politik - Thema: Globalisierung, pol. Ökonomie, Note: 1,7, Fachhochschule Münster, Veranstaltung: Regionalwissenschaften Lateinamerika, 8 Quellen im Literaturverzeichnis, Sprache: Deutsch, Abstract: Das Nordamerikanische Freihandelsabkommen NAFTA (North American Free Trade Agreement) ist ein zum 01.01.1994 gegründeter Wirtschaftsverbund zwischen den Vereinigten Staaten, Kanada und Mexiko. Das NAFTA-Abkommen löste das bis dato existierende Kanadisch-Amerikanische Freihandelsabkommen mit dem Ziel ab, die Zölle im bilateralen Handel innerhalb eines bestimmten Zeitraums zu eliminieren. Gemessen an der Bevölkerung ist mit dem NAFTA-Abkommen ein Wirtschaftsblock entstanden, der mit rd. 380 Mio. Einwohnern größer als der der Europäischen Union ist. Mit einem kumulierten BIP von 6.000 Milliarden US-Dollar gehört die NAFTA außerdem zu den größten Freihandelszonen der Welt. In den folgenden Kapiteln sollen das Zustandekommen und der Inhalt des Abkommens, die nationalen Interessen der beteiligten Staaten und die derzeitige Situation näher erläutert werden sowie ein kurzer Ausblick über Chancen und Perspektiven der NAFTA gegeben werden."
  },
  {
    "ISBN": "9783755740018",
    "title": "Free",
    "subtitle": "Die Welt gehört uns wenn du bei mir bist",
    "authors":["Elke Wollinski"],
    "categories":["Young Adult Fiction"],
    "image": "http://books.google.com/books/content?id=aINhEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Lauren wächst wohlbehütet bei ihren Eltern auf. Nichts hasst sie mehr, als das langweilige Leben auf dem Land. Es stört sie, dass ihre Eltern ihr Leben diktieren wollen. Lauren liebt das Abenteuer und hält nichts davon, ein braves Mädchen zu sein. Eines Tages lernt sie den jungen Aussteiger Randy kennen. Dieser zeltet, begleitet von seinem Hund Earl und dem zahmen Frettchen Speedy, auf dem Grundstück ihres Nachbarn. Randy verkörpert für Lauren alles, was sie mit Abenteuer verbindet. Sie freundet sich mit ihm an und seine Lebensweise fasziniert sie immer mehr. Und nicht nur das. Sie verliebt sich hoffnungslos in ihn und brennt mit ihm durch. Randy ist der Sohn eines Dachdeckers. Er hasst nichts mehr, als sich den Vorschriften der Gesellschaft zu fügen. Deshalb steigt er aus und lebt seinen Traum, zu Fuß die gesamten USA zu durchqueren. Alles was ihm wichtig ist, nimmt er auf seine Reise mit. Seine Tiere und ein Zelt. Mehr nicht. Ohne Geld durch die Welt, lautet sein Motto. Als er Lauren begegnet verändert sich alles. Die beiden verlieben sich hoffnungslos ineinander. Gemeinsam mit ihr setzt er seine Reise fort. Was zunächst als harmloses Abenteuer beginnt, endet in Flucht und dem Kampf ums pure Überleben, als Randy eines versuchten Mordes bezichtigt wird."
  }
]
```

**_get book collection_**  
Read operations for both of the list returns two parameters a list containing book ids and a list containing exchangeable state  
`GET /users/readlist/bc`

**_get wish list_**  
The exchangeable list is left empty for wish list.  
`GET /users/readlist/ws`

---

### Subcription Related Operations

To Create new subscription use this function. Two options are present for subscription model: monthly or yearly  
`PUT /subscription/start/:subscriptionModel`

Read status of your subscription  
`GET /subscription/status/`

Read description of your subscription  
`GET /subscription/details/`

Update subscription status:  
`PUT /subscription/update/:subscriptionModel`

Cancel subsription  
`GET /subscription/cancel/`

---

### Book Related Operations

**_get data from google books api_**  
`GET /books/gbooks/{"title" :"Harry", "author": "rowling", "publisher":null, "isbn": null}`

**_exam user's book choice and create new book in our database_**  
`POST /books/add`  
same json as wslist update:

```JSON
[
  {
    "ISBN": "9783638586337",
    "title": "Die NAFTA. North American Free Trade Agreement",
    "authors":["Oliver Thomas"],
    "categories":["Political Science"],
    "image": "http://books.google.com/books/content?id=oa0-I7llC9wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Studienarbeit aus dem Jahr 2006 im Fachbereich Politik - Internationale Politik - Thema: Globalisierung, pol. Ökonomie, Note: 1,7, Fachhochschule Münster, Veranstaltung: Regionalwissenschaften Lateinamerika, 8 Quellen im Literaturverzeichnis, Sprache: Deutsch, Abstract: Das Nordamerikanische Freihandelsabkommen NAFTA (North American Free Trade Agreement) ist ein zum 01.01.1994 gegründeter Wirtschaftsverbund zwischen den Vereinigten Staaten, Kanada und Mexiko. Das NAFTA-Abkommen löste das bis dato existierende Kanadisch-Amerikanische Freihandelsabkommen mit dem Ziel ab, die Zölle im bilateralen Handel innerhalb eines bestimmten Zeitraums zu eliminieren. Gemessen an der Bevölkerung ist mit dem NAFTA-Abkommen ein Wirtschaftsblock entstanden, der mit rd. 380 Mio. Einwohnern größer als der der Europäischen Union ist. Mit einem kumulierten BIP von 6.000 Milliarden US-Dollar gehört die NAFTA außerdem zu den größten Freihandelszonen der Welt. In den folgenden Kapiteln sollen das Zustandekommen und der Inhalt des Abkommens, die nationalen Interessen der beteiligten Staaten und die derzeitige Situation näher erläutert werden sowie ein kurzer Ausblick über Chancen und Perspektiven der NAFTA gegeben werden."
  },
  {
    "ISBN": "9783755740018",
    "title": "Free",
    "subtitle": "Die Welt gehört uns wenn du bei mir bist",
    "authors":["Elke Wollinski"],
    "categories":["Young Adult Fiction"],
    "image": "http://books.google.com/books/content?id=aINhEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Lauren wächst wohlbehütet bei ihren Eltern auf. Nichts hasst sie mehr, als das langweilige Leben auf dem Land. Es stört sie, dass ihre Eltern ihr Leben diktieren wollen. Lauren liebt das Abenteuer und hält nichts davon, ein braves Mädchen zu sein. Eines Tages lernt sie den jungen Aussteiger Randy kennen. Dieser zeltet, begleitet von seinem Hund Earl und dem zahmen Frettchen Speedy, auf dem Grundstück ihres Nachbarn. Randy verkörpert für Lauren alles, was sie mit Abenteuer verbindet. Sie freundet sich mit ihm an und seine Lebensweise fasziniert sie immer mehr. Und nicht nur das. Sie verliebt sich hoffnungslos in ihn und brennt mit ihm durch. Randy ist der Sohn eines Dachdeckers. Er hasst nichts mehr, als sich den Vorschriften der Gesellschaft zu fügen. Deshalb steigt er aus und lebt seinen Traum, zu Fuß die gesamten USA zu durchqueren. Alles was ihm wichtig ist, nimmt er auf seine Reise mit. Seine Tiere und ein Zelt. Mehr nicht. Ohne Geld durch die Welt, lautet sein Motto. Als er Lauren begegnet verändert sich alles. Die beiden verlieben sich hoffnungslos ineinander. Gemeinsam mit ihr setzt er seine Reise fort. Was zunächst als harmloses Abenteuer beginnt, endet in Flucht und dem Kampf ums pure Überleben, als Randy eines versuchten Mordes bezichtigt wird."
  }
]
```

---

### Bookmates Related Operations

**_two test cases:_**  
```JSON
{
  "email": "bookmate_a@tum.de", 
  "password": "bookmate_a_pw"
}
```

```JSON
{
  "email": "bookmate_b@tum.de", 
  "password": "bookmate_b_pw"
}
```

**_get current bookmates_**  
`GET /bookmates/current`


WARNING: no duplication detection!  
**_send request to certain user_**  
`POST /bookmates/send`

```Json
{
  "userId": "target user object id"
}
```

**_accept request from certain user_**  
`POST /bookmates/accept`

```Json
{
  "userId": "target user object id"
}
```

**_decline request from certain user_**  
`POST /bookmates/decline`

```Json
{
  "userId": "target user object id"
}
```

