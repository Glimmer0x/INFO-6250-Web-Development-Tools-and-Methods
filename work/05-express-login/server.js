const express = require('express');
const cookieParser = require('cookie-parser');
const { createSession, getSession, deleteSession, existSession } = require('./sessions');
const { storedWord, getWord } = require('./stored-word');
const { loginPage, checkUsernameValid } = require('./login-page');
const { dataPage } = require('./data-page');

const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  const sessionId = req.cookies.sid;
  const username = getSession(sessionId)?.username;
  if (username) { 
    const word = getWord(username) || "";
    res.send(dataPage({username, word}));
  }
  else { 
    if (sessionId) { res.clearCookie('sid'); }
    res.redirect('/login');
  }
});

app.post('/change-word', (req, res) => {
  const sessionId = req.cookies.sid;
  const username = getSession(sessionId)?.username;
  if (username) { 
    const word = req.body.word;
    storedWord({username, word});
    res.redirect('/');
  }
  else { 
    if (sessionId) { res.clearCookie('sid'); }
    res.redirect('/');
  }
 });

app.get('/login', (req, res) => {
  res.send(loginPage());
});

app.post('/login', (req, res) => { 
  const username = req.body.username?.toLowerCase();
  const isValid = checkUsernameValid(username);
  if (isValid) { 
    const sessionId = createSession(username);
    res.cookie('sid', sessionId);
    res.redirect('/');
  }
  else { 
    res.status(401).redirect('/login');
  }
});

app.post('/logout', (req, res) => {
  const sessionId = req.cookies.sid;
  deleteSession(sessionId);
  res.clearCookie('sid');
  res.redirect('/');
 });

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));