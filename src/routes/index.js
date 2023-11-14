/*******************************************************************************
 *
 * Filename: Index.js
 *
 * Index.js contains a router that render the home page.
 *
 * Exports: express.Router: This router contains 2 routes  "/" or specigify
 * 		"ruleWriter" rendering the same page
 *
 ******************************************************************************/

"use strict";

const express = require("express");
const router = express.Router();

// callback function that the router calls when routing to "/""
const start = function (req, res) {
	console.log("start->");
	console.log("\tredirecting to ruleWriter:");
	res.redirect("/ruleWriter");
};

// callback function that the router calls when routing to ruleWriter
const renderRuleWriter = function (req, res) {
	console.log("rending ruleWriter:");
	res.render("ruleWriter", { title: "Rule Writer" });
};

// routes--rendering the current homepage
router.get("/", start);
router.get("/ruleWriter", renderRuleWriter);
router.get("/test", function (req, res) {
	console.log("rendering test->");
	res.render("test");
});

module.exports = router;
