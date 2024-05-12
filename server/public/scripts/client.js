function onReady() {

    console.log("JavaScript is loaded!");

    console.log("Greetings from client.js");

    window.handleSubmit = handleSubmit

    axios({
        method: "GET",
        url: "/calculations",
      })
        .then(function (response) {
          // Code that will run on successful response
          // from the server.
    
          console.log("Stuff we fetchin'", response.data); // return data we fetchin' from the server in response to request
    
          const numFromServer = response.data; // set variable equal to what we fetchin'
    
          console.log("Full item data:", numFromServer);
    
          const recentResult = document.querySelector("#recentResult");
    

        })
        .catch(function (error) {
          // Code that will run on any errors from the server.
          console.log(error);
          alert("Something bad happened! Check the console for more details.");
        });
    

  
  function handleSubmit(event) {

    event.preventDefault();

    console.log("handle submit works...");

    const recentResult = document.getElementById("recentResult");
  
    const numOneInput = document.getElementById("numOne").value;
  
    const numTwoInput= document.getElementById("numTwo").value;

    const messageOutput = document.getElementById("messages")

    const addBtn = document.getElementById('add')

    const subtractBtn = document.getElementById('subtract')

    const multiplyBtn = document.getElementById('multiply')

    const divideBtn = document.getElementById('divide') 

    const equalsBtn = document.getElementById('equals')

    const clearBtn = document.getElementById('clear')

    console.log(`incoming information: ${numOneInput} ${numTwoInput}`);
  
    if (numOneInput && numTwoInput) {
      axios({
        method: "POST",
        url: "/calculations",
        data: {
          numOne: numOneInput,
          numTwo: numTwoInput,
        },
      })
        .then(function (response) {
          console.log("calculations added:", response);
          document.getElementById("recentResult").innerHTML += `<tr>
          <td>Player One's Guess Is: ${numOneInput} Player Two's Guess Is:${numTwoInput}
          </td></tr>`;
          document.getElementById("numOne").value = "";
          document.getElementById("numTwo").value = "";
        })
  
        .catch(function (error) {
          console.log(error);
          messageOutput.innerHTML = "Error, failed to process any calculations!";
        });
    } 
    else {
      messageOutput.innerHTML = "* Missing information, please ensure fields one and two are filled out prior to submission!";
    }
  }
}

onReady();
  