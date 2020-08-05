#!/usr/bin/env node
const MersenneTwister = require('mersenne-twister');
const plot_elements = require('./plot-elements.json');
const wrap = require('word-wrap');

module.exports.generate = (seed) => {

  let mt = new MersenneTwister(seed);

  var rands = [Math.floor( mt.random() * plot_elements.murdered_person.length),
               Math.floor( mt.random() * plot_elements.cause_of_death.length),
               Math.floor( mt.random() * plot_elements.village.length),
               Math.floor( mt.random() * plot_elements.village_group.length),
               Math.floor( mt.random() * plot_elements.feeling.length),
               Math.floor( mt.random() * plot_elements.angry_at.length),
               Math.floor( mt.random() * plot_elements.threatened.length)];

  return plot_elements.murdered_person[0] +
         " is found " + plot_elements.cause_of_death[rands[1]] +
         ". Suspicion falls on " + (plot_elements.village[rands[2]] +
         "’s ").replace("s’s","s’") + plot_elements.village_group[rands[3]] +
         ", " + plot_elements.feeling[rands[4]] + 
         " that " + plot_elements.angry_at[0] +
         " might threaten " + plot_elements.threatened[rands[6]]+".";
};

const headers = {
  "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
};

module.exports.handler = (event, context, callback) => {
  let seed = 0;
  if (event.queryStringParameters && event.queryStringParameters.seed) {
    seed = parseInt(event.queryStringParameters.seed);
  } else {
    seed = Math.round((new Date()).getTime()/1000);
  }
  const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({plot: module.exports.generate(seed)})
  };

  callback(null, response);
};



module.exports.handler({}, null, (a, response) => {
  console.log(wrap(JSON.parse(response.body).plot, {width: process.stdout.columns-1, indent: ''}));
});
