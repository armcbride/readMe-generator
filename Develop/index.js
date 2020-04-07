const api = require('./utils/api');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs');
const inquirer = require('inquirer')
inquirer

const questions = [
{type: "input",
message: "what is your username?",
name: "user",
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
