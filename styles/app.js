// GET USER DATA
// Character selection dropdown menu will provide main characters (and some minor faves) as options to select.
// “Get a Quote!” button with click/submit event listener. Once triggered, save all user values in any associated input fields as variables (method: characterChoice).

// 	MANIPULATE DATA/FETCH RESPONSE
// Code method (getQuote) to return values related to characterChoice (user input) through API call.
// Store returned API data as variables to fulfill initial request (i.e. quote itself, episode name, season number).
// Alert user should they attempt to submit “Get a Quote!” button without choosing value for character select.

// 	DISPLAY API DATA/MANIPULATE DOM
// Code method (displayData) to display returned values of getQuote method by:
// Store HTML DOM elements to be altered as variables.
// Create new HTML elements required to display returned API data.
// Populate and append created elements within the properly defined DOM structure with stored API data

// STRETCH: Upon presenting the quote to user, offer user choice to select to see another quote, plot synopsis of current quote, details related to episode, any other applicable data returned from getQuote method.

friendsApp = {};

// base url for api
friendsApp.url = new URL("https://friends-quotes-api.herokuapp.com/quotes/");

// method to get user selection when button is clicked
friendsApp.userChoice = (allQuotes) => {
  const button = document.querySelector(".random-button");
  const pulldownMenu = document.getElementById("friends-name");
  let friendChoice = pulldownMenu.value;
  // when the "shuffle" button is clicked, run the code blow
  button.addEventListener("click", function(event) {
    // stop default behaviour of button click
    event.preventDefault();
    // on button click, store the value of the pulldown menu
    friendChoice = pulldownMenu.value;
    console.log(friendChoice);
    console.log(allQuotes);
    // run method to display data on page
    friendsApp.displayData(friendChoice);
    // run function to filter new array with just quotes from selection
    friendsApp.characterQuotes(allQuotes, friendChoice);

  })
}

// method to display quote on page
friendsApp.displayData = (character) => {
  // create new p element
  const quoteElement = document.createElement("p");
  // create text node and put character quote into it
  const quote = document.createTextNode(`a quote from ${character}`); 
  // put quote inside new p element
  quoteElement.appendChild(quote);
  // grab quote box
  const quoteBox = document.querySelector(".board");
  // clear current text in quote box
  quoteBox.innerHTML = "";
  // append into quote box on html 
  quoteBox.appendChild(quoteElement);
}

// method to create new array with JUST quotes from the character selected
friendsApp.characterQuotes = (allQuotes, friendChoice) => {
  console.log(allQuotes, friendChoice);
  // capitalize first letter in friendChoice
  const firstLetter = friendChoice.charAt(0);
  const capitalLetter = firstLetter.toUpperCase();
  const smallLetters = friendChoice.slice(1);
  const friendChoiceCapital = capitalLetter + smallLetters;

  // filter new array with just quotes from user selected character
  const characterQuotes = allQuotes.filter((quote) => {
    return quote.character === friendChoiceCapital;
  });

  console.log(characterQuotes);
}

// method to request quote data from api
friendsApp.getQuotes = () => {
  fetch(friendsApp.url)
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    // storing data in an array 
    const allQuotes = data;
    // run function to see user selection (returned as "character")
    friendsApp.userChoice(allQuotes);
  })
}

// create an initialization method
friendsApp.init = () => {
  // calling the method that makes the api request
  friendsApp.getQuotes();
}

// call the init method to start the app
friendsApp.init();



