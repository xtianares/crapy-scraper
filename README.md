# Crappy Scraper
A NodeJS & MongoDB webapp that scrapes article data from Creative Bloq and allows users to add notes/comments about the articles. Users can also delete unwanted notes.

Please check out the deployed working app at, [click here](https://aqueous-sierra-80794.herokuapp.com/).

### Functionality
For the backend, the app uses expressJS to serve the routes and mongoose to interact with a MongoDB database.

For the frontend, the app uses handlebars for templating the articles and Bootstrap 4 with Material Icons as a styling framework. The app also uses jQuery and AJAX to help with making post requests to the API.

For web scraping, the app uses the Axios and Cheerio node packages. Scraping follows this process: articles are scraped from Creative Bloq, saves the entries to the DB and then redirects the to homepage where the articles are displayed.

### Running the app locally
To install the application locally, assuming that you already have setup MongoDB and have it running properly locally, run the following commands below in your terminal/bash:

```
git clone https://github.com/xtianares/crappy-scraper.git
cd crappy-scraper
npm install
```

### Running Locally
To start the local server run this command in your terminal/bash.

```
node server.js
```

Once you get the local server running visit http://localhost:3000/ in your browser.

### Technologies Used
NodeJS\
ExpressJS\
MongoDB\
Mongoose\
Cheerio\
Axios\
Handlebars\
jQuery\
Bootstrap 4
