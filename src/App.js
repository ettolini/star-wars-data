import React, {Component} from "react"
import CharacterSelector from "./CharacterSelector"

class App extends Component {
    constructor() {
        super()
        this.state = {
            url: {},
            characters: [],
            movies: [],
            text: ""
        }
        this.getPeople = this.getPeople.bind(this)
        this.getFilms = this.getFilms.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({text: "LOADING..."})
        
        fetch("https://swapi.dev/api/")
        .then(response => response.json())
        .then(data => {
            this.setState({ url: data })
            this.getPeople(this.state.url.people)
        })
        
    }
    
    getPeople(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ characters: data.results })
                this.getFilms(this.state.url.films)
            })
    }

    getFilms(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    movies: data.results,
                    text: "" 
                })
             })
    }

    handleChange(e) {
        try {
            const movies = this.state.movies
            const character = this.state.characters[e.target.value]
            const featuredMovies = character.films
            
            let show = `Height: ${character.height}.
                        Mass: ${character.mass}.
                        Hair color: ${character.hair_color}. 
                        Skin color: ${character.skin_color}.
                        Eye color: ${character.eye_color}.
                        Birth year: ${character.birth_year}.
                        Gender: ${character.gender}.
                        Featured movies:`

            for (let featured of featuredMovies) {
                for (let i = 1; i <= movies.length; i++) {
                    if (featured[featured.length - 2] === i.toString()) {
                        show = show.concat(" ", `"${movies[i - 1].title}".`)
                        console.log(movies[i - 1].title)
                    }
                }
            }
    
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