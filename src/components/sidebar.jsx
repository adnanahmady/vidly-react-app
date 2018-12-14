import React, { Component } from 'react';
import { getGenres } from './../services/genreService';

class SideBar extends Component {
  state = {
    genres: []
  }

  async componentDidMount() {
    const { data } = await getGenres();
    this.setState({
      genres: [
        { id: '0', name: 'All Genres' },
        ...data
      ]
    });
  }

  render() {
    const { genre, onGenre, defaultKeyName, defaultValueName } = this.props;
    const classNames = `
      list-group-item 
      list-group-item-primary 
      list-group-item-action
    `;
    return (
      <ul className="list-group">
        {this.getGenreList(genre, onGenre, classNames, defaultKeyName, defaultValueName)}
      </ul>
    );
  }

  getGenreList = (theGenre, onGenre, classNames, defaultKeyName, defaultValueName) => {
    return this.state.genres.map((genre, index) => (
      <li
        key={genre[defaultKeyName]}
        className={genre[defaultValueName] === theGenre ? classNames + 'active' : classNames}
        style={{ cursor: 'pointer' }}
        onClick={() => onGenre(genre[defaultValueName])}
      >
        {genre[defaultValueName]}
      </li>
    ));
  }

  getList = (movies, theGenre, onGenre, classNames) => {
    let genres = [];
    movies.map(movie => genres.push(movie.genre.name));
    const clone = [...new Set(genres)];
    return clone.map((genre, index) => (
      <li
        key={index}
        className={genre === theGenre ? classNames + 'active' : classNames}
        style={{ cursor: 'pointer' }}
        onClick={() => onGenre(genre)}
      >
        {genre}
      </li>
    ))
  }
}

SideBar.defaultProps = {
  defaultKeyName: 'id',
  defaultValueName: 'name'
};

export default SideBar;