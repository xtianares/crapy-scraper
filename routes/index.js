// making easy to add more individual routes by using an index.js for all routes
var fs = require('fs');

module.exports = function(app){
    // this function pulls in all the routes in it's folder and requires them automatically
    // now you ony need to use require("./routes")(app); in the server.js
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        let name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
    });
}
