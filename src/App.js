import React, { Component } from 'react';
import Apps from './Apps/apps';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      search: '',
      sort: '',
      genres: '',
      error: null
    }
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  setGenres(genres) {
    this.setState({
      genres
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    if(this.state.genres) {
      params.push(`genres=${this.state.genres}`)
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get Apps at this time.'
        });
      })

  }

  render() {
    const apps = this.state.apps.map((psApp, i) => {
      return <Apps {...psApp} key={i}/>
    })
    return (
      <main className="App">
        <h1>Google Playstore Apps</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Search for a Genre: </label>
            <input
              type="text"
              id="search"
              name="search"
              value={this.state.genres}
              onChange={e => this.setGenres(e.target.value)}/>

            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="app">App</option>
              <option value="rating">Rating</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {apps}
      </main>
    );
  }
}

export default App;