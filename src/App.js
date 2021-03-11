import React, {Component} from "react"

class App extends Component {
    constructor() {
        super()
        this.state = {
            characters: [],
            text: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({text: "loading..."})

        fetch("https://swapi.dev/api/people/")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    text: "",
                    characters: data.results
                })
            })
    }

    handleChange(e) {
        const character = this.state.characters[e.target.value]
        const show = `Height: ${character.height}.
Mass: ${character.mass}.
Hair color: ${character.hair_color}. 
Skin color: ${character.skin_color}.
Eye color: ${character.eye_color}.
Birth year: ${character.birth_year}.
Gender: ${character.gender}.`

        this.setState({
            text: show
        })
    }

    render() {
        const optionComponents = this.state.characters.map((character, index) => (
            <option
                key={index}
                value={index}
            >
                {character.name}
            </option>
        ))

        return (
            <div>
                <div class="header">
                    <h1>Star Wars Character Data</h1>
                </div>
                <select onChange={this.handleChange}>
                    <option value="">
                        -- Choose a character --
                    </option>
                    {optionComponents}
                </select>
                <p>{this.state.text}</p>
            </div>
        )
    }
}

export default App