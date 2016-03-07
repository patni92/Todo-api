var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get("/todos", function (req, res) {
    res.json(todos);
});

app.get("/", function (req, res) {
    res.send("Todo api root");
});

app.get("/todos/:id", function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo;
    for (var i = 0; i < todos.length; i += 1) {
        if (todoId === todos[i].id) {
            matchedTodo = todos[i];
        }
    }

    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
});

app.post("/todos", function (req, res) {
    var body = req.body;
    body.id = todoNextId;
    todoNextId += 1;
    todos.push(body);
    res.json(body);
});

app.listen(PORT, function () {
    console.log("express listening on port " + PORT);
});
