---
marp: true
theme: web-anwendungen
paginate: true
footer: "Vorlesung Web Anwendungen, Wintersemester 2026/2027"
---

<!-- _class: lead -->

# "Dynamisches" HTML
## Web Anwendungen
## Sven Eppler

![width:1100px center](./images/sodge-hochschule.png)

---

<!-- _class: chapter -->

# HTML ist statisch
## Und trotzdem ist das "moderne" Web dynamisch

---

# HTML ist statisch

- HTML als Beschreibungssprache kennt keine Dynamik
    - Keine Variablen, keine Schleifen, keine "externe" Einflussnahme
- Ein HTML-Datei auf dem Server ändert sich nicht "von selbst"
- Das kann auch ein Vorteil sein:
    - Content der sich nicht häufig ändert, muss nicht immer dynamisch erzeugt werden
    - Statischer HTML Code kann nicht "gehackt" werden (vgl. Wordpress)

---

# Was passiert im Browser

1) Browser sendet HTTP Request an Server
1) Server sendet HTTP Response an Browser
1) Browser parsed ankommendes HTML, erzeugt DOM
1) Browser zeigt HTML an

Solange jetzt keine weitere Interaktion geschieht (Mausklick, Neu laden, Formular absenden, etc.), bleibt die Website "statisch" im Browser.

---

# Was passiert im Browser

- Wird mit der statisch Website interagiert, beginnt der Zyklus von neuem.

1) Browser zerstört den "Page Context" (DOM, EventListener, etc.)
1) Leere Seite wird angezeigt
1) Browser sendet HTTP Request an Server
1) Server sendet HTTP Response an Browser
1) Browser beginnt HTML zu empfangen und zu parsen
1) Browser zeigt HTML an

Für rein statisch Webseiten war das nie ein großes Problem. Bei Web Anwendungen führt dieses Verhalten zu Problemen.

---

# Was passiert im Browser

Live-Beispiel: `$repo/beispiele/HTML/Statisches-HTML/index.html`

- Die Webseite ist statisch (Änderungen an der Datei werden erst nach einem Reload sichtbar)
- Beim wechseln zwischen `index.html` und `seite2.html` wird der DOM zerstört

---

<!-- _class: lead -->

# Mehr dynamik beim Client
## JavaScript to the rescue!

---

# JavaScript macht HTML dynamisch

- Zwei Fähigkeiten von JavaScript ermöglichen "dynamisches" HTML:
    - Es ermöglicht Manipluationen am DOM zur Laufzeit
    - Es bietet die Möglichkeit auf Events zu reagieren
- Dadurch wird es plötzlich möglich zu sagen:
> Wenn jemand auf diesen Button klickt, erzeuge ein neues HTML Element mit einem bestimmten Content

---

# Events

- Browser erzeugen verschiedenste Events:
    - Technisch bedingte (`load`, `deviceorientation`, `error`)
    - Durch Interaktion bedingt (`click`, `focus`, `keydown`)
- Auf alle diese Events kann man sich via JavaScript registrieren
    - D.H. man sagt dem Browser damit "Wenn jemand Clickt, sag mir bescheid"
    - dafür gibt es die Funktion `addEventListener`

```javascript
window.addEventListener("deviceorientation", function() {
    console.log("Das Gerät wurde gedreht");
});
```

---

# Events

- Events haben fast immer auch zusätzliche Daten

```javascript
window.addEventListener("click", function(event) {
    const clickedElement = event.target;
    console.log("Jemand hat auf etwas geklickt:", clickedElement);
});
```

---

# Events

- Events können das "standardverhalten" vom Browser unterbinden
- Das `submit`-Event wird ausgelöst, wenn ein Formular abgeschickt wird

```javascript
someForm.addEventListener("submit" => (event) {
    // Verhindert das der Browser das Formular abschickt,
    // nachdem diese Funktion ausgeführt wurde
    event.preventDefault();
})

```

---

# Document Object Model (DOM)

- Das HTML vom Server wird im Browser geparsed, dabei entsteht eine hierarchische Baumstruktur, diese wird [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) genannt

![center width:630px](images/example-dom-tree.svg)

---

# DOM: Selektieren von Elementen

- Es können einzelne oder auch viele Elemente aus dem DOM selektiert werden
- Grundsätzlich gibt es zwei elementare Wege:
    - "Tree traversal", also den Baum von Knoten zu Knoten ablaufen
    - Mittels CSS Selectoren ein Element/viele Elemente direkt selektieren

---

# DOM: Selektieren von Elementen - Tree Traversal

```html
<body>
    <p>
        Ich bin ein Absatz.
        <img src="some-pictures.jpg" />
    </p>
</body>
```

```javascript
const p = document.body.firstChild;
const img = p.children[1];
```

