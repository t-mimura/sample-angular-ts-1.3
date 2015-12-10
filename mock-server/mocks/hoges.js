module.exports = function(app, routeConfig) {
  var express = require('express');
  var router = express.Router();
  var data = require('../data/hoges.js');
  var _ = require('lodash');

  router.get('/', function(req, res) {
    res.send({
      hoges: data
    });
  });

  router.get('/:id', function(req, res) {
    var id = req.params.id;
    var result = _.find(data, { id: id });
    if (result) {
      res.send({
        hoge: result
      });
    } else {
      res.status(404).end();
    }
  });

  app.use(routeConfig.base + '/hoges', router);
};
