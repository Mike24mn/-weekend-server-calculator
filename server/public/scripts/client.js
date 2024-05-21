
function onReady() {
  console.log("JavaScript is loaded!");
  console.log("Greetings from client.js");

  window.handleSubmit = handleSubmit;
  window.setOperator = setOperator;
  window.clearInputs = clearInputs;

let operator = "";

function setOperator(value) {
  operator = value;
  console.log(`op set to: " ${value}`);
}



  function fetchCalculations() {
    axios.get("/calculations")
      .then((response) => {
        console.log("Fetched data:", response.data);
        const recentResult = response.data;

        if (recentResult.length > 0) {
          const lastResult = recentResult[recentResult.length - 1];
          const lastResultString = `${lastResult.numOne} ${lastResult.operator} ${lastResult.numTwo} = ${lastResult.result}`;
          document.getElementById("recentResult").innerHTML = `<li>${lastResultString}</li>`;
        }

        updateResultHistory(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Something bad happened! Check the console for more details.");
      });
  }

  function updateResultHistory(calculations) {
    const resultHistoryElement = document.getElementById("resultHistory");
    resultHistoryElement.innerHTML = "";

    calculations.forEach((calc) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}`;
      resultHistoryElement.appendChild(listItem);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("handle submit works...");

    let operation = operator
    const numOneInput = document.getElementById("numOne").value;
    const numTwoInput = document.getElementById("numTwo").value;
    const messageOutput = document.getElementById("messages");

    if (!numOneInput || !numTwoInput || isNaN(numOneInput) || isNaN(numTwoInput)) {
      messageOutput.textContent = "Enter some valid numbers yo";
      return;
    }

    console.log(`incoming information: ${numOneInput} ${numTwoInput}, operation: ${operation}`);

    axios.post("/calculations", {
      numOne: numOneInput,
      numTwo: numTwoInput,
      operator: operator,
    })
      .then((response) => {
        console.log("calculations:", response);

        return fetchCalculations();

        const data = response.data;
        const resultInString = `${data.numOne} ${data.operator} ${data.numTwo}`;
        document.getElementById("recentResult").innerHTML += `<li>${resultInString} = ${response.data.result}</li>`;

 

        })
        
        .then(() => {

        clearInputs();

      })

      .catch((error) => {
        console.error(error);
        messageOutput.innerHTML = "Error, failed to process any calculations!";
      });


  }

  function clearInputs() {
    document.getElementById("numOne").value = "";
    document.getElementById("numTwo").value = "";
    operator = ""
    document.getElementById("recentResult").innerHTML = "";
    document.getElementById("messages").textContent = "Stuff Cleared";
  }
  fetchCalculations()
}

onReady();

