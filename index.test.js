const test = require('ava')
const got = require('got')

test('gets html from https://news.ycombinator.com/', async t => {
  const html = await getHTML()
  t.true(typeof html === 'string')
  t.true(html.startsWith('<html '))
})

async function getHTML () {
  return got('https://news.ycombinator.com')
    .then(res => res.body)
}
