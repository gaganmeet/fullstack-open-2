import React from "react";

const Total = ({ parts }) => {
  const total = () => {
    let total = 0;
    for (let i = 0; i < parts.length; i++) {
      total += parts[i].exercises;
    }
    return total;
  };
  return (
    <div>
      <p>Total {total()} Exercises</p>
    </div>
  );
};

export default Total;
