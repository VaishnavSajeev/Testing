const writingsContainer = document.getElementById("writings-container");
const outputContainer = document.createElement("div"); // Container to display formatted output
outputContainer.id = "formatted-output";
writingsContainer.after(outputContainer);

let subtitleCount = 0;
let paragraphCount = 0;

function addSubtitle() {
  subtitleCount++;
  const subtitleInputWrapper = document.createElement("div");
  subtitleInputWrapper.classList.add(
    "input-wrapper",
    "d-flex",
    "align-items-center",
    "mb-2"
  );

  const subtitleInput = document.createElement("input");
  subtitleInput.type = "text";
  subtitleInput.className = "form-control";
  subtitleInput.name = "subtitle";
  subtitleInput.id = "subtitle-" + subtitleCount;
  subtitleInput.placeholder = "Enter Subtitle";

  const closeButton = document.createElement("button");
  closeButton.classList.add("btn", "btn-danger", "ms-2");
  closeButton.innerHTML = "×"; // Close button
  closeButton.onclick = () => removeInput(subtitleInputWrapper); // Remove subtitle input on click

  subtitleInputWrapper.appendChild(subtitleInput);
  subtitleInputWrapper.appendChild(closeButton);
  writingsContainer.appendChild(subtitleInputWrapper);
}

function addParagraph() {
  paragraphCount++;
  const paragraphInputWrapper = document.createElement("div");
  paragraphInputWrapper.classList.add(
    "input-wrapper",
    "d-flex",
    "align-items-center",
    "mb-2"
  );

  const paragraphInput = document.createElement("textarea");
  paragraphInput.className = "form-control";
  paragraphInput.name = "paragraph";
  paragraphInput.id = "paragraph-" + paragraphCount;
  paragraphInput.placeholder = "Enter Paragraph";

  const closeButton = document.createElement("button");
  closeButton.classList.add("btn", "btn-danger", "ms-2");
  closeButton.innerHTML = "×"; // Close button
  closeButton.onclick = () => removeInput(paragraphInputWrapper); // Remove paragraph input on click

  paragraphInputWrapper.appendChild(paragraphInput);
  paragraphInputWrapper.appendChild(closeButton);
  writingsContainer.appendChild(paragraphInputWrapper);
}

function removeInput(inputWrapper) {
  inputWrapper.remove(); // Removes the input field along with the close button
}

function convertContent() {
  const inputs = writingsContainer.querySelectorAll("input, textarea");
  let formattedContent = "";

  inputs.forEach((input) => {
    if (input.tagName === "INPUT") {
      // Wrap subtitles in <h2> tag
      formattedContent += `<h2 class="title-pink text-decoration-underline">${input.value}</h2>\n`;
    } else if (input.tagName === "TEXTAREA") {
      // Wrap paragraphs in <p> tag and add <br> after each paragraph
      formattedContent += `<p>${input.value}</p>\n<br>\n`;
    }
  });

  outputContainer.innerHTML = `
    
      ${formattedContent}
      <button onclick="copyFormattedContent()" class="btn btn-success mt-2">Copy Content</button>
    
  `;
}

function copyFormattedContent() {
  const formattedText = outputContainer.innerHTML
    .replace(/<button.*<\/button>/g, "") // Remove copy button from copied text
    .trim();

  navigator.clipboard
    .writeText(formattedText)
    .then(() => alert("Formatted content copied!"))
    .catch(() => alert("Failed to copy content."));
}
