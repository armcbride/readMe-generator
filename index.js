//calls
const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
require(`dotenv`).config();

//function to ask questions
function getQuestions() {
    inquirer
      .prompt([{
          type: "input",
          message: "What is your name?",
          name: "name"
        },
        {
          type: "input",
          message: "What is your GitHub username?",
          name: "username"
        },
        {
          type: "Input",
          message: "What is the project name?",
          name: "project"
        },
        {
          type: "input",
          message: "Describe the application:",
          name: "description"
        },
        {
          type: "input",
          message: "What needs to be installed to make this function?",
          name: "installation"
        },
        {
          type: "checkbox",
          message: "Technology used",
          choices: [" HTML", " CSS", " Bootstrap", " APIs", " JSON", " Node.Js", " Express", " JavaScript", " jQuery", " React.js", " React", " MongoDB", " MySQL",  " Heroku", " Command- Line", "Handlebars"],
          name: "technology"
        },
        {
          type: "input",
          message: "Usage",
          name: "usage"
        },
        {
          type: "list",
          message: "License",
          choices: ["MIT", "BSD", "ISC", "Apache", "GPL"],
          name: "license"
        },
        {
          type: "input",
          message: "Who contributed in the project?",
          name: "contributors"
        },
        {
          type: "input",
          message: "What is your LinkedIn username?",
          name: "linkedin"
        },
        {
          type: "input",
          message: "What is your portfolio URL?",
          name: "portfolio"
        },
        {
          type: "input",
          message: "Tests?",
          name: "tests"
        },
        {
          type: "input",
          message: "Any Questions?",
          name: "questions"
        }
      ])
      .then(function (response) {
        let userName = response.username
  
        gitAPI(userName, response);
      });
  }
  //calling question function
  getQuestions();
  
  //API call function
  function gitAPI(userName, response) {
    const queryUrl = `https://api.github.com/users/${userName}`;
  
    axios
      .get(queryUrl, {
        method:'post',
        headers: {
          "Authorization": `token ${process.env.API_TOKEN}`
        }
      })
      .then(function (res) {
        console.log(res.data);
  
        generateMarkdown(response, res);
      }).catch(function (err) {
  
        console.log(err);
  
      });
  
  }
  // function that generates the MD file
  function generateMarkdown(response, res) {
  
    const usersInfo = `
  <h1 align= "center">${response.project}</h1> 
  <h2>Table of Contents<h2>
  <ul>
  <li><a href="#descrip">Description</a></li>  
  <li><a href="#install">Installation</a></li> 
  <li><a href="#tech">Technology</a></li> 
  <li><a href="#use">Usage</a></li> 
  <li><a href="#license">License</a></li>
  <li><a href="#screen">Screenshots</a></li> 
  <li><a href="#contr">Contributors</a></li> 
  <li><a href="#tests">Tests</a></li>
  <li><a href="#quest">Questions</a></li>  
  </ul>
    <hr>
  <div id="descrip"><h2>Description</h2> </div>
  ${response.description}
  <hr>
  <div id="install"><h2>Installation</h2> </div>
  <p>${response.installation}</p>
  <hr>
  <div id="tech"><h2>Technology</h2></div>           
  <p>${response.technology}</p>
  <hr>
  <div id="use"><h2>Usage</h2></div>
  <p>${response.usage}</p>  
  <hr>
  <div id="license"><h2>License</h2></div>
  <p><img align="left" src= "https://img.shields.io/badge/License-${response.license}-blue"></p><br>
  <hr>
  <div id="screen"><h2>Screenshots</h2></div>
  <p><img src= ""><img src= ""><img src= ""></p>
  <hr>
  <div id="contr"><h2>Contributors</h2> </div>
  <p>${response.contributors}</p> 
  <hr>
  <div id="tests"><h2>Tests</h2></div>
  <p>${response.tests}</p>
  <hr>
  <div id="quest"><h2>Questions?</h2> </div>
  <img align="right" width="100" height="100" src="${res.data.avatar_url}">         
    Contact: ${response.name}       
  <ul>
  <li>Github: <a href= "https://github.com/${response.username}">https://github.com/${response.username}</a></li>
  <li>Portfolio: <a href= "${response.portfolio}">${response.portfolio}</a></li>
  <li>Email: <a href= "mailto:${res.data.email}">${res.data.email}</a> </li>     
  <li>LinkedIn: <a href= "https://www.linkedin.com/in/${response.linkedin}">https://www.linkedin.com/in/${response.linkedin}</a></li>
  </ul> 
  <hr>`
  
    fs.writeFile("create-README.md", usersInfo, function (err) {
   
      if (err) {
        return console.log(err);
      }
  
      console.log("generating...");
  
    });
  
  
  };