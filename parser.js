/* - название приложения
- Разработчик название
- разработчик сайт
- разработчик имейл
- когда было последнее обновление */

const gplay = require('google-play-scraper');

gplay.list({ category: gplay.category.GAME_ACTION, num: 3, fullDetail: true })
 .then(appsList => {
   const newAppsList = appsList.map(app => ({
      title: app.title,
      developer: app.developer,
      developerWebsite: app.developerWebsite,
      developerEmail: app.developerEmail,
      updated: app.updated,
      glink: app.url
   }));
   console.log(newAppsList.length)
 })