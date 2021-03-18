import React, { Component } from "react";

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
      {props.item.text === "LOADING..." && (
        <img
          src="https://thumbs.gfycat.com/InnocentPleasedAmericangoldfinch-max-1mb.gif"
          alt="this slowpoke moves"
          class="loadingGif"
        />
      )}
      <p>{props.item.text}</p>
    </div>
  );
}

export default CharacterSelector;
