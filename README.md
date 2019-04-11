# quintype-test-solution

Problem Statement
The goal of this exercise is to build a game.

The rules of the game are as follows:

The game board has 8x8 squares (initially, all represented by question marks)
There are 8 diamonds hidden on the board, each diamond behind one of the squares
When the user clicks on a square
If the square was hiding a diamond, the diamond appears
Otherwise, the square is opened, and blank
The game ends when all diamonds are found. The user's score is the number of squares still left unturned.
Advanced: Adding Hints
Part II of this problem adds the ability to add hints to empty squares

When the user clicks on a square
If the square was not a diamond, then an arrow appears, pointing towards the nearest diamond
Any arrows that were previously show become hidden

## Steps to start the development

* Git clone https://github.com/anmol92/quintype-test-solution.git
* Go to the app directory and do `npm install` or yarn install
* Once development dependencies installed, do `npm start`

##Other Scripts

$ npm run build -> minify the app for production

$ npm run test -> to run the test cases


### Application will be listening in the port 3000. ex: http://localhost:3000/

#### Contribution
If you find anything to improve, you can feel free to contribute. Give me pull request, I am ready to accept it.
