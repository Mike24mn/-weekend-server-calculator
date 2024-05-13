function onReady() {
  console.log("JavaScript is loaded!");

  console.log("Greetings from client.js");

  window.handleSubmit = handleSubmit;

  axios({
    method: "GET",
    url: "/calculations",
  })
    .then(function (response) {
      // Code that will run on successful response
      // from the server.

      console.log("Stuff we fetchin'", response.data); // return data we fetchin' from the server in response to request

      const recentResult = response.data; // set variable equal to what we fetchin'

      console.log("Full item data:", recentResult);

      // logic in if statement below for get request of most recent result rendering
      // set recentResult (variable above) to response data fetched from the server
      // then if the length is greater than 0, meaning something is present there,
      // creates a new variable lastResult that is equal to the most recent index value
      // of recentResult, hence the .length -1 logic, we then turn it into a string
      // and slap it into the 'recentResult' location of our HTML, Bazinga!

      if (recentResult.length > 0) {
        const lastResult = recentResult[recentResult.length - 1];
        const lastResultString = `${lastResult.numOne} ${lastResult.operator} ${lastResult.numTwo} = ${lastResult.result}`;
        document.getElementById(
          "recentResult"
        ).innerHTML = `<li>${lastResultString}</li>`;
      }

      const calculations = response.data; // set another variable equal to what we fetchin'
      const resultHistoryElement = document.getElementById("resultHistory");
      resultHistoryElement.innerHTML = "";

      calculations.forEach((calc) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}`;
        resultHistoryElement.appendChild(listItem);
      });
    })
    .catch(function (error) {
      // Code that will run on any errors from the server.
      console.log(error);
      alert("Something bad happened! Check the console for more details.");
    });

  function handleSubmit(event) {
    event.preventDefault();

    console.log("handle submit works...");

    const operation = event.target.textContent; // gets button text

    const numOneInput = document.getElementById("numOne").value; // gets input value

    const numTwoInput = document.getElementById("numTwo").value; // gets input value

    const messageOutput = document.getElementById("messages"); // variable to send to id=messages in html

    if (operation === "C") {
      clearInputs();
      return;
    }
    // if operation is C, call clearInputs() function

    // the below if statement checks if num one or num two has an input, and if the inputs are not numbers

    if (
      !numOneInput ||
      !numTwoInput ||
      isNaN(numOneInput) ||
      isNaN(numTwoInput)
    ) {
      messageOutput.textContent = "Enter some valid numbers yo";
      return;
    }

    console.log(
      `incoming information: ${numOneInput} ${numTwoInput}, operation: ${operation}`
    );

    axios({
      method: "POST",
      url: "/calculations",
      data: {
        numOne: numOneInput,
        numTwo: numTwoInput,
        operator: operation,
      },
    })
      .then(function (response) {
        console.log("calculations:", response);

        return axios.get("/calculations"); //

        const data = response.data;
        const resultInString = `${data.numOne} ${data.operator} ${data.numTwo}`
        document.getElementById("recentResult").innerHTML += `<li>
          ${resultInString} = ${response.data.result}
          </li>`;

        // could also call clear inputs here instead of the code below
        document.getElementById("numOne").value = "";
        document.getElementById("numTwo").value = "";
      })

      .catch(function (error) {
        console.log(error);
        messageOutput.innerHTML = "Error, failed to process any calculations!"
      });
  }

  function clearInputs() {
    document.getElementById("numOne").value = "";
    document.getElementById("numTwo").value = "";
    document.getElementById("recentResult").innerHTML = "";
    document.getElementById("messages").textContent = "Stuff Cleared";
  }
}

onReady();
