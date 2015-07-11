"use strict";

var rp = require('request-promise');

var isMatch = (xmas, today) => {
  return xmas.year == today.getFullYear()
    && xmas.christmas_day.getDateString() == today.getDateString();
};

var determineXmas = resp => {
  var xmases = JSON.parse(resp).christmases;
  var today = new Date();

  var matches = xmases.filter(xmas => isMatch(xmas, today));

  declareXmasOrNot(matches.length !== 0);
};

var declareXmasOrNot = status => {
  if (status) {
    console.log('It is Christmas.');
  } else {
    console.log('It is not Christmas.');
  }
};

rp('https://isitchristmas.com/api')
  .then(determineXmas)
  .catch(console.error);
