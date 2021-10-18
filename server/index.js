const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const rfs = require("rotating-file-stream");
const {
  db,
  TestConnection,
  ConnectDatabase,
} = require("./database/models/index");
dotenv.config();

ConnectDatabase();

const port = process.env.PORT || 5001;
const isProduction = process.env.NODE_ENV === "production";
const app = express();

app.use(helmet());

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});
app.use(
  isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev")
);
app.use(cors());
app.use(express.json());

const api = require("./src/router/api.routes");
app.use("/api", api);

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
