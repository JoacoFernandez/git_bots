const core = require('@actions/core');
const github = require('@actions/github');


  const issue = github.context.payload.issue
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event issue: ${issue}`);
  const myToken = core.getInput('repo-token');
  const octokit = new github.GitHub(myToken);
  body = "![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)"
  //octokit.issues.update({
    //owner: github.context.repo.owner,
    //repo: github.context.repo.repo,
    //issue_number: issue.number,
    //state: "closed"
  //})
