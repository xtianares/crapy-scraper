let express = require("express"),
    mongoose = require("mongoose"),
    axios = require("axios"),
    cheerio = require("cheerio"),
    db = require("../models");

module.exports = function(app) {
    // route for scraping new articles
    app.get("/api/scrape", function (req, res) {
        axios.get("https://www.creativebloq.com/tag/web-design").then(function(response) {
            let $ = cheerio.load(response.data);
            $($(".listingResult.small").get().reverse()).each(function(i, element) {
                let result = {};
                result.title = $(this).find(".article-name").text().trim();
                result.url = $(this).find("a").attr("href");
                result.summary = $(this).find("p.synopsis").text().trim();
                result.img = $(this).find(".image-remove-reflow-container img").attr("data-src") ? $(this).find(".image-remove-reflow-container img").attr("data-src") : "https://vanilla.futurecdn.net/creativebloq/media/img/missing-image.svg";
                if (result.title !== "") {
                    // Create a new Article using the `result` object built from scraping
                    db.Article.create(result).then(function(dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function(err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
                    // db.Article.create(result, function(error, data) {
                    //     console.log(data);
                    // });
                }
            });
            // Send a message to the client
            // res.send("Scrape Complete");
            res.redirect("/");
        });
    });

    // route for saving articles
    app.get("/api/save/:id", function (req, res) {
        // res.send('id: ' + req.params.id);
        db.Article.findByIdAndUpdate(req.params.id, {saved: true}, {new: true}).then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
            res.json(err);
        });
    });

    // route for saving articles
    app.get("/api/unsave/:id", function (req, res) {
        // res.send('id: ' + req.params.id);
        db.Article.findByIdAndUpdate(req.params.id, {saved: false}, {new: true}).then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
            res.json(err);
        });
    });

};
