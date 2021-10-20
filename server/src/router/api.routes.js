const express = require("express");
const api = require("./routes");
const traineeApi = require("./trainee.routes");
const apiRoute = express();

apiRoute.use("/trainee", traineeApi);
apiRoute.use("/staff", api);

module.exports = apiRoute;
