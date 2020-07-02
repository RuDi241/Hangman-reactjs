import React from "react";
import Hangman from "./Hangman";
import "./App.css";
import words from "./words.json";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretWord: words.words[
        Math.floor(Math.random() * (words.words.length + 1))
      ].toLowerCase(),
      guessedLetters: new Set(),
      mistakes: 0,
      currentLetter: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.generateGuessedWord = this.generateGuessedWord.bind(this);
    this.generateGuessedLetters = this.generateGuessedLetters.bind(this);
    this.reset = this.reset.bind(this);
  }
  handleChange = (e) => {
    this.setState({
      currentLetter: e.target.value.charAt(e.target.value.length - 1),
    });
  };

  handleClick = () => {
    if (this.state.guessedLetters.has(this.state.currentLetter)) {
      alert("You guessed this letter before! Try another one!");
    } else if (
      this.state.currentLetter.charCodeAt(0) < 97 ||
      this.state.currentLetter.charCodeAt(0) > 122
    ) {
      alert("invalid input!");
    } else {
      this.setState((prevState) => ({
        guessed: prevState.guessedLetters.add(prevState.currentLetter),
        mistakes:
          prevState.mistakes +
          (this.state.secretWord.indexOf(this.state.currentLetter) !== -1
            ? 0
            : 1),
      }));
    }
  };

  generateGuessedWord = () => {
    let x = true;
    this.state.secretWord
      .split("")
      .forEach((element) =>
        this.state.guessedLetters.has(element) ? null : (x = false)
      );
    if (this.state.mistakes > 6)
      return "You lose! Correct word is: " + this.state.secretWord;
    else {
      if (x) return "You won!";
      else {
        return this.state.secretWord
          .split("")
          .map((letter) =>
            this.state.guessedLetters.has(letter) ? letter.concat(" ") : " _"
          );
      }
    }
  };

  generateGuessedLetters = () => {
    let letters = "";
    this.state.guessedLetters.forEach((letter) =>
      this.state.secretWord.indexOf(letter) === -1
        ? letters === ""
          ? (letters += letter)
          : (letters += ", " + letter)
        : null
    );
    return letters;
  };

  reset = () => {
    this.setState({
      secretWord: words.words[
        Math.floor(Math.random() * (words.words.length + 1))
      ].toLowerCase(),
      guessedLetters: new Set(),
      mistakes: 0,
      currentLetter: "",
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="header" onClick={this.reset}>
          Hangman
        </h1>
        <button type="button" onClick={this.reset} className="reset">
          Reset
        </button>
        <input
          type="text"
          name="guess"
          id="guess"
          value={this.state.currentLetter}
          onChange={this.handleChange}
          placeholder="Enter a letter"
        />
        <button type="button" onClick={this.handleClick}>
          Guess
        </button>
        <Hangman src={this.state.mistakes} />
        <h3>Lives : {7 - this.state.mistakes}</h3>
        <h3>{this.generateGuessedWord()}</h3>
        <p>Guessed letters : </p>
        <p>{this.generateGuessedLetters()}</p>
      </div>
    );
  }
}

export default App;
