const express = require('express');
const router = express.Router();

router.get('/survey', (req, res) => {
  res.redirect('/survey.html');
})

router.get('/home', (req, res) => {
  res.redirect('/home.html');
});

router.get('/', (req, res) => {
  res.redirect('/home.html');
});

module.exports = router;