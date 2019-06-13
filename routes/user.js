const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello from node updated')
});

module.exports = router;