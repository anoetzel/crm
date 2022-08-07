const express = require('express');

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(5000, () => {
  console.log(`  Listening on http://localhost:${5000}`);
});
