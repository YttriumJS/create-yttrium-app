const fs = require('fs')
const { join } = require('path')
const { parse } = require('url')
const Y = require('yttrium-server')
const index = require('./pages/index')
const another = require('./pages/another')

const { $, server, router } = Y()

function readStatic (file) {
  return fs.readFileSync(join(__dirname, 'static', file))
}

// get static files
const styles = readStatic('styles.css')

// init routes
$.route('index')
  .append('<another>')
  .append('<static>')

$.route('index > static')
  .append('<styles>')

// handle routes
$.route('index')
  .on('route', (e, req, res) => {
    e.stopPropagation()
    const { query } = parse(req.url, true)
    res.end(index({ name: query.name }))
  })
$.route('index > another')
  .on('route', (e, req, res) => {
    e.stopPropagation()
    res.end(another())
  })

$.route('index > static > styles')
  .on('route', (e, req, res) => {
    e.stopPropagation()
    res.writeHead(200, { 'Content-Type': 'text/css' })
    res.end(styles)
  })

$(server).listen(process.env.PORT || 3000)

$(server).on('request', router)

console.log('Server available on http://localhost:' + (process.env.PORT || 3000))
