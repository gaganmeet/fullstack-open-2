const express = require("express")();
const { nanoid } = require("nanoid");

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
const port = 5000;

express.delete("/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

express.post("/persons", (req, res) => {
  const idx = persons.findIndex((person) => person.name === req.query.name);
  if (
    idx !== -1 ||
    req.query.name === undefined ||
    req.query.number === undefined
  ) {
    res.status(400).json({ error: "try different query" });
  } else {
    const id = nanoid();
    persons.push({
      id,
      name: req.query.name,
      number: req.query.number,
    });
    res.send(`Created ${req.query.name}`);
  }
});

express.get("/info", (req, res) => {
  res.send(`Phone book has record of ${persons.length} people`);
});

express.get("/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("Person not found");
  }
});

express.get("/persons", (req, res) => {
  res.json(persons);
});

express.listen(port, () => {
  console.log(`listening to port ${port}`);
});
