// Projects / Initiatives List
let projectsList = [].reverse();

// News & Updates List
let newsList = [].reverse();

// Function to display Projects/Initiatives
async function fetchAndMergeProjectsAndNews() {
  try {
    const [projectsResponse, newsResponse] = await Promise.all([
      fetch("data2/projects.json"),
      fetch("data2/news1.json"),
    ]);

    const [projectsJson, newsJson] = await Promise.all([
      projectsResponse.json(),
      newsResponse.json(),
    ]);

    // Merge JSON data with existing lists
    projectsList = [...projectsList, ...projectsJson.projects];
    newsList = [...newsList, ...newsJson.newsList];

    // Display updated content
    displayProjects();
    displayNews();
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

// Function to display Projects/Initiatives
function displayProjects() {
  const container = document.getElementById("projects-container");
  container.innerHTML = projectsList
    .map(
      (project) => `
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="${project.image}" class="card-img-top" alt="${project.title}">
        <div class="card-body">
          <h5 class="card-title">${project.title}</h5>
          <p class="card-text">${project.shortDescription}</p>
          <a href="people-details.html?id=${project.id}" class="btn btn-primary orange-btn">Read More</a>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Function to display News & Updates
function displayNews() {
  const container = document.getElementById("news-container");
  container.innerHTML = newsList
    .map(
      (news) => `
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="${news.image}" class="card-img-top" alt="${news.title}">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">${news.shortDescription}</p>
          <a href="people-details.html?id=${news.id}" class="btn btn-primary orange-btn">Read More</a>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

async function fetchAllListsForPeopleDetails() {
  try {
    const [projectsRes, newsRes] = await Promise.all([
      fetch("data2/projects.json"),
      fetch("data2/news1.json"),
    ]);

    // Convert responses to JSON
    const projectsJSON = await projectsRes.json();
    const newsJSON = await newsRes.json();

    // Merge JSON data with existing lists
    projectsList = [...projectsJSON.projects, ...projectsList];
    newsList = [...newsJSON.newsList, ...newsList];

    // After fetching and merging, display the details
    displayPeopleDetails();
  } catch (error) {
    console.error("Error fetching JSON files for people details page:", error);
  }
}

function displayPeopleDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  let item =
    projectsList.find((project) => project.id === id) ||
    newsList.find((news) => news.id === id);

  if (item) {
    document.getElementById("people-details").innerHTML = `
      <div class="card">
        <img src="${item.image}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
          <h1 class="card-title">${item.title}</h1>
          <p class="card-text">${item.longDescription || item.description}</p>
        </div>
      </div>
    `;
  } else {
    document.getElementById("people-details").innerHTML = `
      <div class="alert alert-danger">Item not found!</div>
    `;
  }
}
