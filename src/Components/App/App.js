import React, { Component } from "react"
import './App.css';
import Cardlist from "../Cardlist/Cardlist";
import Header from "../Header/Header";
import SearchBox from "../SearchBox/SearchBox";
import Loading from "../Loading/Loading";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchFieald: ""
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      return response.json();
    })
    .then(users => {
      this.setState({robots: users})
    })
  }

  onSearchChange(event) {
    this.setState({searchFieald: event.target.value});
  }

  render() {
    const { robots, searchFieald } = this.state;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchFieald.toLowerCase());
    })

    if (robots.length === 0) {
      return(
        <div className="home">
          <Header />
          <SearchBox searchChange={this.onSearchChange}/>
          <Loading position="center"/>
        </div>
      ); 
    }
    else {
      return(
        <div className="home">
          <Header />
          <SearchBox searchChange={this.onSearchChange}/>
          <Cardlist robots={filteredRobots} />
        </div>
      );
    }
  }
}

export default App;