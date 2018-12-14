import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Form from './common/form';
import { getGenres } from '../services/genreService';
import { saveMovie, getMovie } from '../services/movieService';

class MovieForm extends Form {
  state = {
    data: {
      id: 0,
      title: "",
      genre_id: 0,
      number_in_stock: 0,
      daily_rental_rate: 0,
      like: false
    },
    genres: [],
    errors: {}
  }

  schema = {
    id: Joi.number().allow(0).optional(),
    title: Joi.string().required().label('Title'),
    genre_id: Joi.number().invalid([0, 'please select one option']).required().label('Genre'),
    number_in_stock: Joi.number().min(1).max(100).label('Number in Stock'),
    like: Joi.boolean().allow().optional(),
    daily_rental_rate: Joi.number().min(1).max(10).label('Rate')
  }

  async populateGenres() {
    const { data } = await getGenres();
    this.setState({
      genres: [
        {
          name: 'please select one option'
        }, ...data
      ]
    });
  }

  async populateMovies() {
    const { id } = this.props.match.params;
    if (id === 'new') return;

    try {
      const { data } = await getMovie(id);
      this.setState({ data });
    } catch (ex) {
      if (ex.response && (ex.response.status === 404 || ex.response.status === 400)) {
        return this.props.history.replace('/not-found');
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  doSubmit = async () => {
    try {
      const { data } = await saveMovie(this.state.data);
      toast.success(data.message);
      this.props.history.push('/movies');
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data.message);
      }
    }
  }

  render() {
    return (
      <div onSubmit={this.handleSubmit}>
        <div className="card">
          <div className="card-header">
            <div className="card-title text-center">
              <h1>Edit Movie</h1>
            </div>
          </div>
          <div className="card-body">
            <form>
              {this.renderInput('Title', 'title')}
              {this.renderSelect('Genres', 'genre_id', this.state.genres)}
              {this.renderInput('Number in Stock', 'number_in_stock', 'number')}
              {this.renderInput('Rate', 'daily_rental_rate', 'number')}
              <div className="form-group">
                {this.renderButton('Save')}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieForm;