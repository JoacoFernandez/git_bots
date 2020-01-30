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
  const checklist_item_3 ="- [x] I reviewed the [example(s)](https://github.com/lyndsey-ferguson/fastlane-plugin-test_center/blob/master/README.md) for the action(s) I am using "
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
  else if ( !issue.body.includes(checklist_item_1)||!issue.body.includes(checklist_item_2)||(!checklist_item_3)) {
    var comment
    if (!issue.body.includes(checklist_item_1) &&  !issue.body.includes(checklist_item_2) && (checklist_item_3)) {
      comment = "Please make sure that you update fastlane to the latest version." + "\n" + "Please make sure that read the README.md" + "\n" + "Please make sure that you have reviewed the documentation for the action you are using"
    }
    else if (!issue.body.includes(checklist_item_1)) {
      comment = "Please make sure that you update fastlane to the latest version."
    }
    else if (! issue.body.includes(checklist_item_2)){
      comment = "Please make sure that read the README.md"
    }
    else if (! issue.body.includes(checklist_item_3)){
      comment = "Please make sure that you have reviewed the documentation for the action you are using"
    }

    octokit.issues.createComment({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: issue.number,
      body: comment
    })
  }
