var request = require('request');
var fs = require('fs');

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
