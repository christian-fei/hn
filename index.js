const getHTML = require('./lib/get-html')
const parseNews = require('./lib/parse-news')

module.exports = async function getNews () {
  const html = await getHTML()
  return parseNews(html)
}
