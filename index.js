// USER STORY
// AS A manager
// I WANT to generate a webpage that displays my team's basic info
// SO THAT I have quick access to their emails and GitHub profiles

// ACCEPTANCE CRITERIA
// GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated

// Manager
    // Name
    // Employee ID
    // Email Address
    // Office Number
// Engineer or Intern or Finish
    // Engineer
        // Name
        // Employee ID
        // Email Address
        // Github Username
        // Return
    // Intern
        // Name
        // Employee ID
        // Email Address
        // School
        // Return
    // Finish
        // Build HTML
        // Exit

const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateHtml = require("./util/generateHtml");
const team = []

async function init(){
    console.log("Welcome to the Team Builder!")
    
    const manager = await managerMaker();
    team.push(manager);
    teamBuilder();
}
async function teamBuilder(){

    const select = await inquirer.prompt([
        {
            name: "option",
            type: "list",
            choices: ["Add an Engineer","Add an Intern","View Current Team","Finish"],
            message: "What would you like to do?",
        }
    ])

    switch(select.option){
        case "Add an Engineer":
            const engineer = await engineerMaker();
            team.push(engineer);
            teamBuilder();
            break;

        case "Add an Intern":
            const intern = await internMaker();
            team.push(intern);
            teamBuilder();
            break;

        case "View Current Team":
            console.log(team);
            await inquirer.prompt([
                {
                    name: "proceed",
                    type: "input",
                    message: "Press Enter to return.",
                }
            ])
            teamBuilder();
            break;

        case "Finish":
            console.log("Building Team...");
            const html = generateHtml(team);
            fs.writeFile("./output/index.html",html,error => {
                if(error){
                    console.log(error);
                }
            })
            break;

        default:
            console.log("Something has gone wrong...");
            break;
    }
}

async function managerMaker(){
    const manager = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please input the manager's name.",
        },
        {
            name: "id",
            type: "input",
            message: `Please input the manager's employee ID number.`,
        },
        {
            name: "email",
            type: "input",
            message: "Please input the manager's email address.",
        },
        {
            name: "office",
            type: "input",
            message: "Please input the manager's office number.",
        },
    ])
    const newManager = new Manager(manager.name,manager.id,manager.email,manager.office)
    return newManager;
}

async function engineerMaker(){
    const engineer = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please input the engineer's name.",
        },
        {
            name: "id",
            type: "input",
            message: `Please input the engineer's employee ID number.`,
        },
        {
            name: "email",
            type: "input",
            message: "Please input the engineer's email address.",
        },
        {
            name: "github",
            type: "input",
            message: "Please input the engineer's Github username.",
        },
    ])
    const newEngineer = new Engineer(engineer.name,engineer.id,engineer.email,engineer.github)
    return newEngineer;
}

async function internMaker(){
    const intern = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please input the intern's name.",
        },
        {
            name: "id",
            type: "input",
            message: `Please input the intern's employee ID number.`,
        },
        {
            name: "email",
            type: "input",
            message: "Please input the intern's email address.",
        },
        {
            name: "school",
            type: "input",
            message: "Please input the intern's school.",
        },
    ])
    const newIntern = new Intern(intern.name,intern.id,intern.email,intern.school)
    return newIntern;
}

init();