let express = require("express"),
    mongoose = require("mongoose"),
    axios = require("axios"),
    cheerio = require("cheerio"),
    exphbs = require("express-handlebars"),
    db = require("../models");

module.exports = function(app) {
    // route home page
    app.get("/", function (req, res) {
        let hbdata = {
            title: "Crappy Scraper"
        }
        res.render("index", hbdata);
    });
    // route for saved articles page
    app.get("/saved", function (req, res) {
        let hbdata = {
            title: "Saved Articles"
        }
        res.render("saved", hbdata);
    });

};
