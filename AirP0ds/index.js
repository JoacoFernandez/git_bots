const core = require('@actions/core');
const github = require('@actions/github');


  const issue = github.context.payload.issue
  console.log(`The issue: #${issue.number} ${issue.title}`);
  const myToken = core.getInput('repo-token');
  const octokit = new github.GitHub(myToken);
  body = "![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)"
  octokit.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: issue.number,
    body: body
  })
