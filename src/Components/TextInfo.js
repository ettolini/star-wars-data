import React from "react";

function TextInfo(props) {
  const listComponents = props.text.map((item, index) => (
    <li key={index}>{item}</li>
  ));

  return <ul>{listComponents}</ul>;
}

export default TextInfo;
