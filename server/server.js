const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []


function addition(num1, num2) { 
  return(num1 + num2)
}

function subtraction(num1, num2) {
  return(num1 - num2)
}

function multiplication(num1, num2) {
  return(num1 * num2)
}

function division(num1, num2) {
  if (num2 ==0) {
    console.error("Cannot divide by zero");
  }
  return(num1 / num2)
}

// Here's a wonderful place to make some routes:

app.get('/calculations', (req, res) => {
  res.send(calculations);
});

// end GET /calculations

app.post("/calculations", (req, res) => {

  const {numOne, numTwo, operator} = req.body; // makes body be parsed with json and picks apart numOne, numTwo, and operator AKA destructures array values

  // if statement below checks for a lack of values and returns error if that is the case
  if (numOne == null || numTwo == null || operator == null) {
    return res.status(400).json({error: "missing data for calc"})
  }

  //function below is structured this way to allow for eventual assignment of 'result' values!!! KEEP THIS IN YOUR FUTURE TOOLBOX and remember you can do this in javascript. Assignment is determined after analysis and running of the coming blocks

  let result;
  try {
  switch(operator) {

    default: return res.status(400).send("bad operator")

    case "+":
      result = addition(parseFloat(numOne), parseFloat(numTwo))
      break;

    case "-":
      result = subtraction(parseFloat(numOne), parseFloat(numTwo));
      break

    case "*":
      result = multiplication(parseFloat(numOne), parseFloat(numTwo));
      break

    case "/":
      result = division(parseFloat(numOne), parseFloat(numTwo));
      break
  }

  const newItem = { numOne, numTwo, operator, result}

  calculations.push(newItem);

  res.status(201).json(newItem);
}

catch (error) {
  res.status(500).json({error: error.message})
  }
});


// end POST /calculations


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
