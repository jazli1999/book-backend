# README

## Run and Build Instructions

- Before anything else  
  `npm install`  
- Replace the MongoDB URI in `.env`  
  `ATLAS_URI=mongodb+srv://{username}:{password}@cluster0.yros1ft.mongodb.net/?retryWrites=true&w=majority`  
- To run the project in dev mode (with auto-reload)  
  `npm run dev`
- To run the project in production mode  
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
  "email": "ke.samantha.chen.test@tum.de",
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

**_get current user's bookmates list_**  
`GET /bookmates/current`


WARNING: no duplication detection! (Duplication detection is implemented in frontend)    
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
 
**_get bookmates recommendation list for current user_**  
`GET /bookmates`  

Test cases:  
```JSON
{
  "email": "ke@tum.de", 
  "password": "ke_pw"
}
```
```JSON
[
  {
    "ISBN": "9780060926083",
    "title": "The Book of Laughter and Forgetting",
    "authors":["Milan Kundera"],
    "categories":["Czech Republic"],
    "image": "http://books.google.com/books/content?id=myi_ZI-XyPgC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "description": "Analyzes and examines various aspects of human existence through seven integrated stories."
  },
  {
    "ISBN": "9780226525839",
    "title": "They Thought They Were Free",
    "subtitle": "The Germans, 1933–45",
    "authors":["Milton Mayer"],
    "categories":["History"],
    "image": "http://books.google.com/books/content?id=axNDDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Interviews with ten former Nazis comprise the core of this penetrating study of the psychological causes of Nazism and their implications for modern Germany."
  },
  {
    "ISBN": "9780141393964",
    "title": "Things Fall Apart",
    "authors":["Chinua Achebe"],
    "categories":["Fiction"],
    "image": "http://books.google.com/books/content?id=tSbWMu_-D5AC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Okonkwo is the greatest warrior alive, famous throughout West Africa. But when he accidentally kills a clansman, things begin to fall apart. Then Okonkwo returns from exile to find missionaries and colonial governors have arrived in the village. With his world thrown radically off-balance he can only hurtle towards tragedy. Chinua Achebe's stark novel reshaped both African and world literature. This arresting parable of a proud but powerless man witnessing the ruin of his people begins Achebe's landmark trilogy of works chronicling the fate of one African community, continued in Arrow of God and No Longer at Ease."
  },
  {
    "ISBN": "9780748133444",
    "title": "Slammerkin",
    "authors":["Emma Donoghue"],
    "categories":["Fiction"],
    "image": "http://books.google.com/books/content?id=pYcTFK8UySMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Set in London and Monmouth in the late 1700s, this is an extraordinary novel about Mary Saunders, the young daughter of a poor seamstress. Mary hungers greedily for fine clothes and ribbons, as people of her class do for food and warmth. It's a hunger that lures her into prostitution at the age of thirteen. Mary is thrown out by her distraught mother when she gets pregnant and almost dies on the dangerous streets of London. Her saviour is Doll - a prostitute. Mary roams London freely with Doll, selling her body to all manner of 'cullies', dressed whorishly in colourful, gaudy dresses with a painted red smile. Faced with bad debts and threats upon her life she eventually flees to Monmouth, her mother's hometown, where she attempts to start a new life as a maid in Mrs Jones's house. But Mary soon discovers that she can't escape her past and just how dearly people like her pay for yearnings not fitting to their class in society..."
  },
  {
    "ISBN": "9780679444657",
    "title": "One Hundred Years of Solitude",
    "authors":["Gabriel García Márquez"],
    "categories":["Fiction"],
    "image": "http://books.google.com/books/content?id=w0-zUL-87uAC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "description": "The evolution and eventual decadence of a small South American town is mirrored in the family history of the Buendias."
  },
  {
    "ISBN": "9780307417138",
    "title": "The Hitchhiker's Guide to the Galaxy: The Illustrated Edition",
    "authors":["Douglas Adams"],
    "categories":["Fiction"],
    "image": "http://books.google.com/books/content?id=j24GMN0OtS8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "This beautifully illustrated edition of the New York Times bestselling classic celebrates the 42nd anniversary of the original publication—with all-new art by award-winning illustrator Chris Riddell. SOON TO BE A HULU SERIES • “An astonishing comic writer.”—Neil Gaiman Nominated as one of America’s best-loved novels by PBS’s The Great American Read It’s an ordinary Thursday morning for Arthur Dent . . . until his house gets demolished. The Earth follows shortly after to make way for a new hyperspace express route, and Arthur’s best friend has just announced that he’s an alien. After that, things get much, much worse. With just a towel, a small yellow fish, and a book, Arthur has to navigate through a very hostile universe in the company of a gang of unreliable aliens. Luckily the fish is quite good at languages. And the book is The Hitchhiker’s Guide to the Galaxy . . . which helpfully has the words DON’T PANIC inscribed in large, friendly letters on its cover. Douglas Adams’s mega-selling pop-culture classic sends logic into orbit, plays havoc with both time and physics, offers up pithy commentary on such things as ballpoint pens, potted plants, and digital watches . . . and, most important, reveals the ultimate answer to life, the universe, and everything. Now, if you could only figure out the question. . . ."
  },{
    "ISBN": "9780134498034",
    "title": "Programming Pearls",
    "authors":["Jon Bentley"],
    "categories":["Computers"],
    "image": "http://books.google.com/books/content?id=4gX0CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "When programmers list their favorite books, Jon Bentley’s collection of programming pearls is commonly included among the classics. Just as natural pearls grow from grains of sand that irritate oysters, programming pearls have grown from real problems that have irritated real programmers. With origins beyond solid engineering, in the realm of insight and creativity, Bentley’s pearls offer unique and clever solutions to those nagging problems. Illustrated by programs designed as much for fun as for instruction, the book is filled with lucid and witty descriptions of practical programming techniques and fundamental design principles. It is not at all surprising that Programming Pearls has been so highly valued by programmers at every level of experience. In this revision, the first in 14 years, Bentley has substantially updated his essays to reflect current programming methods and environments. In addition, there are three new essays on testing, debugging, and timing set representations string problems All the original programs have been rewritten, and an equal amount of new code has been generated. Implementations of all the programs, in C or C++, are now available on the Web. What remains the same in this new edition is Bentley’s focus on the hard core of programming problems and his delivery of workable solutions to those problems. Whether you are new to Bentley’s classic or are revisiting his work for some fresh insight, the book is sure to make your own list of favorites."
}
]
``` 
```JSON
[
  {
  "ISBN": "9780393609295",
  "title": "Guns, Germs, and Steel: The Fates of Human Societies (20th Anniversary Edition)",
  "authors":["Jared Diamond"],
  "categories":["History"],
  "image": "http://books.google.com/books/content?id=XLo9DgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  "description": "\"Fascinating.... Lays a foundation for understanding human history.\"—Bill Gates In this \"artful, informative, and delightful\" (William H. McNeill, New York Review of Books) book, Jared Diamond convincingly argues that geographical and environmental factors shaped the modern world. Societies that had had a head start in food production advanced beyond the hunter-gatherer stage, and then developed religion --as well as nasty germs and potent weapons of war --and adventured on sea and land to conquer and decimate preliterate cultures. A major advance in our understanding of human societies, Guns, Germs, and Steel chronicles the way that the modern world came to be and stunningly dismantles racially based theories of human history. Winner of the Pulitzer Prize, the Phi Beta Kappa Award in Science, the Rhone-Poulenc Prize, and the Commonwealth club of California's Gold Medal."
  },
  {
  "ISBN": "9780393071344",
  "title": "The Elegant Universe: Superstrings, Hidden Dimensions, and the Quest for the Ultimate Theory",
  "authors":["Brian Greene"],
  "categories":["Science"],
  "image": "http://books.google.com/books/content?id=okv_O0Xhl9gC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  "description": "A new edition of the New York Times bestseller—now a three-part Nova special: a fascinating and thought-provoking journey through the mysteries of space, time, and matter. Now with a new preface (not in any other edition) that will review the enormous public reception of the relatively obscure string theory—made possible by this book and an increased number of adherents amongst physicists—The Elegant Universe \"sets a standard that will be hard to beat\" (New York Times Book Review). Brian Greene, one of the world's leading string theorists, peels away the layers of mystery surrounding string theory to reveal a universe that consists of eleven dimensions, where the fabric of space tears and repairs itself, and all matter—from the smallest quarks to the most gargantuan supernovas—is generated by the vibrations of microscopically tiny loops of energy. Today physicists and mathematicians throughout the world are feverishly working on one of the most ambitious theories ever proposed: superstring theory. String theory, as it is often called, is the key to the Unified Field Theory that eluded Einstein for more than thirty years. Finally, the century-old antagonism between the large and the small-General Relativity and Quantum Theory-is resolved. String theory proclaims that all of the wondrous happenings in the universe, from the frantic dancing of subatomic quarks to the majestic swirling of heavenly galaxies, are reflections of one grand physical principle and manifestations of one single entity: microscopically tiny vibrating loops of energy, a billionth of a billionth the size of an atom. In this brilliantly articulated and refreshingly clear book, Greene relates the scientific story and the human struggle behind twentieth-century physics' search for a theory of everything. Through the masterful use of metaphor and analogy, The Elegant Universe makes some of the most sophisticated concepts ever contemplated viscerally accessible and thoroughly entertaining, bringing us closer than ever to understanding how the universe works."
  },
  {
    "ISBN": "9780465024933",
    "title": "The Feynman Lectures on Physics",
    "subtitle": "Mainly Mechanics, Radiation, and Heat",
    "authors":["Richard Phillips Feynman", "Robert B. Leighton", "Matthew Linzee Sands"],
    "categories":["Science"],
    "image": "http://books.google.com/books/content?id=bDF-uoUmttUC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "description": "\"The whole thing was basically an experiment,” Richard Feynman said late in his career, looking back on the origins of his lectures. The experiment turned out to be hugely successful, spawning publications that have remained definitive and introductory to physics for decades. Ranging from the basic principles of Newtonian physics through such formidable theories as general relativity and quantum mechanics, Feynman's lectures stand as a monument of clear exposition and deep insight. Timeless and collectible, the lectures are essential reading, not just for students of physics but for anyone seeking an introduction to the field from the inimitable Feynman."
  }
]
```

