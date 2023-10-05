import React from "react";

/* STATELESS CHILD COMPONENT */
const MainForm = ({ onChange, onClick }) => {
  return (
    <div>
      <hr />
      Enter a plant name:
      <form>
        <input text="test" onChange={onChange} />
        <button type="submit" onChange={onClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default MainForm;

