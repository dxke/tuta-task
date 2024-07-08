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
inputURL.addEventListener("input", async () => {
  clearTimeout(timeoutId);
  const url = inputURL.value.trim();
  // check if the URL is in a valid format
  if (!isValidURL(url)) {
    pResult.textContent = "Invalid URL format";
    return;
  } else {
    // change the text to wait for the user to finish typing (1sec throttle)
    pResult.textContent = "URL changed - waiting to finish typing...";
    pResult.style.color = "grey";
    timeoutId = setTimeout(async () => {
      // make a POST request to the server to check the URL
      try {
        pResult.textContent = "awaiting server response...";
        pResult.style.color = "grey";
        const response = await fetch("http://localhost:8000/check-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        // get result from the server
        const result = await response.json();
        let message;
        switch (result.code) {
          // if file or directory exists
          case 200:
            message =
              result.type === "file"
                ? `File exists: ${result.path}`
                : `Directory exists: ${result.path}`;
            pResult.style.color = "black";
            break;
          // if URL does not match the server's hostname
          case 403:
            message = "URL does not match the server's hostname.";
            pResult.style.color = "red";
            break;
          // if URL does not point to a file or folder
          case 404:
            message = "URL does not point to a file or folder that exists.";
            pResult.style.color = "coral";
            break;
          // other errors
          default:
            message = "An unknown error occurred. Please try again.";
            pResult.style.color = "red";
        }
        pResult.textContent = message;
      } catch (error) {
        // if server is unreachable
        pResult.textContent =
          "Error connecting to server. Please start the server and try again.";
        pResult.style.color = "red";
      }
    }, 1000);
    // throttle the input by 1 second to avoid too many requests
  }
});
