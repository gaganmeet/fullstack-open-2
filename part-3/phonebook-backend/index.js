const express = require("express");
const app = express();
const { nanoid } = require("nanoid");
const morgan = require("morgan");
const cors = require("cors");

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const port = process.env.PORT || 5000;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// DELETE /persons/:id
app.delete("/persons/:id", (request, response) => {
  const id = request.params.id;
  console.log(id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/persons", (req, res) => {
  const person = req.body;
  const idx = persons.findIndex((person) => person.name === person.name);
  if (idx === -1 || person.name === undefined || person.number === undefined) {
    res.status(400).json({ error: "try different query" });
  } else {
    persons.push(person);
  }
  res.json(person);
});

app.get("/info", (req, res) => {
  res.send(`Phone book has record of ${persons.length} people`);
});

app.get("/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("Person not found");
  }
});

app.get("/persons", (req, res) => {
  res.json(persons);
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
