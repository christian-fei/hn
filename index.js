#!/usr/bin/env node

const getHTML = require('./lib/get-html')
const parseNews = require('./lib/parse-news')

if (require.main === module) {
  getNews()
    .then(news => {
      console.log(news)
      for (const n of news) {
        process.stdout.write(`${n.title} - ${n.upvotes} ${n.comments}\n`)
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
