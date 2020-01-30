const core = require('@actions/core');
const github = require('@actions/github');


  const issue = github.context.payload.issue
  const issue_string = JSON.stringify(issue, undefined, 2)
  console.log(`The event issue_string: ${issue_string}`);
  const myToken = core.getInput('repo-token');
  const octokit = new github.GitHub(myToken);
  body = "![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)"
  const checklist_item_1 ="- [x] Updated `fastlane-plugin-test_center` to the latest version"
  const checklist_item_2 ="- [x] I read the [README.md](https://github.com/lyndsey-ferguson/fastlane-plugin-test_center/blob/master/README.md)"
  const checklist_item_3 ="- [x] I reviewed the [example(s)](https://github.com/lyndsey-ferguson/fastlane-plugin-test_center/blob/master/README.md) for the action(s) I am using"
  const checklist_item_4 ="- [x] I have removed any sensitive data such as passwords, authentication tokens, or anything else I do not want to world to see"

  if (issue.body === "") {
   octokit.issues.update({
     owner: github.context.repo.owner,
     repo: github.context.repo.repo,
     issue_number: issue.number,
     state: "closed"
   })
   octokit.issues.createComment({
     owner: github.context.repo.owner,
     repo: github.context.repo.repo,
     issue_number: issue.number,
     body: body
   })

  }
  else if (!issue.body.includes(checklist_item_1)||!issue.body.includes(checklist_item_2)||!issue.body.includes(checklist_item_3)||!issue.body.includes(checklist_item_4)) {
    var comment = "# THERE ARE SOME PROBLEMS"
    if (!issue.body.includes(checklist_item_1)){
      comment = comment + "_**Please** make sure that you update fastlane to the latest version._"
    }
    if (!issue.body.includes(checklist_item_2)){
      comment = comment + "\n" + "_**Please** make sure that read the README.md_"
    }
    if (!issue.body.includes(checklist_item_3)){
      comment = comment + "\n" + "_**Please** make sure that you have reviewed the documentation for the action you are using_"
    }
    if (!issue.body.includes(checklist_item_4)){
      comment = comment + "\n" + "_**Please** make sure that you have removed all sensitive data, otherwise people may use that data in ways that cause harm._"
    }
    octokit.issues.createComment({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: issue.number,
      body: comment
    })
  }
