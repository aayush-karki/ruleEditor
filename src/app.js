/*******************************************************************************
 *
 * @Filename app.js
 *
 * app.js contains the server. Here we set up the view, routing ,
 * 		and error handeling
 *
 * @Exports express application: this application is the server.
 *
 ******************************************************************************/

"use strict";

// node middlewares
const express = require("express");
const logger = require("morgan"); // logs all the http request automatically
const path = require("path");
const fs = require("fs");
const createError = require("http-errors");

// variables
const baseDir = "public";

// routes
const indexRoute = require("./routes/index");

// server
const app = express();

// view engine setup
app.set("views", [
	path.join(__dirname, "views"),
	path.join(__dirname, "/views/templates"),
]);
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, baseDir)));

// routing
app.use("/", indexRoute);

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
