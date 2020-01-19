const Layout = require('../components/Layout')

module.exports = ({ name }) => Layout('Welcome to Yttrium', `
  <div class="main">
    <h1 class="title">Hello ${name || 'World'}! Welcome to Yttrium!</h1>
    <p class="description">Read more on the project's <a target="_blank" href=https://github.com/YttriumJS/yttrium-server>GitHub page</a> or <a href="/another">go to another page</a></p>
  </div>
`)
