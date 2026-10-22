---
marp: true
theme: web-anwendungen
paginate: true
footer: "Vorlesung Web Anwendungen, Wintersemester 2026/2027"
---

<!-- _class: lead -->

# Webframeworks 1x1
## Web Anwendungen
## Sven Eppler

![width:1100px center](./images/sodge-hochschule.png)

---
<!-- _class: lead -->

# Was tut das Webframework für mich?

---

# Conv-over-Conf vs. Conf-over-Conv

- Conventions-over-Configuration
    - Code First, think later
    - Die Konvention definiert die Projektstruktur und Methodik
    - Defaults nehmen einem Entscheidungen ab
    - "Man kommt schnell in Gang"
    - Kennt man die Konvention nicht, ist man "verloren"
    - Weicht man vom Happy Path ab, ist die Konvention oft im Weg

---

# Conv-over-Conf vs. Conf-over-Conv

- Configuration-over-Convention
    - Think first, code later
    - Funktionalität ist erst nach der Konfiguration verfügbar
    - Deutlich längere Boot-up-Phase
    - Passt sich besser dem Problem an
    - Erfordert mehr Erfahrung und vorausschauende Entscheidungen
    - Erfordert ein tiefes Verständnis des Gesamtsystems

---

# HTTP Request Parsing

- Der HTTP-Request wird vom HTTP-Server entgegengenommen und an das Framework übergeben
    - Unterstützung von HTTP/1.1, HTTP/2 und HTTP/3
- Zerlegen des Requests
    - Request Line (bei HTTP/1.1)
    - Header
    - Body
- Bereitstellen eines Request-Objekts für die weitere Verarbeitung
- Weitergabe des Requests an einen Dispatcher/Router

---

# Dispatcher // Router

- Ordnet den HTTP-Request einer Action zu
    - Eine Action ist der auszuführende Anwendungscode
- Mögliche Regeln:
    - HTTP-Verb
    - Request-Header
    - Request-URL
    - authentifizierter Benutzer
- Mögliche Ziele:
    - Actions in Controllern
    - Lambdas (In-Line-Actions)

---

# Controller

- Stammt aus dem Model-View-Controller-Pattern
    - Der Controller ist das Bindeglied zwischen Webframework und Business Logic
    - Er enthält den Code, der die Anwendungslogik implementiert
    - Funktionen und Methoden in einem Controller sind Actions
    - Diese Actions sind das Ziel des Routers/Dispatchers

---

<!-- _footer: "" -->
# Middlewares

![right width:550px](images/HTTP-Middlewares.draw.io.png)

- Middlewares sind Schichten zwischen HTTP-Parsing und Controllern / Actions
- Können den Request vorzeitig beenden
    (z. B. bei Authentication Required)
- Können die Response modifizieren
    (z. B. durch JSON-Serialisierung)
- Gemeinsame Funktionalität kann so generalisiert werden
    (z. B. Logging oder das Laden des Users aus der Datenbank)

---

# Response generieren
- Das Framework erzeugt ein Response-Objekt
    - Setzen des HTTP-Statuscodes
    - Setzen der HTTP-Header
    - Setzen des HTTP-Body
- Middlewares übernehmen die Konvertierung von High-Level-Objekten
  (z. B. JSON-Formatierung, Bildausgabe oder Template-Engine)
- Low-Level-Response-Manipulation selten notwendig
    (z. B. Header setzen oder den Body selbst schreiben)
- Das Response-Objekt wandert wieder durch die Middleware zurück und kann hier modifiziert werden

---

# Request-Lifetime

- Request-Lifetime meint:
    - Wie lange Request- und Response-spezifische Objekte innerhalb des Frameworks existieren
- Jeder Request hat seinen eigenen Context (z. B. eigene Request- und Response-Objekte)
- Sobald die Response übertragen wurde, wird der Context freigegeben und die Request-Lifetime endet
- Request- und Response-Objekte sind nicht für die dauerhafte Speicherung von Daten gedacht
- HTTP ist stateless: Zustandsdaten müssen bei Bedarf separat gespeichert und dem Request zugeordnet werden

---

# Request-Lifetime

![center width:1200px](images/RequestLifetime.png)

---

# Model-View-Controller

- Pattern für Softwaredesign
- Trennung von:
    - Datenhaltung (Model)
    - Anzeige (View)
    - Geschäftslogik (Controller)
- Auch nicht-MVC-Frameworks implementieren Teile davon (z.B. Controller)
- Frameworks:
    - Ruby on Rails, Mojolicious, Spring MVC, Django, Zend Framework
- Im Backend nach wie vor ein relevantes Pattern

---

<!-- _class: lead -->

# Wie sieht das in der Praxis aus?

---

# Route Configuration in Express

- Die „App“-Instanz von Express liefert Basis-Routing:
    - `app.get("/", (req, res) => { … });`
    - `app.post("/avatar/upload", (req, res) => { … });`
- Das „Router“-Objekt abstrahiert das Routing von der App und lässt sich dadurch in anderen Apps wiederverwenden
```javascript
var router = express.Router();
router.get("/", (req, res) => { … });
router.post("/avatar/upload", (req, res) => { … });
app.use("/", router);
```

- Details: https://expressjs.com/en/guide/routing.html

---

# Basis Routing mit Express

```javascript
var express = require('express');
var app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/path/to", (req, res) => { … });

module.exports = app;
```

---

# Routing mit Router in Express

```javascript
var express = require('express');
var router = express.Router();
var app = express();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/path/to", (req, res) => { … });

app.use('/', router);

module.exports = app;
```

---

# Basis-Routing vs. Router-Instanz

- Basis Routing
    - Sofort vorhanden
    - Routen sind fest mit der App verdrahtet
    - Für kleine Anwendungen übersichtlich
    - Komplexe Routing-Strukturen machen die App unübersichtlich und schlecht wartbar
- Router Instanz
    - Muss zunächst erzeugt werden
    - Kann in jeder Express-App eingehängt werden
    - Bei komplexem Routing können Sub-Router erzeugt werden
    - Erlaubt das Strukturieren von Routen in Ordnern/Dateien

---

# Router-Instanz: Vorteil URL-Strukturen

- Getrennte JavaScript-Datei pro Kategorie
    - z. B. `users.js`, `uploads.js`, `posts.js`
    - Jede Datei definiert das URL-Routing für ihre Kategorie
    - Typischerweise im Unterordner „routes“
- Eine Änderung in `users.js` erfordert keine Änderungen an den anderen JavaScript-Dateien
- Getrennte Verantwortlichkeiten
    - Weniger Merge-Conflicts in Git

---

# Express Beispiel: Todo API

- Im Git-Repository: `$repo/beispiele/Node.js/Todo-Backend/`