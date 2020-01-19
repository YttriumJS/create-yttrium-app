module.exports = (title, content) => `
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <link rel="stylesheet" href="static/styles">
</head>

<body>
  <div>${content}</div>
</body>
</html>
`
