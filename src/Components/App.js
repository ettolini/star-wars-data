import React, { Component } from "react";

import Header from "./Header";
import CharacterSelector from "./CharacterSelector";

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: {},
      characters: [],
      movies: [],
      text: "",
    };
    this.getPeople = this.getPeople.bind(this);
    this.getFilms = this.getFilms.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ text: "LOADING..." });

    fetch("https://swapi.dev/api/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ url: data });
        this.getPeople(this.state.url.people);
      });
  }

  getPeople(url) {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ characters: data.results });
          this.getFilms(this.state.url.films);
        });
    } catch (error) {
      console.log(
        "An unexpected error has occurred when fetching character basic data."
      );
    }
  }

  getFilms(url) {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            movies: data.results,
            text: "",
          });
        });
    } catch (error) {
      console.log("An unexpected error has occurred when fetching movie data.");
    }
  }

  handleChange(event) {
    try {
      const { movies } = this.state;
      const character = this.state.characters[event.target.value];
      const featuredMovies = character.films;

      const displayText = [
        "Height: " + character.height,
        "Mass: " + character.mass,
        "Hair color: " + character.hair_color,
        "Skin color: " + character.skin_color,
        "Eye color: " + character.eye_color,
        "Birth year: " + character.birth_year,
        "Gender: " + character.gender,
        "Featured movies: ",
      ];

      for (let featured of featuredMovies)
        for (let i = 1; i <= movies.length; i++)
          if (featured[featured.length - 2] === i.toString())
            displayText.push('"' + movies[i - 1].title + '"');

      this.setState({ text: displayText });
    } catch (error) {
      this.setState({ text: "" });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <CharacterSelector handleChange={this.handleChange} item={this.state} />
      </div>
    );
  }
}

export default App;
