import React, {Component} from "react"

class App extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            character: {},
            movies: []
        }
        this.getMovie = this.getMovie.bind(this)
        this.newCharacter = this.newCharacter.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    getMovie(url) {
        this.setState({loading: true})
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState(prevState => {
                    console.log(prevState.movies)
                    prevState.movies.push(data.title)

                    return {
                        loading: false,
                    }
                })
            })
    }

    newCharacter(n) {
        this.setState({loading: true})
        fetch("https://swapi.dev/api/people/" + n)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    character: data,
                })
                const films = this.state.character.films
                console.log(films)
                films.forEach(film => {
                    this.getMovie(film)
                })
            })
    }
    
    handleChange(e) {
        this.newCharacter(e.target.value)
    }
    
    render() {
        const { name, gender, height, mass } = this.state.character
        const { movies } = this.state

        let text = "loading..."

        const characters = ['Luke Skywaker',
                            'C3-PO',
                            'R2-D2',
                            'Darth Vader',
                            'Leia Organa'
                            ]

        const optionComponents = characters.map((character, index) => (
            <option
              key={index}
              value={`${(index + 1).toString()}/`}
            >
              {character}
            </option>
        ));

        const listComponents = movies.map((movie, index) => (
            <li
                key={index}
            >
                {movie}
            </li>
        ));

        if (!this.state.loading)
            text = name != undefined ?
                `Gender: ${gender} - Height: ${height} - Mass: ${mass}` : ""

        return (
            <div>
                <h1>Star Wars Date Simulator</h1>
                
                <p>{text}</p>

                <ul>
                    {listComponents}
                </ul>
                
                <select
                        onChange={this.handleChange}
                >
                    <option value="">
                        -- Choose a partner --
                    </option>
                    {optionComponents}
                
                </select>
            </div>
        )
    }
}

export default App
