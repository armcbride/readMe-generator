const api = require('./utils/api');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs');
const inquirer = require('inquirer');


inquirer
const questions = [
{type: "input",
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
},
];

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
