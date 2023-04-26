# Team Profile Generator

## Description

The Team Profile Generator is a tool for creating an HTML webpage for a development team comprised of a single Manager, and multiple Engineers or Interns. Each employee has data specific to them stored, like the Engineer having a Github link, for example. It works by using Inquirer prompts to collect the information, then formatting it into a readable HTML document.

This challenge was quite interesting, and I feel that the biggest hurdle for me personally was not over-complicating things. I did add the extra functionality of being able to view the current team you had, partly as a debugging tool and partly because it is actually useful.

If I come back to this, I would like to add a way to delete individual members and change the Manager's info, both things which should not be too difficult.

## Installation

In order to use the Team Profile Generator, clone this repository onto your local machine into a folder of your choice. Make sure you have NODE.js installed, and run the `npm install` command in the repository folder.

## Usage

A video demonstration can be found [here](https://drive.google.com/file/d/1ApHC60tB1pyssQ8IQC9gkJx2jFkHjgvC/view?usp=sharing).

Navigate to the folder you installed this repository in, and run the command `node index.js`. Fill out the required prompts until satisfied, then select "Finish" and your HTML document will be created.

## Credits

Starter code was provided for this Challenge - the tests, the HTML generation, and the basic outline of the 4 classes in the lib folder were all provided by the bootcamp. It also uses the Inquirer and Jest NPM packages, as well as the Bootcamp CSS framework.