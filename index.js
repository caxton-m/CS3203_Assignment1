// Setting up an express server with app being our primary
//  variable.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');

// Read the contents on the favs.json file and add them as array objects to
//  variable students
let data1 = fs.readFileSync("../project1/favs.json");
let student = JSON.parse(data1);

// Initialize the port that express will listen to on server
var PORT = process.env.PORT || 3000;

// This is where the express files are located in root folder
app.use(express.static(__dirname));
app.use(bodyParser.json());

// GET route used when the '/getTweets' route method is called upon ajax request
app.get('/getTweets', function(req, res){

    // respond to this route by sending the array of students which contains
    //  all the tweet data
    res.send(student);
});

// POST route used when the '/createTweets' route method is called
//  upon the ajax request
app.post('/createTweets', function (req, res) {

    // get the ID and text from the script.js file data
    var studentId = req.body.id;
    var studentText = req.body.text;

    // add the variables to the end students array that contains tweet data
    student.push({
        id: studentId,
        text: studentText
    });

    // respond to this route by sending the array of students which contains
    //  all the tweet data
    res.send(student);

});

// POST route used when the '/getTweetId' route method is called
//  upon the ajax request
app.post('/getTweetId', function (req, res) {

    // Find the given tweet, if found pass the json data, if not send "Not Found"
    let currTweet = student.filter(function (tweet) {
        if (tweet.id == req.body.id) {
            return true;
        }
    });

    // Tweet Found!
    if(currTweet.length === 1){
        res.json(currTweet)
    } else { // Tweet not found
        res.json({message: "Not Found"});
    }

});

// PUT route used when the '/updateScreenName' route method is called
//  upon the ajax request
app.put('/updateScreenName', function (req,res){

    // get the name and screen name from the script.js file data
    var name = req.body.name;
    var newScreen = req.body.screen_name;
    var found = false;

    // check to see if we got data from scripts.js
    console.log(name,newScreen);

    // loop through the students array giving its value to products
    student.forEach(function (product, index) {

        // if the username is found update the screen name
        if (!found && product.user.name == name) {
            product.user.screen_name = newScreen;
        }

    });

    // respond to this route by sending the array of students which contains
    //  all the tweet data
    res.send(student);
});

// DELETE route used when the '/deleteTweets' route method is called
//  upon the ajax request
app.delete('/deleteTweets', function (req,res){

    // get the ID from the script.js file data
    var id = req.body.id;
    var found = false;

    // loop through the students array to find ID
    student.forEach(function (product, index) {

        // if found delete the data at that index
        if(!found && product.id == id){
            student.splice(index, 1);
        }
    });

    // respond to this route by sending the array of students which contains
    //  all the tweet data
    res.send(student);
});

// Listen on the port and call the function to outputs a message
//  when it is listening.
app.listen(PORT, function() {
    console.log(`Example app listening on port ` + PORT);
});

function test_print(){

    console.log('test code')

}