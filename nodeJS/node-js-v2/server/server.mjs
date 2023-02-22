import express from 'express';
import morgan from 'morgan';
import bp from 'body-parser';

const app = express();

const HOST = 'localhost';
const PORT = 8080;

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan('dev'));

const db = {
	todos: [],
};

// Default
app.get('/', (req, res) => {
	res.json({ message: 'Hello from Server' });
});

// Create
app.post('/postTodo', (req, res) => {
	const newTodo = {
		complete: false,
		id: Date.now(),
		text: req.body.text,
	};
	db.todos.push(newTodo);

	res.json({ data: newTodo });
});

// READ
app.get('/getTodos', (req, res) => {
	res.json({ data: db.todos });
});

app.get('/getTodo/:id', (req, res) => {
	try {
		const todo = db.todos.find((todo) => {
			return todo.id === +req.params.id;
		});

		res.json({ data: todo });
	} catch (error) {
		res.status(400).json({ message: 'Invalid id' });
	}
});

// Update
app.put('/updateTodo/:id', (req, res) => {
	try {
		const id = req.params.id;
		const text = req.body.text;

		const todo = db.todos.find((todo) => todo.id == id);
		todo.text = text;

		res.json({ data: todo });
	} catch (error) {
		res.status(400).json({ message: 'Invalid id' });
	}
});

// DELETE
app.delete('/deleteTodo/:id', (req, res) => {
	const id = req.params.id;

	const todoIndex = db.todos.findIndex((todo) => todo.id == id);
	db.todos.splice(todoIndex, 1);

	res.json({ message: `ID: ${id} has been deleted` });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://${HOST}:${PORT}`);
});
