import Joi from 'joi-browser';
import React from 'react';

import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
import Form from './common/form';

class MovieForms extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const { id: movieId } = this.props.match.params;
      if (movieId === 'new') return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response.status === 404) {
        this.props.history.replace('/not-found');
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  shema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().required().min(0).max(100).label('Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate'),
  };

  doSubmit = async () => {
    console.log('Submitted');
    await saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie Forms</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Stock')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForms;
