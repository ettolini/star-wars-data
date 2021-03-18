import React from "react";

function TextLoading(props) {
  return (
    props.text === "LOADING..." && (
      <img
        src="https://thumbs.gfycat.com/InnocentPleasedAmericangoldfinch-max-1mb.gif"
        alt="this slowpoke moves"
        class="loadingGif"
      />
    )
  );
}

export default TextLoading;
