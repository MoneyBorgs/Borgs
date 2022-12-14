import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import { attachControllers } from "@decorators/express";
import TransactionsController from "./controllers/transactionsController";
import AccountsController from "./controllers/accountsController";
import DashboardController from "./controllers/dashboardController";
import ReportsController from "./controllers/reportsController";
import AllocationsController from "./controllers/allocationsController";
import InvestmentsController from "./controllers/investmentsController";
import cors from "cors";
import UsersController from "./controllers/usersController";

var app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(router);

// app.use(router);
attachControllers(app, [
  TransactionsController,
  AccountsController,
  DashboardController,
  ReportsController,
  AllocationsController,
  InvestmentsController,
  UsersController
])

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
