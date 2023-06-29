const router = require('express').Router();

const auth = require('../middlewares/auth');

const NOT_FOUND_ERROR = require('../errors/NotFoundError');

const routeMovies = require('./movies');
const routeSignup = require('./signup');
const routeSignin = require('./signin');
const routeUsers = require('./users');

router.use('/', routeSignup);
router.use('/', routeSignin);

router.use(auth);

router.use('/users', routeUsers);
router.use('/movies', routeMovies);

router.use((req, res, next) => next(new NOT_FOUND_ERROR('Страницы по запрошенному URL не существует')));

module.exports = router;
