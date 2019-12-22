let http = require('http')
let fs = require('fs')

let gplay = require('google-play-scraper').memoized();
let appstore = require('app-store-scraper').memoized();

let express = require('express');
let app = express();

let ejs = require('ejs')

let gcategories = require('./categories')

let bodyParser = require('body-parser')

let urlencodedParser = bodyParser.urlencoded({ extended: false })

let port = 8080
let hostname = 'parser.mrko.me'

function convert_date(dateobj) {
  var date = new Date(dateobj);
  return `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`
}

app.set('view engine', 'ejs')

app.use(express.urlencoded())

app.get('/', function(req, res) {
  res.render('index', {google_category: gcategories.cats, appstore_category: appstore.category});
});

app.post('/', urlencodedParser, function(req, res) {
  if (req.body.google_category) {
    Object.entries(gcategories.cats).forEach(function(key, value) {
      if (req.body.google_category == key[1]) {
        gplay.list({category: key[0], fullDetail: true}).then(appsList => {
          const newAppsList = appsList.map(app => ({
            title: app.title,
            developer: app.developer,
            developerWebsite: app.developerWebsite,
            developerEmail: app.developerEmail,
            updated: convert_date(app.updated),
            applink: app.url
          }))
          res.render('index2', {google_category: gcategories.cats, appstore_category: appstore.category, apps_results: newAppsList});
        })
      }
    })
  }
  if (req.body.appstore_category) {
    Object.entries(appstore.category).forEach(function(key, value) {
      if (req.body.appstore_category == key[0]) {
        appstore.list({category: key[1], fullDetail: true}).then(appsList => {
          const newAppsList2 = appsList.map(app => ({
            title: app.title,
            developer: app.developer,
            developerWebsite: app.developerWebsite,
            developerEmail: undefined,
            updated: convert_date(app.updated),
            applink: app.url
          }))
          res.render('index2', {google_category: gcategories.cats, appstore_category: appstore.category, apps_results: newAppsList2});
        })
      }
    });
  }
});

app.listen(port, hostname);
console.log(`Server is available at http://${hostname}:${port}`);
