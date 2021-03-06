const core = require('@actions/core');
const github = require('@actions/github');


function DebugMessage(issue){
  if (issue.body.includes("/debug")) {
    const issue_string = JSON.stringify(issue, undefined, 2)
    console.log(issue_string)
  }
  else {
    console.log("If you want to see the issue details, just type ´/debug´ in your issue description.")
  }
}
function CloseIssueIfEmpty(octokit, issue, repo) {
  
  if (issue.body === "") {
    octokit.issues.update({
      owner: repo.owner,
      repo: repo.repo,
      issue_number: issue.number,
      state: "closed"
    })
    const yaktocatBody = "![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)"

    octokit.issues.createComment({
      owner: repo.owner,
      repo: repo.repo,
      issue_number: issue.number,
      body: yaktocatBody
    })
    return true
  }
  return false
}
function EnsureChecklistCompleted(octokit, body, repo){
  const checklist_item_1 ="- [x] Updated `fastlane-plugin-test_center` to the latest version"
  const checklist_item_2 ="- [x] I read the [README.md](https://github.com/lyndsey-ferguson/fastlane-plugin-test_center/blob/master/README.md)"
    const checklist_item_3 ="- [x] I reviewed the [example(s)](https://github.com/lyndsey-ferguson/fastlane-plugin-test_center/blob/master/README.md) for the action(s) I am using"
      const checklist_item_4 ="- [x] I have removed any sensitive data such as passwords, authentication tokens, or anything else I do not want to world to see"
      var noChecklistItem1 = !issue.body.includes(checklist_item_1)
      var noChecklistItem2 = !issue.body.includes(checklist_item_2)
      var noChecklistItem3 = !issue.body.includes(checklist_item_3)
      var noChecklistItem4 = !issue.body.includes(checklist_item_4)
      if (noChecklistItem1||noChecklistItem2||noChecklistItem3||noChecklistItem4){
        var comment = "# THERE ARE SOME PROBLEMS\n"
        if (noChecklistItem1){
          comment = comment + "_**Please** make sure that you update fastlane to the latest version._"
        }
        if (noChecklistItem2){
          comment = comment + "\n" + "_**Please** make sure that read the README.md_"
        }
        if (noChecklistItem3){
          comment = comment + "\n" + "_**Please** make sure that you have reviewed the documentation for the action you are using_"
        }
        if (noChecklistItem4){
          comment = comment + "\n" + "_**Please** make sure that you have removed all sensitive data, otherwise people may use that data in ways that cause harm._"
        }
        octokit.issues.createComment({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          issue_number: issue.number,
          body: comment
        })
      }

    }

const issue = github.context.payload.issue
const myToken = core.getInput('repo-token');
const octokit = new github.GitHub(myToken);

DebugMessage(issue)
if (CloseIssueIfEmpty(octokit, issue, github.context.repo)) {
  return
}
EnsureChecklistCompleted(octokit, issue.body, github.context.repo)

console.log(issue.html_url)
