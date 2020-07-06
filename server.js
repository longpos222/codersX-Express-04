const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.set("view engine", "pug");
app.set("views", "./views");

var port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var todosList = [
  { id: 1, action: "đi chợ" },
  { id: 2, action: "nấu cơm" },
  { id: 3, action: "rửa bát" },
  { id: 4, action: "học code tại codersX" }
];

app.get("/", (request, response) => {
  response.send(
    '<h1>I love CodersX</h1><br><a href="./todos">Todos list</a><br><a href="./todos/search">Search</a><br><a href="./todos/create">Create</a>'
  );
});

app.get("/todos", function(req, res) {
  res.render("index", {
    todosList: todosList
  });
});

app.get("/todos/search", function(req, res) {
  var q = req.query.q;
  var matchedTodos = todosList;

  if (q) {
    matchedTodos = todosList.filter(function(todo) {
      return todo.action.indexOf(q) !== -1;
    });
  }

  res.render("index", {
    todosList: matchedTodos
  });
});

app.get("/todos/create", function(req, res) {
  res.render("create");
});

app.post("/todos/create", function(req, res) {
  todosList.push(req.body);
  res.redirect("/todos");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
