var request = require('request');
var GITHUB_TOKEN = require('./secrets.js');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      }
  };


  request.get (options, function(err, res, body) {
    if(err) {
      console.log("error occurred :", err);
    } else if (res.statusCode === 200) {
      console.log(body);
      var data = JSON.parse(body);
      cb(data);
    }
    console.log("DONE with everything")
  });
};



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});