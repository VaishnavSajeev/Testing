// Highlight list
let highlightsList = [].reverse();

// Novel list
let novelsList = [].reverse();

// Children's Writing list
let childrensWritingList = [].reverse();

// Short Stories list
let shortStoriesList = [].reverse();

// Travelogues list
let traveloguesList = [].reverse();

// Articles list
let articlesList = [].reverse();

async function fetchAndMergeHighlights() {
  try {
    const response = await fetch("data/highlights.json"); // Update with your JSON file path
    if (!response.ok) throw new Error("Failed to fetch JSON data");

    // Extract the nested "highlights" array
    const { highlights } = await response.json();

    // Merge the two lists
    highlightsList = [...highlights, ...highlightsList].reverse();

    // Render the updated highlights list
    renderHighlights();
  } catch (error) {
    console.error("Error fetching highlights JSON:", error);
  }
}

// Render highlights list on the index page
function renderHighlights() {
  const highlightsContainer = document.getElementById("highlights");
  highlightsContainer.innerHTML = ""; // Clear container before rendering
  highlightsList.forEach((highlight) => {
    const cardHTML = `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${highlight.image}" class="card-img-top" alt="${highlight.title}">
          <div class="card-body">
            <h5 class="card-title">
              <a href="details.html?id=${highlight.id}" class="orange-solid-text">${highlight.title}</a>
            </h5>
            <p class="card-text truncate">${highlight.description}</p>
          </div>
        </div>
      </div>
    `;
    highlightsContainer.innerHTML += cardHTML;
  });
}

async function fetchAndMergeNovels() {
  try {
    const response = await fetch("data/novels.json"); // Update with your JSON file path
    if (!response.ok) throw new Error("Failed to fetch novels JSON data");

    const { novels } = await response.json();

    // Merge the two lists
    novelsList = [...novels, ...novelsList];

    // Render the updated novels list
    renderNovels();
  } catch (error) {
    console.error("Error fetching novels JSON:", error);
  }
}

// Render novels list on the index page
function renderNovels() {
  const novelsContainer = document.getElementById("novels");
  novelsContainer.innerHTML = '<div class="row"></div>'; // Add Bootstrap row for better layout

  const rowContainer = novelsContainer.querySelector(".row");

  novelsList.forEach((novel) => {
    const cardHTML = `
      <div class="col-md-4 mb-4">
        <div class="card h-100" onclick="location.href='details.html?id=${novel.id}'" style="cursor: pointer;">
          <img src="${novel.image}" class="card-img-top" alt="${novel.title}">
          <div class="card-body">
            <h5 class="card-title">${novel.title}</h5>
            <p class="card-text">${novel.shortDescription}</p>
          </div>
        </div>
      </div>
    `;
    rowContainer.innerHTML += cardHTML;
  });
}

async function fetchAllListsForDetails() {
  try {
    const [
      highlightsRes,
      novelsRes,
      childrensRes,
      shortStoriesRes,
      traveloguesRes,
      articlesRes,
    ] = await Promise.all([
      fetch("data/highlights.json"),
      fetch("data/novels.json"),
      fetch("data/childrens-writing.json"),
      fetch("data/short-stories.json"),
      fetch("data/travelogues.json"),
      fetch("data/articles.json"),
    ]);

    // Convert responses to JSON
    const highlightsJSON = await highlightsRes.json();
    const novelsJSON = await novelsRes.json();
    const childrensJSON = await childrensRes.json();
    const shortStoriesJSON = await shortStoriesRes.json();
    const traveloguesJSON = await traveloguesRes.json();
    const articlesJSON = await articlesRes.json();

    // Merge JSON data with existing lists
    highlightsList = [...highlightsJSON.highlights, ...highlightsList];
    novelsList = [...novelsJSON.novels, ...novelsList];
    childrensWritingList = [...childrensJSON, ...childrensWritingList];
    shortStoriesList = [...shortStoriesJSON, ...shortStoriesList];
    traveloguesList = [...traveloguesJSON, ...traveloguesList];
    articlesList = [...articlesJSON, ...articlesList];

    // After fetching and merging, display the details
    displayHighlightDetails();
  } catch (error) {
    console.error("Error fetching JSON files for details page:", error);
  }
}

// Function to display item details
function displayHighlightDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  let item =
    highlightsList.find((item) => item.id === id) ||
    novelsList.find((novel) => novel.id === id) ||
    childrensWritingList.find((item) => item.id === id) ||
    shortStoriesList.find((item) => item.id === id) ||
    traveloguesList.find((item) => item.id === id) ||
    articlesList.find((item) => item.id === id);

  if (item) {
    const highlightDetailsContainer =
      document.getElementById("highlight-details");
    highlightDetailsContainer.innerHTML = `
      <div class="col-md-8">
        <div class="card">
          <img src="${item.image}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <h1 class="card-title">${item.title}</h1>
            <p class="card-text">${item.longDescription || item.description}</p>
          </div>
        </div>
      </div>
    `;
  } else {
    document.getElementById("highlight-details").innerHTML = `
      <div class="alert alert-danger">Item not found!</div>
    `;
  }
}

// On page load, fetch JSON and then display details

// Call render functions if the containers exist
// if (document.getElementById("highlights")) renderHighlights();
if (document.getElementById("highlights")) fetchAndMergeHighlights();
// if (document.getElementById("novels")) renderNovels();
if (document.getElementById("novels")) fetchAndMergeNovels();
