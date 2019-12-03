let http = require('http')
let fs = require('fs')
let gplay = require('google-play-scraper').memoized();

let express = require('express')
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
  res.render('index', {categories: gcategories.cats});
});

app.post('/', urlencodedParser, function(req, res) {
  Object.entries(gcategories.cats).forEach(function(key, value) {
    if (req.body.selected_category == key[1]) {
      gplay.list({category: key[0], num: Number(req.body.number_of_apps), fullDetail: true}).then(appsList => {
        const newAppsList = appsList.map(app => ({
          title: app.title,
          developer: app.developer,
          developerWebsite: app.developerWebsite,
          developerEmail: app.developerEmail,
          updated: convert_date(app.updated),
          glink: app.url
        }))
        res.render('index2', {categories: gcategories.cats, apps_results: newAppsList});
      })
    }
  })
});

app.listen(port, hostname);
console.log(`Server is available at http://${hostname}:${port}`);
