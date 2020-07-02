import React from "react";
import "./Hangman.css";
import hangman0 from "./images/hangman1.png";
import hangman1 from "./images/hangman2.png";
import hangman2 from "./images/hangman3.png";
import hangman3 from "./images/hangman4.png";
import hangman4 from "./images/hangman5.png";
import hangman5 from "./images/hangman6.png";
import hangman6 from "./images/hangman7.png";

const Hangman = (props) => {
  let hangman = [
    hangman0,
    hangman1,
    hangman2,
    hangman3,
    hangman4,
    hangman5,
    hangman6,
  ];
  return (
    <div>
      <img
        src={props.src < 7 ? hangman[props.src] : hangman[6]}
        alt=""
        className="hangman"
      />
    </div>
  );
};

export default Hangman;
