const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('\n=== its working ===');
  res.render('index', { title: 'Test' });
});

module.exports = router;
