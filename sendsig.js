const { resolveSoa } = require('dns');
const fs = require('fs');

// const http = require('http')

const sendImg = (imgCode, res) =>{
    let path = `./sig/${imgCode}.jpg`;
    fs.readFile(path, function(err, data) {
        
        if (err) {
            // console.log(err);
            // res.end("Contact with CDBL in charge to upload the signature");
            fs.readFile("./sig/notFound.png", function(err, data){
                if(err){
                    res.redirect('/');
                }
                else{
                    res.writeHead(200, {'Content-Type': 'image/jpeg'});
                    res.end(data); // Send the file data to the browser.
                }
            });
        }
        else{
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.end(data) // Send the file data to the browser.
        }
    })
};

module.exports = { sendImg };
