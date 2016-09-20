// Setup dependencies
var express = require('express');
var path = require('path');
var say = require('say');

// create the server
var app = express();

// setup jenkins connection
var leeroyJenkins = require('jenkins')(url);

// get request to get json of last jenkins build
app.get('/json', function(req, res) {
    leeroyJenkins.build.get(BuildName, 'lastBuild', function(err, data) {
        if(err) throw err;
        console.log(data);
        res.json(data);
    });
});

app.get('/saySuccess', function(req, res) {
    say.speak('Alex', 'Last jenkins job was a success');
});

app.get('/sayFailure', function(req, res) {
    say.speak('Alex', 'Warning! Warning! The last jenkins job was a failure');
});

app.get('/sayBuilding', function(req, res) {
    say.speak('Alex', 'Jenkins is currently building. Please be patient.');
});

app.get('/bank', function() {

});

app.use(express.static(path.join(__dirname, 'site')));


var port = 5000;
app.listen(port);