```JSON
{
  "email": "samantha@tum.de", 
  "password": "samantha_pw"
}
```
```JSON
[
  {
    "ISBN": "9780393071344",
    "title": "The Elegant Universe: Superstrings, Hidden Dimensions, and the Quest for the Ultimate Theory",
    "authors":["Brian Greene"],
    "categories":["Science"],
    "image": "http://books.google.com/books/content?id=okv_O0Xhl9gC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "A new edition of the New York Times bestseller—now a three-part Nova special: a fascinating and thought-provoking journey through the mysteries of space, time, and matter. Now with a new preface (not in any other edition) that will review the enormous public reception of the relatively obscure string theory—made possible by this book and an increased number of adherents amongst physicists—The Elegant Universe \"sets a standard that will be hard to beat\" (New York Times Book Review). Brian Greene, one of the world's leading string theorists, peels away the layers of mystery surrounding string theory to reveal a universe that consists of eleven dimensions, where the fabric of space tears and repairs itself, and all matter—from the smallest quarks to the most gargantuan supernovas—is generated by the vibrations of microscopically tiny loops of energy. Today physicists and mathematicians throughout the world are feverishly working on one of the most ambitious theories ever proposed: superstring theory. String theory, as it is often called, is the key to the Unified Field Theory that eluded Einstein for more than thirty years. Finally, the century-old antagonism between the large and the small-General Relativity and Quantum Theory-is resolved. String theory proclaims that all of the wondrous happenings in the universe, from the frantic dancing of subatomic quarks to the majestic swirling of heavenly galaxies, are reflections of one grand physical principle and manifestations of one single entity: microscopically tiny vibrating loops of energy, a billionth of a billionth the size of an atom. In this brilliantly articulated and refreshingly clear book, Greene relates the scientific story and the human struggle behind twentieth-century physics' search for a theory of everything. Through the masterful use of metaphor and analogy, The Elegant Universe makes some of the most sophisticated concepts ever contemplated viscerally accessible and thoroughly entertaining, bringing us closer than ever to understanding how the universe works."
  },
  {
    "ISBN": "9780134498034",
    "title": "Programming Pearls",
    "authors":["Jon Bentley"],
    "categories":["Computers"],
    "image": "http://books.google.com/books/content?id=4gX0CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "When programmers list their favorite books, Jon Bentley’s collection of programming pearls is commonly included among the classics. Just as natural pearls grow from grains of sand that irritate oysters, programming pearls have grown from real problems that have irritated real programmers. With origins beyond solid engineering, in the realm of insight and creativity, Bentley’s pearls offer unique and clever solutions to those nagging problems. Illustrated by programs designed as much for fun as for instruction, the book is filled with lucid and witty descriptions of practical programming techniques and fundamental design principles. It is not at all surprising that Programming Pearls has been so highly valued by programmers at every level of experience. In this revision, the first in 14 years, Bentley has substantially updated his essays to reflect current programming methods and environments. In addition, there are three new essays on testing, debugging, and timing set representations string problems All the original programs have been rewritten, and an equal amount of new code has been generated. Implementations of all the programs, in C or C++, are now available on the Web. What remains the same in this new edition is Bentley’s focus on the hard core of programming problems and his delivery of workable solutions to those problems. Whether you are new to Bentley’s classic or are revisiting his work for some fresh insight, the book is sure to make your own list of favorites."
  },
  {
    "ISBN": "9780857501004",
    "title": "A Brief History of Time",
    "subtitle": "From the Big Bang to Black Holes",
    "authors":["Stephen Hawking"],
    "categories":["Science"],
    "image": "http://books.google.com/books/content?id=xCvztgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "description": "Was there a beginning of time? Could time run backwards? Is the universe infinite or does it have boundaries? These are just some of the questions considered in an internationally acclaimed masterpiece by one of the world's greatest thinkers. It begins by reviewing the great theories of the cosmos from Newton to Einstein, before delving into the secrets which still lie at the heart of space and time, from the Big Bang to black holes, via spiral galaxies and strong theory. To this day A Brief History of Time remains a staple of the scientific canon, and its succinct and clear language continues to introduce millions to the universe and its wonders."
  },
  {
    "ISBN": "9780385319461",
    "title": "Fermat's Last Theorem",
    "subtitle": "Unlocking the Secret of an Ancient Mathematical Problem",
    "authors":["Amir D. Aczel"],
    "categories":["Mathematics"],
    "image": "http://books.google.com/books/content?id=wsMoeHSP-ZQC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "description": "Provides a study of seventeenth-century French scholar Pierre de Fermat, the centuries-long effort to prove his theorem, and the work of Andrew Wiles, a Princeton researcher who ultimately came up with the solution"
  },
  {
    "ISBN": "9780307417138",
    "title": "The Hitchhiker's Guide to the Galaxy: The Illustrated Edition",
    "authors":["Douglas Adams"],
    "categories":["Fiction"],
    "image": "http://books.google.com/books/content?id=j24GMN0OtS8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "This beautifully illustrated edition of the New York Times bestselling classic celebrates the 42nd anniversary of the original publication—with all-new art by award-winning illustrator Chris Riddell. SOON TO BE A HULU SERIES • “An astonishing comic writer.”—Neil Gaiman Nominated as one of America’s best-loved novels by PBS’s The Great American Read It’s an ordinary Thursday morning for Arthur Dent . . . until his house gets demolished. The Earth follows shortly after to make way for a new hyperspace express route, and Arthur’s best friend has just announced that he’s an alien. After that, things get much, much worse. With just a towel, a small yellow fish, and a book, Arthur has to navigate through a very hostile universe in the company of a gang of unreliable aliens. Luckily the fish is quite good at languages. And the book is The Hitchhiker’s Guide to the Galaxy . . . which helpfully has the words DON’T PANIC inscribed in large, friendly letters on its cover. Douglas Adams’s mega-selling pop-culture classic sends logic into orbit, plays havoc with both time and physics, offers up pithy commentary on such things as ballpoint pens, potted plants, and digital watches . . . and, most important, reveals the ultimate answer to life, the universe, and everything. Now, if you could only figure out the question. . . ."
  },
  {
    "ISBN": "9780226525839",
    "title": "They Thought They Were Free",
    "subtitle": "The Germans, 1933–45",
    "authors":["Milton Mayer"],
    "categories":["History"],
    "image": "http://books.google.com/books/content?id=axNDDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Interviews with ten former Nazis comprise the core of this penetrating study of the psychological causes of Nazism and their implications for modern Germany."
  },
  {
    "ISBN": "9780748133444",
    "title": "Slammerkin",
    "authors":["Emma Donoghue"],
    "categories":["Fiction"],
    "image": "http://books.google.com/books/content?id=pYcTFK8UySMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Set in London and Monmouth in the late 1700s, this is an extraordinary novel about Mary Saunders, the young daughter of a poor seamstress. Mary hungers greedily for fine clothes and ribbons, as people of her class do for food and warmth. It's a hunger that lures her into prostitution at the age of thirteen. Mary is thrown out by her distraught mother when she gets pregnant and almost dies on the dangerous streets of London. Her saviour is Doll - a prostitute. Mary roams London freely with Doll, selling her body to all manner of 'cullies', dressed whorishly in colourful, gaudy dresses with a painted red smile. Faced with bad debts and threats upon her life she eventually flees to Monmouth, her mother's hometown, where she attempts to start a new life as a maid in Mrs Jones's house. But Mary soon discovers that she can't escape her past and just how dearly people like her pay for yearnings not fitting to their class in society..."
  }
]


```
```JSON
[
  {
    "ISBN": "9780060926083",
    "title": "The Book of Laughter and Forgetting",
    "authors":["Milan Kundera"],
    "categories":["Czech Republic"],
    "image": "http://books.google.com/books/content?id=myi_ZI-XyPgC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "description": "Analyzes and examines various aspects of human existence through seven integrated stories."
  },
  {
    "ISBN": "9780141393964",
    "title": "Things Fall Apart",
    "authors":["Chinua Achebe"],
    "categories":["Fiction"],
    "image": "http://books.google.com/books/content?id=tSbWMu_-D5AC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Okonkwo is the greatest warrior alive, famous throughout West Africa. But when he accidentally kills a clansman, things begin to fall apart. Then Okonkwo returns from exile to find missionaries and colonial governors have arrived in the village. With his world thrown radically off-balance he can only hurtle towards tragedy. Chinua Achebe's stark novel reshaped both African and world literature. This arresting parable of a proud but powerless man witnessing the ruin of his people begins Achebe's landmark trilogy of works chronicling the fate of one African community, continued in Arrow of God and No Longer at Ease."
  }
]
```






