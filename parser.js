var appstore = require('app-store-scraper');

Object.entries(appstore.category).forEach(function(key, value) {
  console.log(key[0])
});