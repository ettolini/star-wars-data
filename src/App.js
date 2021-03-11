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
                {
                    this.state.text === "LOADING..." &&
                        <img src="https://thumbs.gfycat.com/InnocentPleasedAmericangoldfinch-max-1mb.gif" alt="this slowpoke moves"  width="250" alt="404 image"/>
                }
                <p>{this.state.text}</p>
            </div>
        )
    }
}

export default App