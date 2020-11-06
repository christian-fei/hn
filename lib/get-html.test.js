const test = require('ava')
const getHTML = require('./get-html')

test('gets html from https://news.ycombinator.com/', async t => {
  const html = await getHTML()
  t.true(typeof html === 'string')
  t.true(html.startsWith('<html '))
})
