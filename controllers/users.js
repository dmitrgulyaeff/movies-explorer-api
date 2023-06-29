const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');

const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const ERROR_MESSAGES = require('../utils/constants');

const {
  cast,
  validationRegistration,
  validationUpdate,
} = ERROR_MESSAGES[400].users;

const { unauthorized } = ERROR_MESSAGES[401].users;
const { userUndefined } = ERROR_MESSAGES[404].users;
const { emailDuplication } = ERROR_MESSAGES[409].users;

const User = require('../models/user');

function registerUser(req, res, next) {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const { password: userPassword, ...userWithoutPassword } = user.toObject();
      return res.status(201).send({ ...userWithoutPassword });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailDuplication));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(validationRegistration));
      } else {
        next(err);
      }
    });
}

function loginUser(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(({ _id }) => {
      if (_id) {
        const token = jwt.sign(
          { _id },
          NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
          { expiresIn: '7d' },
        );

        return res.send({ token });
      }

      throw new UnauthorizedError(unauthorized);
    })
    .catch(next);
}

function getCurrentUserInfo(req, res, next) {
  const { _id } = req.user;

  User
    .findById(_id)
    .then((user) => {
      if (user) return res.send(user);

      throw new NotFoundError(userUndefined);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(cast));
      } else {
        next(err);
      }
    });
}

function updateUserInfo(req, res, next) {
  const { email, name } = req.body;
  const { _id } = req.user;

  User
    .findByIdAndUpdate(
      _id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user) return res.send(user);

      throw new NotFoundError(userUndefined);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(emailDuplication));
      }

      if (err.name === 'CastError') {
        return next(new BadRequestError(cast));
      }

      if (err.name === 'ValidationError') {
        return next(new BadRequestError(validationUpdate));
      }

      return next(err);
    });
}

module.exports = {
  registerUser,
  loginUser,

  getCurrentUserInfo,
  updateUserInfo,
};
