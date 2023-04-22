const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateHtml = require("./util/generateHtml");
const team = []

// Function that runs on startup.
async function init(){
    console.log("Welcome to the Team Builder!")
    
    const manager = await managerMaker();
    team.push(manager);
    teamBuilder();
}

// The bulk of the program. Has the select menu and the switch for controlling
// what happens for each selection.
async function teamBuilder(){

    // Inquirer Selection Menu
    const select = await inquirer.prompt([
        {
            name: "option",
            type: "list",
            choices: ["Add an Engineer","Add an Intern","View Current Team","Finish"],
            message: "What would you like to do?",
        }
    ])

    // Selection Menu switch function
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
            // This uses an empty inquirer prompt to allow the user to wait
            // while they view the team. They could enter text, but it'd do
            // nothing since I don't extract it.
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

// Creation Functions
// All functions run basically the same, save the specific questions asked

// Manager Creation Function
async function managerMaker(){
    const managerInput = await inquirer.prompt([
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
    // Creates and returns a Manager object
    const newManager = new Manager(managerInput.name,managerInput.id,managerInput.email,managerInput.office)
    return newManager;
}

// Engineer Creation Function
async function engineerMaker(){
    const engineerInput = await inquirer.prompt([
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
    // Creates and returns an Engineer object
    const newEngineer = new Engineer(engineerInput.name,engineerInput.id,engineerInput.email,engineerInput.github)
    return newEngineer;
}

// Intern Creation Function
async function internMaker(){
    const internInput = await inquirer.prompt([
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
    // Creates and returns an Intern object
    const newIntern = new Intern(internInput.name,internInput.id,internInput.email,internInput.school)
    return newIntern;
}

// Starts the program on file load
init();