/* - название приложения
- Разработчик название
- разработчик сайт
- разработчик имейл
- когда было последнее обновление */

const gplay = require('google-play-scraper');

/* gplay.list({category: gplay.category.GAME_ACTION, num: 3}).then(apps_list => {
  apps_list.forEach(obj => {
    gplay.app({appId: obj['appId']}).then(app_info => {
      var app_data = {
        title: app_info['title'],
        developer: app_info['developer'],
        developerWebsite: app_info['developerWebsite'],
        developerEmail: app_info['developerEmail'],
        updated: app_info['updated']
      }
      console.log(app_data)
    })
  })
}) */


gplay.list({ category: gplay.category.GAME_ACTION, num: 3, fullDetail: true })
 .then(appsList => {
  const newAppList = appsList.map(app => ({
   title: app.title,
   developer: app.developer,
   developerWebsite: app.developerWebsite,
   developerEmail: app.developerEmail,
   updated: app.updated
  }))

  console.log(newAppList)
 })