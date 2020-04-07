function generateProjectUrl(github, title){
  var caseTitle= title.toLowerCase().split(' ').join('-');
  return `https://github.com/${github}/${caseTitle}`
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
# ${renderLicense(data.license, data.github, data.title)}
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



//
// * At least one badge
// * Project title
// * Description
// * Table of Contents template script
// * Installation template script
// * Usage
// * License
// * Contributing
// * Tests
// * Questions template script
//   * User GitHub profile picture
//   * User GitHub email