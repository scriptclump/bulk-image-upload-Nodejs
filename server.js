// call all the required packages
const express = require('express'),
 bodyParser= require('body-parser'),
 multer = require('multer');

//CREATE EXPRESS APP
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

//ROUTES WILL GO HERE
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');   
});

 
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-'+ file.originalname )
    }
})

var upload = multer({ storage: storage })

// Upload the single file on the server
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)    
})

//Uploading multiple files
app.post('/uploadmultiple', upload.array('photos[]', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(files)
    
})

//server.js
app.listen(5004, () => console.log('Server started on port 5004'));