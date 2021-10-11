const express = require('express');
const api = require('./courses.routes');
const apiRoute = express();
apiRoute.use('/api', api);

module.exports = apiRoute;