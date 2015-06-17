'use strict';

var _ = require('underscore');
var model = require('../models/badges');

// Send badges to model to be saved

exports.save = function(request, response, next) {
  var badges = _.clone(request.body);
  model.save(badges, function(err){
    if (err) return response.json(503, {error: true});
    next();
    model.trim();
  });
};


// Send badges to pub/sub socket in model
exports.send = function(request, response, next) {
  var badges = _.clone(request.body);
  model.send(badges, function(err){
    response.json(200, {error: null});
  });

  next();
};

// Get 10 badges from model

exports.get = function(request, response) {
  model.get(function(err, data){
    if (err) return response.json(503, {error: true});
    response.json(200, data);
  });
};