import { Component } from 'react';

import SearchBox from './components/search-bar/search-box.components';
import CardList from './components/card-list/card-list.component';
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      robots: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(() => {
        return { robots: users }
      }))
  }
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => ({ searchField }))
  }

  render() {

    const { robots, searchField } = this.state;
    const { onSearchChange } = this;

    const filterdrobots = robots.filter((robot) => {
      return robot.name.toLocaleLowerCase().includes(searchField);
    })

    return (
      <div className="App">
        <h1 className='app-title'>Robots Rolodex</h1>
        <SearchBox
          className='search-box'
          onChangeHandler={onSearchChange}
          placeholder='search robots'
        />
        <CardList robots={filterdrobots} />
      </div>
    );
  }
}

export default App;
