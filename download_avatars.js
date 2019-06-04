var request = require('request');
var fs = require('fs');
var authorization = require('./secrets.js');
let githubToken = authorization.GITHUB_TOKEN;


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': githubToken
      }
  };

  request.get (options, function(err, res, body) {
    // console.log(body);
    if(err) {
      console.log("error occurred :", err);
    } else if (res.statusCode == 200) {
      var data = JSON.parse(body);
      cb(err, data);
    }
  });
};

getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach((element) => {
    console.log(element.avatar_url);
  })
});


function downloadImageByURL (url, filePath) {
  request.get(url, filePath)
    .on('error', function (err) {
       console.log(err);
    })

    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    })

    .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./tmp/testImageDownload.jpg")

















