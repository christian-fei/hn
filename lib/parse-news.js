const { parse } = require('node-html-parser')

module.exports = parseNews

function parseNews (html = '') {
  const doc = parse(html)
  const trs = doc.querySelectorAll('table.itemlist tr')
  return trs.reduce((acc, tr, index) => {
    if (containsTitle(tr)) {
      const title = tr.querySelectorAll('.title')[1].text.replace(/\(.*\)$/, '').trim()
      return acc.concat([{
        title,
        url: tr.querySelector('.title a').getAttribute('href')
      }])
    }
    if (containsUpvotes(tr)) {
      const subtext = tr.querySelector('.subtext')
      const el = subtext.querySelector('.score')
      const links = subtext.querySelectorAll('a')
      if (!el || links.length !== 4) return acc
      acc[acc.length - 1].upvotes = +el.text.replace(' points', '').trim()
      acc[acc.length - 1].author = links[0].text
      acc[acc.length - 1].comments = +links[links.length - 1].text.replace('comments', '').trim()
      acc[acc.length - 1].link = 'https://news.ycombinator.com/' + links[links.length - 1].getAttribute('href')
      return acc
    }
    return acc
  }, [])
}
function containsTitle (tr) {
  const titles = tr.querySelectorAll('.title')
  return titles.length === 2
}
function containsUpvotes (tr) {
  const subtext = tr.querySelector('.subtext')
  if (!subtext) return false
  const el = subtext.querySelector('.score')
  const links = subtext.querySelectorAll('a')
  if (!el || links.length !== 4) return false
  return true
}
