const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./contact");
const port = process.env.PORT || 5000;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.delete("/persons/:id", (req, res) => {
  const { id } = req.params;
  Contact.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

app.post("/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }
  const contact = new Contact({
    name: body.name,
    number: body.number,
  });
  contact.save().then((savedContact) => {
    res.json(savedContact);
  });
});

/*
app.get("/info", (req, res) => {
  res.send(`Phone book has record of ${persons.length} people`);
});
*/

app.get("/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/persons", (req, res) => {
  Contact.find({}).then((contacts) => {
    res.json(contacts);
  });
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
