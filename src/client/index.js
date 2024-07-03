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
  const url = inputURL.value.trim();
  // check if the URL is in a valid format
  if (!isValidURL(url)) {
    pResult.textContent = "Invalid URL format";
    return;
  } else {
    // change the text while waiting for the server response
    pResult.textContent = "URL changed - waiting for server response...";
    pResult.style.color = "grey";
    timeoutId = setTimeout(async () => {
      // make a POST request to the server to check the URL
      try {
        const response = await fetch("http://localhost:8000/check-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        // get result from the server
        const result = await response.json();
        let message;
        switch (result.code) {
          case 200:
            message =
              result.type === "file"
                ? `File exists: ${result.path}`
                : `Directory exists: ${result.path}`;
            pResult.style.color = "black";
            break;
          case 404:
            message = "URL does not point to a file or folder that exists.";
            pResult.style.color = "lightcoral";
            break;
          default:
            message = "An unknown error occurred. Please try again.";
            pResult.style.color = "red";
        }
        pResult.textContent = message;
      } catch (error) {
        pResult.textContent =
          "Error connecting to server. Please start the server and try again.";
        pResult.style.color = "red";
      }
    }, 1000);
  }
});
