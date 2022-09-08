let projectData = {};


var path = require('path')
const dotenv = require('dotenv').config()


const express = require('express')
const app = express()

const mockAPIResponse = require('./mockAPI.js')

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())



app.use(express.static('dist'))

// For Testing
console.log(__dirname)
console.log("API key is", process.env.API_KEY)

const api = process.env.API_KEY
console.log(" Variable API key is ", api)

app.get('/appi', getApi);
function getApi(req, res) {
    console.log("the function", api)
    res.send(api)
}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
app.post('/addData', addInfo)
function addInfo(req, res) {
    console.log('from server: request :' + req.body)

    projectData['model'] = req.body.model;
    projectData['score_tag'] = req.body.score_tag;
    projectData['agreement'] = req.body.agreement;

    projectData['subjectivity'] = req.body.subjectivity;
    projectData['confidence'] = req.body.confidence;
    projectData['irony'] = req.body.irony;
    projectData['text'] = req.body.text;

    res.send(projectData)
    console.log('This is server - projectData' + projectData)//for testing
}

app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


app.get('/all', function (req, res) {

    console.log('model ' + projectData.model + ' score_tag:' + projectData.score_tag + ' agreement:' + projectData.agreement)
    res.send(projectData)
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

