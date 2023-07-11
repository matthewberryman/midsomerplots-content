#!/usr/bin/env node
const MersenneTwister = require('mersenne-twister');
let plot_elements = require('./plot-elements.json');
const wrap = require('@aashutoshrathi/word-wrap');

module.exports.generate = (seed) => {

  if (seed < 1612917829) {
    plot_elements = require('./plot-elements-old.json');
  }
  if ((seed >= 1612917829) && (seed < 1618091960)) {
    plot_elements = require('./plot-elements-old2.json');
  }
  if ((seed >= 1618091960) && (seed < 1653717696)) {
    plot_elements = require('./plot-elements-old3.json');
  }
  if ((seed >= 1653717696) && seed < (1671665804)) {
    plot_elements = require('./plot-elements-old4.json');
  } 
  if ((seed >= 1671665804) && seed < (1672118328)) {
    plot_elements = require('./plot-elements-old4.json');
  }
  if ((seed >= 1672118328) && seed < (1675071437)) {
    plot_elements = require('./plot-elements-old5.json');
  }
  
  let mt = new MersenneTwister(seed);

  var rands = [Math.floor( mt.random() * plot_elements.murdered_person.length),
               Math.floor( mt.random() * plot_elements.cause_of_death.length),
               Math.floor( mt.random() * plot_elements.village.length),
               Math.floor( mt.random() * plot_elements.village_group.length),
               Math.floor( mt.random() * plot_elements.feeling.length),
               Math.floor( mt.random() * plot_elements.angry_at.length),
               Math.floor( mt.random() * plot_elements.threatened.length)];

  return plot_elements.murdered_person[rands[0]] +
         " is found " + plot_elements.cause_of_death[rands[1]] +
         ". Suspicion falls on " + (plot_elements.village[rands[2]] +
         "’s ").replace("s’s","s’") + plot_elements.village_group[rands[3]] +
         ", " + plot_elements.feeling[rands[4]] + 
         " that " + plot_elements.angry_at[rands[5]] +
         " might threaten " + plot_elements.threatened[rands[6]]+".";
};

const headers = {
  "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
};

module.exports.handler = (event, context, callback) => {
  
  if (event.queryStringParameters && event.queryStringParameters.seed) {
    if (event.queryStringParameters.characterLimit) {

      const response = {
        statusCode: 400,
        headers: headers,
        body: JSON.stringify({"error": "not allowed to specify both seed and characterLimit"})
      };
    
      callback(null, response);
   
    } else {

    const seed = parseInt(event.queryStringParameters.seed);
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({plot: module.exports.generate(seed), seed: seed})
    };
  
    callback(null, response);

    }
  }

  // otherwise, use a random seed
  let seed = Math.round((new Date()).getTime()/1000);
  let plot = module.exports.generate(seed);
  if (event.queryStringParameters && event.queryStringParameters.characterLimit) {
    // generate a plot that is <= characterLimit
    while (plot.length > event.queryStringParameters.characterLimit) { 
      seed = Math.round((new Date()).getTime()/1000);
      plot = module.exports.generate(seed);
    }
  }
  const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({plot: plot, seed: seed})
  };

  callback(null, response);
};



module.exports.handler({}, null, (a, response) => {
  console.log(wrap(JSON.parse(response.body).plot, {width: process.stdout.columns-1, indent: ''}));
});
