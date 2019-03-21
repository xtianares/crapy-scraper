let express = require("express"),
    mongoose = require("mongoose"),
    axios = require("axios"),
    cheerio = require("cheerio"),
    exphbs = require("express-handlebars"),
    db = require("../models");

module.exports = function(app) {
    // route home page
    app.get("/", function (req, res) {
        // db.Article.find({}, function(error, data) {
        //     var hbdata = {
        //         pageTitle: "Crappy Scraper",
        //         article: data
        //     };
        //     console.log(hbsObject);
        //     res.render("index", hbdata);
        // });
        // res.render("index", hbdata);

        axios.get("https://www.creativebloq.com/tag/web-design").then(function(response) {
            let $ = cheerio.load(response.data);
            let result = [];

            $(".listingResult.small:not('sponsored-post')").each(function(i, element) {
                let obj = {};
                obj.title = $(this).find(".article-name").text().trim();
                obj.url = $(this).find("a").attr("href");
                obj.summary = $(this).find("p.synopsis").text().trim();
                obj.img = $(this).find(".image-remove-reflow-container img").attr("data-src") ? $(this).find(".image-remove-reflow-container img").attr("data-src") : "https://vanilla.futurecdn.net/creativebloq/media/img/missing-image.svg";
                if (obj.title !== "") {
                    result.push(obj);
                }
            });

            console.log(result);

            // Create a new Article using the `result` object built from scraping
            db.Article.insertMany(result).then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
            })
            .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
            });

            // Send a message to the client
            res.render("index");
        });
    });
    // route for saved articles page
    app.get("/saved", function (req, res) {
        let hbdata = {
            pageTitle: "Saved Articles"
        }
        res.render("saved", hbdata);
    });

};
