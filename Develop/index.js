const axios = require('axios');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

function getQuestions(){
inquirer
.prompt([{type: "input",
message: "what is your name?",
name: "name"
},
{type: "input",
message: "what is your Github username?",
name: "github"
},
{type: "input",
message: "what is your Project Name?",
name: "title"
},
{type: "input",
message: "Describe your project.",
name: "description"
},
{type: "input",
message: "What sort of installation is necessary?",
name: "install"
},
{type: "checkbox",
message: "what technologies did you use?",
name: "technology",
choices: ["HTML", "CSS","javaScript","jQuery", "AJAX","Node.JS","Express","React.js", "React", "MongoDB", "Heroku", "Command-Line", "Bootstrap", "MySQL"]
},
{type: "input",
message: "What is the purpose of this app?",
name: "usage"
},
{type: "list",
message: "What license is used?",
choices: ["MIT", "BSD", "ISC", "Apache", "GPL"],
name: "list"
},
{type: "input",
message: "Who contributed?",
name: "contributors"
},
{type: "input",
message: "What is your linkedIn username?",
name: "linkedin"
},
{type: "input",
message: "What is the link to your portfolio?",
name: "portfolio"
},
{type: "input",
message: "Tests?",
name: "tests"
}])
.then(function(response){
    let userName = response.username

    githubAPI(userName, response);
});
}
getQuestions()

//axios call for github


function githubAPI(userName, response) {
    const queryUrl = `https://api.github.com/users/${userName}`;
  
    axios
      .get(queryUrl, {
        headers: {
          "Authorization": `token ${process.env.GH_TOKEN}`
        }
      })
      .then(function (res) {  
  
        generateMD(response, res);
      }).catch(function (err) {
  
        console.log(err);
  
      });
    }

  function renderLicense(license, github, title){
  
    if (license !== "none"){
      return `[![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)](${generateProjectUrl(github, title)})`
    } 
    return "";
  }
  
  
  function renderSection (license){
    if (license !== "none"){
      return (`## License
      This project is under the ${license} license.
      `)
    }
  
    return '';
  }
  
  function generateMarkdown(data) {
    return `
  # ${data.title}

   ${renderLicense(data.license, data.github, data.title)}
  
  ## Description
  ${data.description}

  # Table of Contents
  
  To install the following dependencies, run the following command 
  ${data.installation}
  
  # Usage
  ${data.usage}
  ${renderSection(data.license)}
  
  # Contributors
  ${data.contributing}
  
  # Test
  to run rest, run the following commands
  ${data.test}
  
  # Questions
  If you have any questions or issues running please contact
  ${data.github} ${data.email}
  `;
  }
  
  module.exports = generateMarkdown;

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(),fileName),data)
}

function init() {
inquirer.prompt(questions).then(responses =>{
    console.log("searching")
    api.getUser(responses.github)
    .then(({data})=>{
        writeToFile("README.md",generateMarkdown({... responses, ... data}))
    })
})

}

init();
