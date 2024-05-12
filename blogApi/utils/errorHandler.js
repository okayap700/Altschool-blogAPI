const logger = require('./logger');

module.exports = (err, req, res, next) => {
  logger.error(`Server Error: ${err.message}`);
  res.status(500).json({ msg: 'Server Error' });
};


  