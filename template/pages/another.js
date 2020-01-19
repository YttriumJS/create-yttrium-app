const Layout = require('../components/Layout')

module.exports = () => Layout('Another Page', `
  <div class="main">
    <h1 class="title">This is another page.</h1>
    <p class="description"><a href="/">Click here to go back home.</a></p>
  </div>
`)
