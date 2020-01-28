const core = require('@actions/core');
const github = require('@actions/github');


  const issue = JSON.stringify(github.context.payload.issue, undefined, 2)
  console.log(`The event issue: ${issue}`);
