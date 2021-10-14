const fs = require('fs');

const http = require('http')


const sendImg = (imgCode, res) =>{
    let path = `./sig/${imgCode}.jpg`;
    fs.readFile(path, function(err, data) {
        if (err) throw err // Fail if the file can't be read.
        // http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        res.end(data) // Send the file data to the browser.
        // }).listen(8124)
        // console.log('Server running at http://localhost:8124/')
    })
};

module.exports = { sendImg };

// fs.readFile('./sig/D527.jpg', function(err, data) {
//   if (err) throw err // Fail if the file can't be read.
//   http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'image/jpeg'})
//     res.end(data) // Send the file data to the browser.
//   }).listen(8124)
//   console.log('Server running at http://localhost:8124/')
// })