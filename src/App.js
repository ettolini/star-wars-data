import React, {Component} from "react"

class App extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            character: {}
        }
        this.newCharacter = this.newCharacter.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
            })
    }
    
    handleChange(e) {
        this.newCharacter(e.target.value)
    }
    
    render() {
        const { name, gender, height, mass } = this.state.character
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

        if (!this.state.loading)
            text = name != undefined ? `Gender: ${gender} - Height: ${height} - Mass: ${mass}` : ""

        return (
            <div>
                <h1>Star Wars Date Simulator</h1>
                <p>{text}</p>
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
