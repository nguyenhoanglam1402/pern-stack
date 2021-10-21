const express = require("express");
const staffApi = require("./staff.routes");
const traineeApi = require("./trainee.routes");
const trainerApi = require("./trainer.routes");
const apiRoute = express();

apiRoute.use("/trainee", traineeApi);
apiRoute.use("/staff", staffApi);
apiRoute.use("/trainer",trainerApi);
module.exports = apiRoute;
