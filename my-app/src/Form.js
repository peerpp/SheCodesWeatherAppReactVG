import React from "react";
import "./form.css";

export default function Form(props) {
  return (
    <form className="formDestination" onSubmit={props.onSubmit}>
      <input
        id="inputDestination"
        type="search"
        placeholder="What's your next trip?"
        autoComplete="off"
        value={props.formInput}
        onChange={props.formInputChange}
      />
      <input type="submit" value="Go!" />
    </form>
  );
}
