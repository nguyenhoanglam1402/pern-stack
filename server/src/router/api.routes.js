const express = require('express');
const api = require('./course.routes');
const apiRoute = express();
apiRoute.use('/api', api);

module.exports = apiRoute;