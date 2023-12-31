const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index.html');
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));