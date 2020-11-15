import React from "react";

import "./form.css";

export default function Form() {
  return (
    <form className="formDestination">
      <input
        id="inputDestination"
        type="search"
        placeholder="What's your next trip?"
        autocomplete="off"
      />
      <input type="submit" value="Go!" />
    </form>
  );
}
