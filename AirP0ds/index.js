const core = require('@actions/core');
const github = require('@actions/github');


  const number = JSON.stringify(github.number, undefined, 2)
  console.log(`The event number: ${number}`);
  const title = JSON.stringify(github.title, undefined, 2)
  console.log(`The event title: ${title}`);
