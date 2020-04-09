const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
require(`dotenv`).config();

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
          choices: ["Node.Js", " Express", " JavaScript", " jQuery", " React.js", " React", " MongoDB", " MySQL", " HTML", " CSS", " Bootstrap", " APIs", " Heroku", " Command- Line"],
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
  getQuestions();
  
  function gitAPI(userName, response) {
    console.log(userName);
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
  
    //end function
  }
  
  function generateMarkdown(response, res) {
  
    const usersInfo = `
  <h1 align= "center">${response.project}</h1> 
  <div># Table of Contents </div>
  <ul>
  <li><a href="#description">Description</a></li>  
  <li><a href="#installation">Installation</a></li> 
  <li><a href="#tech">Technology</a></li> 
  <li><a href="#usage">Usage</a></li> 
  <li><a href="#license">License</a></li>
  <li><a href="#screen">ScreenShots</a></li> 
  <li><a href="#contributors">Contributors</a></li>   
  <li><a href="#contact">Contact</a></li> 
  <li><a href="#tests">Tests</a></li> 
  </ul>
  <div id="description"><h3>Description</h3> </div>
  ${response.description}
  <div id="installation"><h3>Installation </div>
  <p>${response.installation}          
  <div id="tech"><h3>Technology</div>           
  <p>${response.technology}</p>          
  <div id="usage"><h3>Usage </div>
  <p>${response.usage}</p>   
  <div id="license"><h3>License</div>
  <p><img align="left" src= "https://img.shields.io/badge/License-${response.license}-blue"></p>
  <div id="screen"><h3>Screenhots </div>
  <div id="contributors"><h3>Contributors </div>
  <p>${response.contributors}</p> 
  <div id="contact"><h3>Contact </div>
  <img align="right" width="100" height="100" src="${res.data.avatar_url}">         
    Name: ${response.name}       
  <a href= "https://github.com/${response.username}">GitHub</a>
  <a href= "${response.portfolio}">Portfolio</a>
  <a href= "mailto:${res.data.email}">${res.data.email}</a>      
  <a href= "https://www.linkedin.com/in/${response.linkedin}">LinkedIn</a> 
  <div id="tests">Tests</div>
  <p>${response.tests}</p>`
  
    fs.writeFile("create-README.md", usersInfo, function (err) {
  
      if (err) {
        return console.log(err);
      }
  
      console.log("Success!");
  
    });
  
  
  };