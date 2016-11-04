if (process.env.NODE_ENV === 'production') {
  module.exports = require('./production'); // eslint-disable-line global-require
} else {
  module.exports = require('./development'); // eslint-disable-line global-require
}
