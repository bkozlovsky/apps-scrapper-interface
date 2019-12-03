/* - название приложения
- Разработчик название
- разработчик сайт
- разработчик имейл
- когда было последнее обновление */

const gplay = require('google-play-scraper');

gplay.list({ category: gplay.category.GAME_ACTION, num: 3, fullDetail: true })
 .then(appsList => {
   appsList.forEach(element => {
    var date = new Date(element.updated);
    console.log(`${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`)
   });
 })