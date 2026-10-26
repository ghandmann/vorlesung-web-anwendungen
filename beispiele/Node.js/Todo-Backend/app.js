var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Vereinfachung: Alle TodoItems werden in einer Liste im Speicher gehalten
// Ein neustarte des Servers löscht daher auch alle Einträge.
app.inMemoryStore = [];

// Listet alle Todos auf
app.get("/api/v1/todos", (req, res) => {
    res.send(app.inMemoryStore);
});

// Fügt neues TodoItem hinzu
app.post("/api/v1/todos", (req, res) => {
    const todoItem = req.body;

    // TODO: Validation...

    app.inMemoryStore.push(todoItem);

    res.send("OK");
});

// Löscht TodoItem aus inMemoryStore
app.delete("/api/v1/todos/:id", (req, res) => {
    const idToDelete = Number.parseInt(req.params.id);

    app.inMemoryStore = app.inMemoryStore.filter((todoItem) => {
        return todoItem.id !== idToDelete;
    });

    res.send("OK");
});

module.exports = app;
