const ERROR_MESSAGES = require('../utils/constants');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const { cast } = ERROR_MESSAGES[400].users;
const { validationSaving } = ERROR_MESSAGES[400].movies;
const { noAccessRights } = ERROR_MESSAGES[403].movies;
const { moviesUndefined, movieUndefined } = ERROR_MESSAGES[404].movies;

const Movie = require('../models/movie');

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const { _id } = req.user;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: _id,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(validationSaving));
      } else {
        next(err);
      }
    });
}

function getMovies(req, res, next) {
  const { _id } = req.user;

  Movie
    .find({ owner: _id })
    .populate('owner', '_id')
    .then((movies) => {
      if (movies) return res.send(movies);

      throw new NotFoundError(moviesUndefined);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(cast));
      } else {
        next(err);
      }
    });
}

function deleteMovie(req, res, next) {
  const { id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie
    .findById(movieId)
    .then((movie) => {
      if (!movie) throw new NotFoundError(movieUndefined);

      const { owner: movieOwnerId } = movie;
      if (movieOwnerId.valueOf() !== userId) {
        throw new ForbiddenError(noAccessRights);
      }

      movie
        .deleteOne()
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch(next);
}

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
