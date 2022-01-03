<p align="center">
  <a href="http://dev.app.kodebi.de">
    <img src="client/src/static/kodebi_logo_classic.svg" width="250">
  </a>
</p>
<h1 align="center">
  Kodebi Web App
</h1>

### Pakete installieren
```
npm install
Falls es einen Fehler geben sollte:
npm install --legacy-peer-deps
```

### Während der Entwicklung
Als Datenbank wird mongodb benutzt, welches vorher installiert werden muss:
[https://docs.mongodb.com/manual/installation/]
Datenbank starten mit
```
mongod
```

Server starten
```
npm run dev
```

Später dann
```
npm run start
```

Im Browser aufrufen:
http://localhost:3000

### Beschreibung
Kodebi backend mit create, update, delete (CRUD) und authentication-authorization (auth)
Testen mit https://install.advancedrestclient.com/install

Body-Content-Type: application/json
Editor-view: Json visual Editor

#### application programming interface (API)
| Route         | HTTP Methode           | Beschreibung  |
| ------------- |:-------------:| -----:|
| `/api/users`          |`POST`     | Erstelle Benutzer     |
| `/api/users`          | `GET`     | Liste aller Benutzer  |
| `/api/users/:userId`  | `GET`     | Rufe bestimmten Benutzer auf|
| `/api/users/:userId`  | `PUT`     | aktualisiere Benutzer|
| `/api/users/:userId`  | `DELETE`  | Lösche Benutzer|
| `/auth/signin`        | `POST`    | Anmelden|
| `/auth/signout`       | `GET`     | Abmelden|

### Benutzer Felder in der Datenbank
| Feld        | Typ           | Beschreibung  |
| ------------- |:-------------:| -----:|
| name      | string| Notwendig |
| email     | string| Notwendig (einzigartig) |
| password  | string| Notwendig Passwort wird verschlüsselt gespeichert|
| createdAt | Date  | Wann wurde der Benutzer erstellt? Automatisch generiert|
| updatedAt | Date  | Wann wurde der Benutzer aktualisiert? Automatisch generiert|
| group     | string | Optional |

### Bücher API
| Route         | HTTP Methode           | Beschreibung  |
| ------------- |:-------------:| -----:|
| `/api/books/`          |`POST`     | Erstelle Buch     |
| `/api/books/`          | `GET`     | Liste aller Bücher  |
| `/api/books/:bookId`   | `GET`     | Finde ein bestimmtes Buch  |
| `/api/books/:bookId`   | `PUT`     | Verändere Buch  |
| `/api/books/image/:bookId` | `PUT` | Verändere nur das Bild von Buch |
| `/api/books/:bookId`   | `DELETE`  | Lösche Buch  |
| `/api/books/user/:userId`| 'GET' | Erhalte alle Bücher eines bestimmten Users|

### Bücher Felder in der Datenbank
| Feld        | Typ           | Beschreibung  |
| ------------- |:-------------:| -----:|
| name      | string| Notwendig |
| author    | string| Notwendig |
| category  | string| Notwendig |
| language  | string| Notwendig |
| condition | string| Notwendig |
| description | string | Notwendig |
| status    | string| optional  |
| owner     | User  | Notwendig Wird später automatisch generiert |
| createdAt | Datum | Wird automatisch generiert |
| updatedAt | Datum | Wird automatisch generiert |
| group     | string | Optional |

### Nachrichten API
| Route         | HTTP Methode           | Beschreibung  |
| ------------- |:-------------:| -----:|
| `/api/messages`          |`POST`     | Erstelle Nachricht/Konversation     |
| `/api/messages/:convId`   | `GET`     | Erhalte Konversation  |
| `/api/messages/:convId`   | `POST`     | Schicke Nachricht/Update Konversation  |
| `/api/messages/:convId`   | `DELETE`     | Lösche Konversation  |
| `/api/messages/user/:userId`   | `GET`     | Erhalte alle Nachrichten vom User  |

### Nachrichten Felder in der Datenbank
| Feld        | Typ           | Beschreibung  |
| ------------- |:-------------:| -----:|
| sender      | mongoose.userid| Notwendig |
| reciever    | mongoose.userid| Notwendig |
| message     | string| Notwendig |
| createdAt   | Datum | Wird automatisch generiert |
| updatedAt   | Datum | Wird automatisch generiert |
| group     | string | Optional |

### Konversation Felder in der Datenbank
| Feld        | Typ           | Beschreibung  |
| ------------- |:-------------:| -----:|
| recipients   | array von mongoose.userid| Wird automatisch gesetzt (nicht veränderbar) |
| messages    | arrray von mongoose.MessageID| Neue Nachrichten werden automatisch eingefügt |
| createdAt   | Datum | Wird automatisch generiert |
| updatedAt   | Datum | Wird automatisch generiert |
| readAt     | Datum | Zeigt an wann die Konversation das letzte mal aufgerufen wurde |
| topic     | string | Optional |
| group     | string | Optional |

Bei ungelesen Nachrichten ist der Zeitstempel updatedAt neuer als readAt und der Sender der Nachricht ist nicht der gerade eingeloggte Benutzer
updatedAt > readAt und Sender der letzten Nachricht != Gerade eingeloggter Benutzer

### requestPasswordReset
| Feld        | Typ           | Beschreibung  |
| ------------- |:-------------:| -----:|
| mail   | string| Mail des Users |

### resetPassword
| Feld        | Typ           | Beschreibung  |
| ------------- |:-------------:| -----:|
| userId     | mongoose.userid  | ID des Users |
| token      | string           | Token zum zurücksetzen |
| password   | string           | Neues Passwort |

