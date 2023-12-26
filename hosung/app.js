const express = require('express');
const app = express();
const PORT = 8000;


app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
  res.render('index')
});


app.get('/kiosk', (req, res) => {
  res.render('kiosk')
});


app.get('/word', (req, res) => {
  res.render('word')
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})


