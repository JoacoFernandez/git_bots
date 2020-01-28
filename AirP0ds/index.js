const core = require('@actions/core');
const github = require('@actions/github');


  const issue = github.context.payload.issue
  console.log(`The issue: #${issue.number} ${issue.title}`);
