var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../models/auth');

var Product = require('../models/Product');


/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find((err, docs) => {
    var productChunks = [];
    var chunkSize = 3;
    for(var i=0; i<docs.length; i=i+chunkSize)
    {
      productChunks.push(docs.slice(i, i+chunkSize))
    }
    res.render('shops/index', { title: 'Shopping Cart' , products: productChunks });
  })
});

/* Dashboard Page */
router.get('/dashboard', ensureAuthenticated, (req, res) => 
  res.render('dashboard',{
    name: req.user.name
  }));

module.exports = router;
