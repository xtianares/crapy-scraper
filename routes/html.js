let express = require("express"),
    mongoose = require("mongoose"),
    axios = require("axios"),
    cheerio = require("cheerio"),
    exphbs = require("express-handlebars"),
    db = require("../models");

module.exports = function(app) {
    // route home page, grabing all articles
    app.get("/", function (req, res) {
        // db.Article.find({}, function(error, data) {
        //     var hbdata = {
        //         pageTitle: "Crappy Scraper",
        //         article: data
        //     };
        //     console.log(hbdata);
        //     res.render("index", hbdata);
        // });
        db.Article.find({}).sort({_id:-1}).then(function(dbArticle) {
            var hbdata = {
                pageTitle: "Crappy Scraper",
                article: dbArticle
            };
            console.log(hbdata);
            res.render("index", hbdata);
        })
        .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
            res.json(err);
        });;
    });

    // route for saved articles page
    app.get("/saved", function (req, res) {
        db.Article.find({ saved: true }, function(error, dbArticle) {
            var hbdata = {
                pageTitle: "Saved Article",
                article: dbArticle
            };
            console.log(hbdata);
            res.render("saved", hbdata);
        });
    });

    // route for displaying articles with its corresponding notes
    app.get("/notes/:id", function (req, res) {
        // res.send('id: ' + req.params.id);
        db.Article.findById(req.params.id).populate("notes").then(function(dbArticle) {
            var hbdata = {
                pageTitle: "Add Notes",
                article: dbArticle
            };
            console.log(hbdata);
            res.render("notes", hbdata);
        })
        .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
            res.json(err);
        });
    });

};
