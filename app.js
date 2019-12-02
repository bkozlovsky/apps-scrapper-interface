let http = require('http')
let fs = require('fs')
let gplay = require('google-play-scraper');

let express = require('express')
let app = express();

let ejs = require('ejs')

let gcategories = require('./categories')

let bodyParser = require('body-parser')

let urlencodedParser = bodyParser.urlencoded({ extended: false })

let port = 8080
let hostname = 'parser.mrko.me'

app.set('view engine', 'ejs')

app.use(express.urlencoded())

app.get('/', function(req, res) {
  res.render('index', {categories: gcategories.cats});
});

app.post('/', urlencodedParser, function(req, res) {
  Object.entries(gcategories.cats).forEach(function(key, value) {
    if (req.body.selected_category == key[1]) {
      gplay.list({category: key[0],
      collection: gplay.collection.TOP_FREE, num: 15, fullDetail: true}).then(appsList => {
        const newAppsList = appsList.map(app => ({
          title: app.title,
          developer: app.developer,
          developerWebsite: app.developerWebsite,
          developerEmail: app.developerEmail,
          updated: app.updated
        }))
        res.render('index2', {categories: gcategories.cats, apps_results: newAppsList});
      })
    }
  })
});

app.listen(port, hostname);
console.log(`Server is available at http://${hostname}:${port}`);
