#!/usr/bin/env node

const getHTML = require('./lib/get-html')
const parseNews = require('./lib/parse-news')

if (require.main === module) {
  getNews()
    .then(news => {
      if (process.argv.includes('--json')) {
        return console.log(JSON.stringify(news, null, 2))
      }
      for (const n of news) {
        process.stdout.write(`${n.title} - ${n.upvotes} upvotes ${n.comments} comments\n\t${n.url}\n\t${n.link}\n\n`)
      }
    })
    .catch(console.error)
} else {
  module.exports = getNews
}

async function getNews () {
  const html = await getHTML()
  return parseNews(html)
}
