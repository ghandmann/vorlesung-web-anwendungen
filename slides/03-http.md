---
marp: true
theme: web-anwendungen
paginate: true
footer: "Vorlesung Web Anwendungen, Wintersemester 2026/2027"
---

<!-- _class: lead -->

# HTTP 1.1 / 2 / 3
## Web Anwendungen
## Sven Eppler

![width:1100px center](./images/sodge-hochschule.png)

---

<!-- _class: chapter -->

# Client-Server / Request-Response
## Basic mechanics of HTTP

---

# Client-Server-Architektur

![right](images/client-server-architektur.png)

- Server: Stellt Dienst bereit
- Client: Konsumiert Dienst
- Client baut Verbindung auf
- Prinzipbedingt zentralisiert
- Server ist "passiv"
- Client ist "aktiv"
- Beispiele: HTTP, FTP, IRC, SMTP, SSH

---

# Request-Response-Prinzip

![width:800px right](images/request-response-prinzip.png)

- Ein Client stellt einen Request.
- Der Server antwortet mit einer Response.

---
<!-- _class: lead -->

# HTTP Basics

---

# HTTP Basics

- Hypertext Transfer Protocol
- 1989, Tim Berners-Lee am CERN
- Basiert auf TCP/IP
- OSI-Schichtenmodell Schicht 7
- Anwendungsschicht
- Plain-Text Protokoll
- HTTP ist stateless (zustandslos)
- Client-Server / Request-Response Konzept

---

# HTTP Basics
- HTTP/1.x ist zeilenbasiert
  Zeilenendezeichen: `CRLF`, `0x0D 0x0A`, `\r\n`
- Eine HTTP-Nachricht besteht aus:
    - `Request-Line | Status-Line`
      Unterscheidet zwischen Request und Response
    - HTTP-Header (Kopfzeilen, Metadaten)
    - HTTP-Body (Körper, Inhalt)
