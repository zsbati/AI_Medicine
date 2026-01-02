const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MedScan AI API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;