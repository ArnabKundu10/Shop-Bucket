const express = require("express");
require("dotenv").config();
// const session = require("express-session");
const cors = require("cors");
const app = express();
const route = require("./src/routes/route");
const DBconnect = require("./src/connection/db");
DBconnect();
const PORT = process.env.PORT || 3000;
const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.URL_LOCAL
    : process.env.URL_REMOTE;
console.log(process.env);
app.use(
  cors({
    origin: apiUrl,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("src/uploads"));
app.use("/auth", route);
app.listen(PORT, () => {
  console.log("connected");
});
