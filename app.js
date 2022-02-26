var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

//Require
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let dealershipform = require("./routes/dealershipform");
let managerform = require("./routes/managerform");
let dsmform = require("./routes/dsmform");
let stafform = require("./routes/stafform");
//let designoutlet = require("./route/designoutlet");
let planvideo = require("./routes/planvideo");
let equipment = require("./routes/equipment");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", dealershipform);
app.use("/api", planvideo);
app.use("/api", equipment);
app.use("/api", managerform);

app.use("/api", dsmform);
app.use("/api", stafform);
//app.use("/api", designoutlet);
//connect mongodb
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;


