import React from "react";

import TextLoading from "./TextLoading";
import TextInfo from "./TextInfo";

function CharacterSelector(props) {
  const optionComponents = props.item.characters.map((character, index) => (
    <option key={index} value={index}>
      {character.name}
    </option>
  ));

  return (
    <div>
      <select onChange={props.handleChange}>
        <option value="">-- Choose a character --</option>
        {optionComponents}
      </select>
      {!Array.isArray(props.item.text) ? (
        <TextLoading text={props.item.text} />
      ) : (
        <TextInfo text={props.item.text} />
      )}
    </div>
  );
}

export default CharacterSelector;
