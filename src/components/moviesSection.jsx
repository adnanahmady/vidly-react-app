import React, { Component } from 'react';
import Movies from './movies';
import SideBar from './sidebar';
import Pagination from './common/pagination';
import { getMovies, setLike, deleteMovie } from '../services/movieService';
import search from '../utils/search';
import { toast } from 'react-toastify';
import auth from './../services/authService';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';

class MoviesSection extends Component {
  state = {
    movies: [],
    moviesItemsCount: 0,
    genre: 'All Genres',
    sortColumn: { path: 'title', order: 'asc' },
    currentPage: 1,
    itemsInPage: 4,
    search: '',
    loadingBarShow: false
  }

  async componentDidMount() {
    this.setState({ loadingBarShow: true });
    const { data: movies } = await getMovies();
    this.setState({ movies, moviesItemsCount: movies.length, loadingBarShow: false });
  }

  handleDelete = async id => {
    const {
      itemsInPage,
      currentPage,
      movies: allMovies } = this.state;
    const movies = allMovies.filter(movie => movie.id !== id);
    let { moviesItemsCount } = this.state;
    moviesItemsCount = (moviesItemsCount > 0)
      ? moviesItemsCount - 1 : movies.length;
    this.setState({ movies, moviesItemsCount });

    try {
      const user = auth.getCurrentUser();
      if (!user || user.is_admin !== true) throw new Error('only admin can delete movies');
      const { data } = await deleteMovie(id);
      toast.success(data.message);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data.message);
      } else if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.message);
      } else {
        toast.error(ex.message);
      }

      this.setState({ movies: allMovies, moviesItemsCount: allMovies.length });
    }

    if (Math.ceil(moviesItemsCount / itemsInPage) < currentPage) {
      this.setState({ currentPage: (currentPage > 2 ? currentPage - 1 : 1) });
    }
  }

  handleLike = async movie => {
    if (!auth.getCurrentUser()) {
      toast.error("please first login to your account");
      return;
    }
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };

    try {
      const { data } = await setLike(movies[index].id);
      toast.success(data.message);
      if (data.like === true) {
        movies[index].like++;
        this.setState({ movies });
      } else if (data.like === false) {
        movies[index].like--;
        this.setState({ movies });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data.message);
      } else if (ex.response && ex.response.status === 401) {
        toast.error("please first login to your account");
      }
    }
  }

  handleGenre = (genre) => {
    const movies = this.state.movies.filter(movie => (
      movie.genre.name === genre || genre === 'All Genres'));
    this.setState({ genre, currentPage: 1, moviesItemsCount: movies.length, search: '' });
  }

  handlePaginate = (index) => {
    this.setState({ currentPage: index });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  }

  handleItemsCount = (moviesItemsCount) => {
    this.setState({ moviesItemsCount });
  }

  handleSearch = ({ currentTarget: input }) => {
    this.setState({ search: input.value, moviesItemsCount: search(this.state.movies, input.value).length });
  }

  render() {
    const {
      currentPage,
      itemsInPage,
      movies,
      moviesItemsCount,
      genre,
      sortColumn,
      search
    } = this.state;

    return (
      <React.Fragment>
        <Loading
          show={this.state.loadingBarShow}
          color="yellow"
        />
        <div className="row">
          <section className="col-3">
            <SideBar
              genre={genre}
              onGenre={this.handleGenre}
            />
          </section>
          <main className="col-9">
            <Movies
              moviesItemsCount={moviesItemsCount}
              itemsInPage={itemsInPage}
              currentPage={currentPage}
              sortColumn={sortColumn}
              search={search}
              movies={movies}
              genre={genre}
              onSort={this.handleSort}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSearch={this.handleSearch}
            />
          </main>
        </div>
        <div className="row">
          <footer className="col">
            <Pagination
              currentPage={currentPage}
              onPaginate={this.handlePaginate}
              moviesItemsCount={moviesItemsCount}
              itemsInPage={itemsInPage}
            />
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default MoviesSection;
