const test = require('ava')
const getNews = require('.')

test('fetches HTML and parses items', async t => {
  const news = await getNews()
  t.is(news.length, 30)
})
