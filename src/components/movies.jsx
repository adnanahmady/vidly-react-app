import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import auth from './../services/authService'
import search from './../utils/search';
import paginate from './../utils/paginate';
import Table from './common/table';
import Like from './common/like';
import Input from './common/input';

class Movies extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => this.getMovieTitle(movie)
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'number_in_stock', label: 'Stock' },
    { path: 'daily_rental_rate', label: 'Rate' }
  ];

  likeColumn = {
    path: 'like',
    label: 'Like',
    content: movie => (<Like
      onLike={() => this.props.onLike(movie)}
      movie={movie}
    />)
  };

  deleteColumn = {
    path: 'onDelete',
    label: 'Manage',
    content: movie => (
      auth.getCurrentUser() &&
      <button className="btn btn-danger btn-md"
        onClick={() => this.props.onDelete(movie.id)}
      >Delete</button>
    )
  };


  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user) {
      this.columns.push(this.likeColumn);
      this.columns.push(this.deleteColumn);
    }
  }

  getMovieTitle = movie => {
    if (auth.getCurrentUser()) {
      return (
        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
      );
    }

    return movie.title;
  };

  renderFilters = () => {
    const {
      currentPage,
      itemsInPage,
      sortColumn
    } = this.props;

    const filtered = this.handleFilterBySearch();
    const ordered = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    const movies = paginate(ordered, currentPage, itemsInPage);

    return { movies };
  }

  handleFilterBySearch = () => {
    const { genre, movies } = this.props;

    if (this.props.search === '') {
      return movies.filter(m => m.genre.name === genre || genre === 'All Genres');
    }

    return search(movies, this.props.search);
  }

  renderInput = (label, name, onChange, type = 'text') => {
    return (
      <Input
        type={type}
        label={label}
        name={this.props[name]}
        value={this.props[name]}
        error={null}
        placeholder="Search..."
        onChange={onChange}
      />
    );
  }

  tablesManage() {
    return (
      <React.Fragment>
        {auth.getCurrentUser() &&
          <Link className="btn btn-primary btn-md my-2" to="/movies/new">New Movie</Link>}
        {this.renderInput("Search", "search", this.props.onSearch)}
      </React.Fragment>
    );
  }

  render() {
    const {
      moviesItemsCount,
      sortColumn,
      onSort,
    } = this.props;

    const { movies } = this.renderFilters();

    if (moviesItemsCount === 0)
      return (
        <React.Fragment>
          <p className="my-2">there is no movies in the database.</p>
          {this.tablesManage()}
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <p className="my-2">there is {moviesItemsCount} movies in the database.</p>
        {this.tablesManage()}
        <Table
          sortColumn={sortColumn}
          onSort={onSort}
          columns={this.columns}
          data={movies}
        />
      </React.Fragment>
    );
  }
}

export default Movies;