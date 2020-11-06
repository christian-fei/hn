const { parse } = require('node-html-parser')

module.exports = parseNews
function parseNews (html = '') {
  const doc = parse(html)
  const trs = doc.querySelectorAll('table.itemlist tr')
  return trs.reduce((acc, tr, index) => {
    const titles = tr.querySelectorAll('.title')
    if (titles.length === 2) {
      const title = tr.querySelectorAll('.title')[1].text.replace(/\(.*\)$/, '').trim()
      return acc.concat([{
        title
      }])
    }
    const subtext = tr.querySelector('.subtext')
    if (subtext) {
      const el = subtext.querySelector('.score')
      const links = subtext.querySelectorAll('a')
      if (!el || links.length !== 4) return acc
      acc[acc.length - 1].upvotes = +el.text.replace(' points', '').trim()
      acc[acc.length - 1].author = links[0].text
      acc[acc.length - 1].comments = +links[links.length - 1].text.replace('comments', '').trim()
      return acc
    }
    return acc
  }, [])
}
