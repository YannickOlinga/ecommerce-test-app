const express = require('express');
const { getProducts } = require('../data/products');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(getProducts());
});

module.exports = router;
