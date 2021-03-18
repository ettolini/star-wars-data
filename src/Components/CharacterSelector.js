import React from "react";

import TextLoading from "./TextLoading";

function CharacterSelector(props) {
  const optionComponents = props.item.characters.map((character, index) => (
    <option key={index} value={index}>
      {character.name}
    </option>
  ));

  // TODO: separate loading text from display text
  return (
    <div>
      <select onChange={props.handleChange}>
        <option value="">-- Choose a character --</option>
        {optionComponents}
      </select>
      <TextLoading text={props.item.text} />
      <p>{props.item.text}</p>
    </div>
  );
}

export default CharacterSelector;
