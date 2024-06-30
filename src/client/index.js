// import the stylesheet
import "./style.css";

// add the html elements
function component() {
  const element = document.createElement("div");

  // Create input element
  const inputURL = document.createElement("input");
  element.appendChild(inputURL);

  // Create paragraph element
  const pResult = document.createElement("p");
  pResult.textContent = "Please enter a valid URL.";
  element.appendChild(pResult);

  return element;
}

document.body.appendChild(component());

// get the input and paragraph elements for reference
const inputURL = document.querySelector("input");
const pResult = document.querySelector("p");

// check if the URL is in a valid format
function isValidURL(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
}

let timeoutId;
// event listener for any input
// throttle the input by 1 second to avoid making too many requests
inputURL.addEventListener("input", async () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    const url = inputURL.value.trim();
    // check if the URL is in a valid format
    if (!isValidURL(url)) {
      pResult.textContent = "Invalid URL format";
      return;
    }
    // make a POST request to the server to check the URL
    try {
      const response = await fetch("http://localhost:8000/check-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      // get result from the server
      const result = await response.json();
      pResult.textContent = result.message;
    } catch (error) {
      pResult.textContent = "Error connecting to server";
    }
  }, 1000);
});
