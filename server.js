var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
    id: 1,
    description: "Meet mom for lunch",
    completed: false,
}, {
    id: 2,
    description: "go to market",
    completed: false,
}, {
    id: 3,
    description: "Go and study",
    completed: true,
},
];

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

app.listen(PORT, function () {
    console.log("express listening on port " + PORT);
});
