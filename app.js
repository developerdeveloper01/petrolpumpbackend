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
let creditcustomers = require("./routes/creditcustomers");
let bank = require("./routes/bank");
let payment = require("./routes/payment");
let ms = require("./routes/ms");
let hd = require("./routes/hd");
let rsp = require("./routes/rsp");
let user = require("./routes/user");
let baymanagementold =  require("./routes/baymanagementold");
let expenses =require("./routes/expenses");
let dsmclosingsheet=require("./routes/dsmclosingsheet");
let lubestock=require("./routes/lubestock");
let lubricantsales=require("./routes/lubricantsales");
let cashcollected=require("./routes/cashcollected");
let planvideo = require("./routes/planvideo");
//const user = require("./routes/user");
let equipment = require("./routes/equipment");
let staffattendence = require("./routes/staffattendence");
let creditmanagement=require("./routes/creditmanagement");
let statutoryCertificate=require("./routes/statutoryCertificate");
let bankDeposits=require("./routes/bankDeposits");
let dealerCommon=require("./routes/dealercommon");
let raiseConcern=require("./routes/raiseConcern");
let profilepic=require("./routes/profilepic");
let state=require("./routes/state");
let country=require("./routes/country");
let city=require("./routes/city");
let Stampingdata=require("./routes/Stampingdata");
let FMotherEquipment=require("./routes/FMotherEquipment");
let CreditBankFM=require("./routes/CreditBankFM");
let Creditgiven=require("./routes/creditgivento");
let Salesfigures=require("./routes/salesfigures");
let fuel_stock_management=require("./routes/fuel_stock_management");
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
app.use("/api", creditcustomers);
app.use("/api", bank);
app.use("/api", payment);
app.use("/api", ms);
app.use("/api", hd);
app.use("/api", rsp);
app.use("/api", user);
app.use("/api",baymanagementold);
app.use("/api", dsmform);
app.use("/api", stafform);
app.use("/api", staffattendence);
app.use("/api", expenses);
app.use("/api", dsmclosingsheet);
app.use("/api", lubestock);
app.use("/api", lubricantsales);
app.use("/api", cashcollected);
app.use("/api", creditmanagement);
app.use("/api", statutoryCertificate);
app.use("/api", bankDeposits);
app.use("/api", dealerCommon);
app.use("/api", profilepic);
app.use("/api", raiseConcern);
app.use("/api", state);
app.use("/api", country);
app.use("/api",city);
app.use("/api",Stampingdata);
app.use("/api",FMotherEquipment);
app.use("/api",CreditBankFM);
app.use("/api",Creditgiven);
app.use("/api",Salesfigures);
app.use("/api",fuel_stock_management);




//app.use("/api", designoutlet);
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
  console.log("req");
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

// 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 

