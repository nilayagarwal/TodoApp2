const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname)));


app.use(bodyParser.json());


let todos = [];


function findIndex(arr, id) {
    return arr.findIndex(item => item.id === id);
}

function removeAtIndex(arr, index) {
    return arr.filter((_, i) => i !== index);
}


app.get('/todos', (req, res) => res.json(todos));

app.get('/todos/:id', (req, res) => {
    const index = findIndex(todos, parseInt(req.params.id));
    index === -1 ? res.status(404).send() : res.json(todos[index]);
});

app.post('/todos', (req, res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
    const index = findIndex(todos, parseInt(req.params.id));
    if (index === -1) return res.status(404).send();
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
    const index = findIndex(todos, parseInt(req.params.id));
    if (index === -1) return res.status(404).send();
    todos = removeAtIndex(todos, index);
    res.status(200).send();
});


app.use((req, res) => res.status(404).send());

app.listen(3001, () => console.log("Server running at http://localhost:3001"));
