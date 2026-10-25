---
marp: true
theme: web-anwendungen
paginate: true
footer: "Vorlesung Web Anwendungen, Wintersemester 2026/2027"
---

<!-- _class: lead -->

# RESTfull APIs
## Web Anwendungen
## Sven Eppler

![width:1100px center](./images/sodge-hochschule.png)

---

<!-- _class: lead -->

# The web beyond HTML

---

# RESTfull APIs

- Representational State Transfer (REST)
- Programmierkonzept zur Strukturierung von APIs
- 1994 von Roy Fielding entworfen
- Baut auf semantischen Konzepten von HTTP auf
- Verwendung bei:
    - WebServices (z. B. Wetterdaten, Cryptobörsen)
    - Machine2Machine Kommunikation (z. B. IoT, Microservices, Cloud-Anbindungen)

---

# RESTfull APIs

- REST liefert typischerweise kein HTML als Response
- Stattdessen strukturierte Daten für maschinelle Auswertung
    - JSON, XML, Markdown, etc.
- Je nach Anforderung, werden die Daten dann vom Client grafisch aufgearbeitet
    - z.B. in HTML überstzt oder Native-UIs auf Smartphones gezeichnet
    - Hohe Wiederverwendbarkeit: Die selbe Datenquelle kann auf unterschiedlichsten Endgeräten genutzt werden
- REST APIs sind stateless und lassen sich daher gut skalieren (vgl. HTTP)

---

# Semantik von HTTP Methoden in REST

- **GET** Abrufen einer Resource (Seiteneffektfrei)
- **POST/PUT**: Anlegen einer neue Subresource
- **PATCH**: Einen Teil einer Resource ändern
- **DELETE**: Löschen einer Resource
- **HEAD**: Anfragen von Metadaten zu einer Resource
- **OPTIONS**: Anfragen welche Methoden für eine Resource erlaubt sind

---

# RESTfull URL Design

- RESTfull APIs benutzen URL Strukturen um die Angebotenen Resourcen zu strukturieren
    - URL Namensräume
- GET Parameter werden vermieden, da für die selbe URL anhand der HTTP Methode unterschiedliche Aktionen ausgeführt werden können
- Für spätere Erweiterbarkeit werden REST URLs empfiehlt sich eine Versionierung
- Häufig bekomme die konkreten Entitäten einer Anwendung dazu passende Namensräumen (z. B. `Users` -> `/api/v1/users)

---

# RESTfull URL Design

Beispiele:

<div class="col-2">

- `GET /v1/users/`
    - Listet alle User
- `GET /v1/users/12/`
    - Ruft User mit ID 12 ab
- `DELETE /v1/users/12/`
    - Löscht User mit ID 12
- `POST /v1/users/`
    - Fügt einen neuen User hinzu
- `GET /v1/users/12/avatar/`
    - Ruft Avatar für User mit ID 12 ab
- `POST /v1/users/12/avatar/`
    - Lädt Avatar für User mit ID 12 hoch

</div>

**WICHTIG**: Immer wenn es um "ein konkretes Ding" geht, ist die ID anzugeben!

---

# OpenAPI Specification

- [OpenAPI Specification](https://learn.openapis.org) ist ein offener Standard zum beschreiben von RESTfull APIs
- Swagger ist eine Implementierung der OpenAPI Specification, zum Dokumentieren und Testen von RESTfull APIs
- Auf Basis einer `swagger.json` nach OpenAPI Spezifikation lassen sich z.B.
    - API-Clients generieren
    - Server-Stubs generieren
    - UnitTests generieren
    - Beispiel: https://petstore.swagger.io/

---

# RESTfull in Express

- Express bietet alle notwendigen Kompomenten für RESTfull WebAPIs
- Beispiel: `$repo/Beispiele/Node.js/Todo-Backend`