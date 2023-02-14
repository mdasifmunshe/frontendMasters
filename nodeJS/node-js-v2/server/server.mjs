import express from "express";
import morgan from "morgan";
import bp from "body-parser";

const app = express();

const HOST = "localhost";
const PORT = 8080;

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan("dev"));

const db = {
  todos: [],
};

// Create
app.post("/postTodo", (req, res) => {
  const newTodo = {
    complete: false,
    id: Date.now(),
    text: req.body.text,
  };
  db.todos.push(newTodo);

  res.json({ data: newTodo });
});

// READ
app.get("/getTodos", (req, res) => {
  res.json({ data: db.todos });
});

app.get("/getTodo/:id", (req, res) => {
  const todo = db.todos.find((todo) => {
    return todo.id === +req.params.id;
  });

  res.json({ data: todo });
});

// Update

// DELETE
app.delete("/deleteTodo/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
