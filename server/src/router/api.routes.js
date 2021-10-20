const express = require("express");
const api = require("./routes");
const traineeApi = require("./trainee.routes");
const apiRoute = express();

apiRoute.use("/v1/trainee", traineeApi);
apiRoute.use("/v1/staff", api);

module.exports = apiRoute;
