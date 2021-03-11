import React, {Component} from "react"
import CharacterSelector from "./CharacterSelector"

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
        this.setState({text: "LOADING..."})

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
        try {
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

        catch(error) {
            this.setState({
                text: ""
            })
        }
    }

    render() {
        return (
            <div>
                <div class="header">
                    <h1>Star Wars Character Data</h1>
                </div>
                <CharacterSelector handleChange={this.handleChange} item={this.state}/>
            </div>
        )
    }
}

export default App