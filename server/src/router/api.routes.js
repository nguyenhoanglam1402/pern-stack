const express = require("express");
const api = require("./routes");
const traineeApi = require("./trainee.routes");
const apiRoute = express();

apiRoute.use("/api/v1/trainee", traineeApi);
apiRoute.use("/api/v1/staff", api);

module.exports = apiRoute;
