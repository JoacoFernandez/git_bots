const core = require('@actions/core');
const github = require('@actions/github');


  const context = JSON.stringify(github.context, undefined, 2)
  console.log(`The event context: ${context}`);
