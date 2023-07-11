const { celebrate, Joi } = require('celebrate');

// regular for validation
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const URL_REGEX = /https?:\/\/(www)?[0-9a-z-]{1,63}(\.|\/)[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?/i;

// users
const registerUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().pattern(EMAIL_REGEX),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().optional().pattern(EMAIL_REGEX),
    name: Joi.string().optional().min(2).max(30),
  }).or('email', 'name'),
});

// movies
const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_REGEX),
    trailerLink: Joi.string().required().pattern(URL_REGEX),
    thumbnail: Joi.string().required().pattern(URL_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  EMAIL_REGEX,
  URL_REGEX,
  registerUserValidation,
  loginUserValidation,
  updateUserInfoValidation,
  createMovieValidation,
  deleteMovieValidation,
};
