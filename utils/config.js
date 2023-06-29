const {
  NODE_ENV,
  JWT_SECRET,
  MONGODB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 3000,
} = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  MONGODB_URL,
  PORT,
};
