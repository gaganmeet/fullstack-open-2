import React, { useState } from "react";
import Button from "./Button";
import StatisticLine from "./StatisticLine";
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <>
      <h1>give feedack</h1>
      <Button text="good" setState={setGood} />
      <Button text="bad" setState={setBad} />
      <Button text="neutral" setState={setNeutral} />
      <h1>statistics</h1>
      {!good && !neutral && !bad ? (
        <p>No feedback given</p>
      ) : (
        <>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={good + neutral + bad} />
          <StatisticLine
            text="average"
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticLine
            text="positive"
            value={good / (good + neutral + bad)}
          />
        </>
      )}
    </>
  );
};

export default App;
