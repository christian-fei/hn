const got = require('got')

module.exports = async function getHTML () {
  return got('https://news.ycombinator.com')
    .then(res => res.body)
}
