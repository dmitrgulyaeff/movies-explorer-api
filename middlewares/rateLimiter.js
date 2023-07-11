const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 10000,
  max: 150,
  message: 'Too many requests',
});

module.exports = limiter;