- [RFC2616: Message Format](https://www.rfc-editor.org/info/rfc2616/#section-4)

---

# Request-Line & Status-Line

- Request-Line-BNF-Grammatik:
    - Request-Line = <span style="color: red;">Method</span> SP <span style="color: blue">RequestURI</span> SP <span style="color: green">HTTPVersion</span> CRLF

    Beispiel:
    <span style="color: red;">GET</span> <span style="color: blue">/</span> <span style="color: green">HTTP/1.1</span>&lt;CRLF&gt;
- Status-Line-BNF-Grammatik:
    - Status-Line = <span style="color: green;">HTTPVersion</span> SP <span style="color: red">StatusCode</span> SP <span style="color: blue">ReasonPhrase</span> CRLF

    Beispiel:
    <span style="color: green;">HTTP/1.1</span> <span style="color: red">200</span> <span style="color: blue">OK</span> CRLF

---

# HTTP Request Methods

- GET
    - Abrufen einer Ressource
- POST
    - Erzeugt eine Ressource auf dem Server
- PUT
    - Erzeugt oder ersetzt eine Ressource auf dem Server
- DELETE
    - Löscht eine Resource
- PATCH
    - Ändert eine Ressource

---

# HTTP Request Methods

- HEAD
    - Ruft Metadaten für eine Ressource ab
- TRACE
    - Spiegelt den Request an den Client
- OPTIONS
    - Welche Methoden sind für die Ressource erlaubt
- CONNECT
    - Der Proxy-Server soll zum Ziel durchstellen

---

# HTTP Response Status Codes
<div class="col-2">

- 1XX - Informationen
    - 100 Continue
    - 101 Switching Protocols
- 2XX - Erfolg
    - 200 OK
    - 201 Created
- 3XX - Umleitung
    - 301 Moved Permanently
    - 307 Temporary Redirect
- 4XX - Client Fehler
    - 400 Bad Request
    - 404 Not Found
- 5XX - Server Fehler
    - 500 Internal Server Error
    - 503 Service Unavailable
- 9XX - Keine standardisierten HTTP-Statuscodes
    - 902 wäre ein nicht standardisierter, proprietärer Code

</div>

---

# HTTP Header

- Der Header folgt auf die `Request-Line | Status-Line`
- Er besteht aus Schlüssel-Wert-Paaren, die zeilenweise getrennt werden:
    `Header-Name: Header-Value<CRLF>`
- Header dürfen mehrfach vorkommen
- Reihenfolge nicht vorgegeben
- Es gibt spezielle Request- und Response-Header, aber auch Header, die in beiden Fällen verwendet werden.
- Das Ende der Header wird durch eine Leerzeile markiert (`CRLF CRLF`).

---

# HTTP Header

Auszugsweise HTTP-Response-Headers von google.com:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=ISO-8859-1
Date: Thu, 08 Oct 2026 13:59:42 GMT
Server: gws
X-XSS-Protection: 0
X-Frame-Options: SAMEORIGIN
Expires: Thu, 08 Oct 2026 13:59:42 GMT
```

---

# HTTP Header

Wichtige Header:
    - `Content-Type`: Was ist der Body? (text/plain, text/html, video/mp4, etc.)
    - `Content-Length`: Wie lang ist der Body?
    - `Host`: Für welche Domain wurde der Request gestellt?
    - `Last-Modified`: Wann wurden die Daten zuletzt geändert?
    - `Set-Cookie`: Setzt ein Cookie auf dem Client
    - `Cookie`: Schickt ein Cookie vom Client zum Server

---

# HTTP Body

- Der Body folgt auf den Header
- Nicht jeder Request/jede Response hat einen Body:
    - GET-Requests haben üblicherweise keinen Body.
    - Auch Fehler-Responses, etwa `404 Not Found`, können einen Body enthalten.
- Transportiert die Nutzdaten (Payload)
    - Request: Formulardaten, Uploads (z. B. Bilder), JSON-Daten usw.
    - Response: HTML-Seiten, JPEG-Bilder, JSON-Daten usw.
- Wichtig: Der `Content-Length`-Header und die tatsächliche Länge des Bodys sollten übereinstimmen.

---

# HTTP Request Beispiele

Request ohne Body:
```http
GET / HTTP/1.1 <CRLF>
Host: hs-albsig.de <CRLF>
<CRLF>
```

Request mit Body:
```http
POST / HTTP/1.1 <CRLF>
Host: localhost:3000 <CRLF>
Content-Type: application/json <CRLF>
Content-Length: 18 <CRLF>
<CRLF>
{ "some": "JSON" }
```

---
# HTTP Response Beispiele
Response mit Body:
```http
HTTP/1.1 200 OK <CRLF>
Content-Length: 11 <CRLF>
Content-Type: text/plain <CRLF>
<CRLF>
Hallo Welt!
```

Response ohne Body:
```http
HTTP/1.1 301 Moved Permanently <CRLF>
Location: https://www.google.com/ <CRLF>
Date: Thu, 08 Oct 2026 14:28:50 GMT <CRLF>
Expires: Sat, 07 Nov 2026 14:28:50 GMT <CRLF>
<CRLF>
```

---

<!-- _class: image-only -->
# Sprechen Sie HTTP?

![center width:950px](images/HTTP-Anfrage.svg.png)

---

<!-- _class: lead -->

# HTTP 1 / 1.1 / 2 / 3
## Ein kurzer Rückblick

---

# HTTP 1 / 1.1

- HTTP 1.0: Jeder HTTP-Request wird als TCP/IP-Verbindung abgebildet
    - Hoher TCP/IP Overhead wg. Slow-Start-Algorithmus
    - Server schließt die Verbindung nach jeder Response
        - Daher war `Content-Length` historisch weniger wichtig.

- HTTP 1.1
    - Persistente Verbindungen (Keep-Alive) werden eingeführt.
        - Eine TCP/IP-Verbindung kann viele Request-Response-Zyklen abbilden.
        - `Content-Length` wird plötzlich wichtig
    - Pipelining wird eingeführt.
        - Es verbessert die Performance von Requests.

---

<!-- _class: image-only -->
# HTTP 1.1 Pipelining

![center width:850px](images/http-pipelining.png)

---

# HTTP 2

- Connection-Multiplexing (Streams)
    - Eine TCP/IP-Connection kann parallel für mehrere Request-Response-Zyklen genutzt werden
- Bessere Komprimierbarkeit (insbesondere der Header dank HPACK)
- Binärprotokoll
- Server Push (benötigte Ressourcen können direkt mitgeschickt werden)
- TLS ist laut Standard optional; Browser unterstützen HTTP/2 praktisch nur über TLS.

---

# HTTP 3

- HTTP/3 nutzt QUIC über UDP statt TCP.
    - Paketverlust auf einem Stream blockiert nicht die gesamte Verbindung.
- QUIC integriert TLS 1.3
- Verbindungskontinuität
    - Netzwerkwechsel zerstören bestehende Verbindungen nicht mehr (vgl. Smartphone und Funkturm)
- Schnellerer Verbindungsaufbau
    - Wiederaufnahme der verschlüsselten Verbindung ohne neuen Handshake
- Verbesserte Header-Komprimierung (QPACK)

---
# Verteilung der HTTP-Versionen


![center width:1100px](images/http-versions-verteilung.webp)

[https://blog.cloudflare.com/de-de/radar-2025-year-in-review/](https://blog.cloudflare.com/de-de/radar-2025-year-in-review/)

---

# Stateless vs. Stateful

- Für Menschen ist so gut wie alles "zustandsbehaftet"
    - Fragt man eine Person zweimal hintereinander nach ihrem Namen, ist diese Person irritiert.
    - Menschen merken sich den Zustand "Der weiß doch, wie ich heiße" und reagieren bei der zweiten Frage entsprechend anders.

- HTTP dagegen ist "zustandslos"
    - Fragt man einen Webserver mehrfach dasselbe, antwortet er jedes Mal so, als wäre es das erste und einzige Mal.
    - HTTP und damit auch Webserver merken sich keinen Zustand.

---

# HTTP is stateless
- Da HTTP inhärent zustandslos ist, stellt sich die Frage:
    - Wie "merkt" sich eine Website etwas?
        - Eingeloggt bleiben?
        - Alle Bilder eines Users anzeigen?
        - Benutzer-Tracking zu Werbezwecken?

    - Das heißt: Für jeden Request müssen alle nötigen Informationen an den Server übertragen werden.
        - Wer ist dieser Benutzer?
        - Welches Produkt soll in den Warenkorb?

---

# HTTP Cookies

- Um die immer gleiche Information immer wieder zum Server zu schicken, nutzt HTTP sog. Cookies
    - Das sind Daten, die der Server an den Client übergibt (`Set-Cookie`-Header).
    - Der Client speichert diese Daten lokal
    - Bei passenden Requests schickt der Browser die Cookies automatisch mit (`Cookie`-Header).

- So können clientseitig z. B. eine Benutzer-ID, eine Sitzungs-ID oder eine Tracking-ID abgelegt werden.
- Serverseitig lassen sich die eigentlich "zustandslosen" HTTP-Requests mithilfe dieser Informationen einem Zustand zuordnen.

---
# HTTP Cookies

- Cookies sind üblicherweise auf etwa 4 KB begrenzt.
- Cookies sind an eine Domain und optional an einen Pfad gebunden
    - Ein Cookie für `google.com` wird nicht an `amazon.com` geschickt.
    - Ein Cookie für `google.com/path` wird an passende Pfade unter `/path` geschickt, aber nicht an `/other`.

---

# HTTP Cookies

- Cookies können ein Ablaufdatum haben
    - vgl. Autologout nach 5 Minuten
- Cookies liegen "ungeschützt" beim Client!
    - Können beliebig beim Client verändert werden
    - Können bequem über die Developer-Console eingesehen/verändert werden
    - Können potenziell über JavaScript ausgelesen, verändert oder gestohlen werden
    - Für "sichere" Cookies siehe Vorlesung "Authentication"

---

# HTTP Debugging

Webanwendungen sind **verteilte Anwendungen**. Fehler können im Client, im Server und auf der Transportebene auftreten.

- Browser Cache abschalten!
- Developer Console nutzen (Network-Tab, JavaScript-Console)
- Server Logs prüfen
- `curl` (kein Caching, Debug-Ausgaben, schnell wiederholbar usw.)
- Postman (kostenpflichtig, Educational Plan)
- Insomnia
- hopscotch.io
- Telnet / Wireshark