[MDN: Tree traversal](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Selection_and_traversal_on_the_DOM_tree#tree_traversal_at_a_high_level)

---
# DOM: Selektieren von Elementen - ID, Class, Tag

```html
<body>
    <p>
        Ich bin ein Absatz.
        <img id="mein-bild" class="bilder" src="some-pictures.jpg" />
    </p>
</body>
```

```javascript
// Plural "Elements", liefert eine HTMLCollection
document.getElementsByTagName("img"); 
document.getElementsByClass("bilder"); 
// Singular, liefert das Element oder undefined
document.getElementById("mein-bild");
```

[MDN: Selecting Elements by ID, Class, TagName](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Selection_and_traversal_on_the_DOM_tree#selecting_elements_by_id_class_or_tag_name)

---

# DOM: Selektieren von Elementen - CSS Selectors

```html
<body>
    <p>
        Ich bin ein Absatz.
        <img id="mein-bild" class="bilder" src="some-pictures.jpg" />
    </p>
</body>
```

```javascript
// Plural "Elements", liefert eine HTMLCollection
document.querySelectorAll("body p img");
// Singular, liefert das Element oder undefined
document.querySelector("body p img");
document.querySelector("#mein-bild"); // ID selector
document.querySelector("img.bilder"); // Class selector
```

[MDN: Selecting Elements with CSS selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Selection_and_traversal_on_the_DOM_tree#selecting_elements_with_css_selectors)

---

# DOM Manipulation

- Auf das Document Object Model kann man im Browser via JavaScript durch die globale Variable `document` zugreifen:
- Es ermöglicht:
    - Das ezeugen neuer Element
    - Das verschieben von Elementen im DOM
    - Das entfernen von Elementen im DOM
    - Das ersetzen von Elementen im DOM

---

# DOM: Erzeugen von Elementen

- Mittels `document.createElement()` kann ein neues HTML Element (aka Tag) erzeugt werden
- Dieses Element existiert zunächst losgelöst
    - Es hat keinen Parent
    - Es wird in der Website nicht angezeigt
- Damit es angezeigt wird, muss es in den aktuellen DOM "eingehängt" werden

```javascript
const newHeading = document.createElement("h1"); // Neues <h1> Element erzeugen
newHeading.innerText = "Ich bin der Text der Überschrift";

const parentNode = document.querySelector("body"); // Parent Element ermitteln
parentNode.appendChild(newHeading); // Neues Element dem parent als neues Kind "anhängen"
```

---

# DOM: Erzeugen von vielen Elementen

- Mittels `template`-Tags lässt sich ein ganzer HTML-Block bequem via JavaScript erzeugen:
    - Dabei wird das gesamte `template`-Element geklont
    - Der Klon kann dann verändert werden
    - Und wird als ganzes in den DOM eingehängt

[MDN: Template tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template)



---

# DOM: Manipulationen

Wichtige Funktionen:

```javascript
listOfElements.append(newHtmlElement); // als letztes Kind einfügen
listOfElements.prepend(newHtmlElement); // als erstes Kind einfügen

oldItem.replaceWith(newHtmlElement); // ersetzen
oldItem.before(newHtmlElement); // davor einfügen
oldItem.after(newHtmlElement); // danach einfügen

oldItem.remove(); // sich selbst entfernen

listOfElements.replaceChildren(newHtmlElement); // Kinder ersetzen
```

---

<!-- _class: lead -->

# JavaScript Laden
## Blockaden, Reihenfolgen, Probleme

---

# JavaScript Laden

- Grundsätzlich wird JavaScript in HTML einfach via `script`-Tag referenziert
    - Inline-Scripts werden sofort ausgeführt, sobald sie vom Parser erreicht werden
    - Externe Scripts werden erst geladen, dann sofort ausgeführt
- Beide blockieren den Render-Thread
    - D.H. langsam ausgeführtes, oder langsam geladenes JavaScript verzögern die Ansicht
- Des weiteren kann es zu Race-Conditions zwischen HTML und JavaScript kommen
    - Zugriff auf HTML-Elemente via JavaScript die erst nach dem Script im HTML definiert sind.

---

# JavaScript Laden

- Es gibt zwei Attribute die an einen Script-Tag angehängt werden können, die dieses Verhalten verändern
- Beide laden das externe Script parallel zum Render-Thread
    - `async`: Script wird ausgeführt, sobald es geladen ist. Blockiert Render-Thread potentiell "zwischendrin"
    - `defer`: Script wird erst ausgeführt, wenn der Render-Thread fertig ist aber bevor `DOMContentLoaded`-Event feuert
- Best Practice: Verwendung von `defer`.

```javascript
<script defer src="some-very-big.js"></script>
```

---

# JavaScript Laden - Wann ist alles da?

- In der Regel ist es wichtig, dass das eigene JavaScript erst ausgeführt wird, wenn auch der DOM vollständig aufgebaut ist
    - Sonst können Event-Listener nicht zu bestimmten Elementen registriert werden
    - Führt zu einer "nicht reagierenden" Anwendung
- Dafür lösen Browser ein besonderes Event aus: `DOMContentLoaded`
    - Damit signalisiert der Browser: Das DOM ist vollständig da
    - Jetzt kann aus JavaScript heraus sicher damit gearbeitet werden

---

# JavaScript Laden - Wann ist alles da?

```html
<html>
    <head>
        <script>
            document.addEventListener("DOMContentLoaded" => {
                // Wird erst ausgeführt, wenn das gesamte Dokument geladen ist
                const button = document.querySelector("button");
                button.addEventListener("click" => {
                    alert("Hier ist dein Popup");
                });
            });
        </script>
    </head>
    <body>
        <button>Popup!</button>
    </body>
</html>
```

---


<!-- _class: lead -->

# The magic sauce
## Das alles verknüpfen

---

# Events+DOM Manipulation=Dynamisches HTML

Um jetzt HTML Seiten dynamisch zu verändern benötigt es im wesentlichen nur zwei Schritte:

1) Auf `Events` reagieren
1) Innerhalb des `EventHandlers` den DOM Verändern

Auf dieser fundamentalen Idee bauen auch alle großen Single Page Application (SPA) Frameworks wie Angular, React, Svelte oder Vue.js auf.

---

# Live Beispiel

- Entwicklung einer simplen Todo-App
    - Umsetzung des reinen HTMLs
    - Ergänzen von Events
    - Dynamische Erzeugung von HTML-Elementen
    - Dynamisches Löschen von HTML-Elementen
- Wenn noch Zeit ist: Styling via [Bootstrap](https://www.getbootstrap.com)
