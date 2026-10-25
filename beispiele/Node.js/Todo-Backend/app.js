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

// Add some usefull endpoints...

module.exports = app;
