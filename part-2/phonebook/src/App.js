import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { getAll, remove, create } from "./axioscall";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({});
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleClick(e) {
    e.preventDefault();
    if (persons.find((p) => p.name === newName.name)) {
      alert(`${newName.name} is already in the list`);
    } else {
      const newData = {
        name: newName.name,
        number: newName.number,
        id: nanoid(),
      };
      create(newData).then((response) => {
        setPersons(persons.concat(response));
        setNewName({
          name: "",
          number: "",
        });
      });
    }
    setNewName({
      name: "",
      number: "",
    });
    setFilter("");
  }

  function handleDelete(id) {
    remove(id).then((response) => {
      setPersons(persons.filter((p) => p.id !== id));
    });
  }

  function handleFilter(e) {
    setFilter(e.target.value);
    setFilteredList(() => {
      return persons.filter((p) => {
        return p.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
    });
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setNewName({
      ...newName,
      [name]: value,
    });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with:{" "}
        <input type="text" onChange={handleFilter} value={filter} />
      </p>
      <form>
        <div>
          name:{" "}
          <input name="name" onChange={handleChange} value={newName.name} />
          <div>
            number:{" "}
            <input
              name="number"
              onChange={handleChange}
              value={newName.number}
            />
          </div>
        </div>
        <div>
          <button type="submit" onClick={handleClick}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filter.length === 0
        ? persons.map((person) => (
            <p key={person.name}>
              {person.name + " " + person.number}{" "}
              <button onClick={() => handleDelete(person.id)}>Delete</button>
            </p>
          ))
        : filteredList.map((person) => (
            <p key={person.name}>{person.name + " " + person.number}</p>
          ))}
    </div>
  );
};

export default App;
