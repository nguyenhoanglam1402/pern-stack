const express = require("express");
const staffApi = require("./staff.routes");
const traineeApi = require("./trainee.routes");
const trainerApi = require("./trainer.routes");
const loginApi = require("./login.routes");
const adminApi = require("./admin.routes");
const apiRoute = express();
const {
  authToken,
  authRole,
} = require("../middleware/authentiacation.middleware");

apiRoute.use("/auth", loginApi);
apiRoute.use("/admin", adminApi);
apiRoute.use("/trainee", authToken, authRole("Trainee"), traineeApi);
apiRoute.use("/staff", staffApi);
apiRoute.use("/trainer", authToken, authRole("Trainer"), trainerApi);
module.exports = apiRoute;
