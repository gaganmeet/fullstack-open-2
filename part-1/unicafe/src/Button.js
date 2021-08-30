import React from "react";

const Button = ({ text, setState }) => {
  return (
    <>
      <button onClick={() => setState((prev) => prev + 1)}>{text}</button>
    </>
  );
};

export default Button;
