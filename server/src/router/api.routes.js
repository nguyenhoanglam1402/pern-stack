const express = require('express');
const api = require('./routes');
const apiRoute = express();
apiRoute.use('/api', api);

module.exports = apiRoute;