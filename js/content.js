// Function to fetch JSON and merge with existing lists
async function fetchAndMergeContentLists() {
  try {
    const [childrensRes, shortStoriesRes, traveloguesRes, articlesRes] =
      await Promise.all([
        fetch("data/childrens-writing.json"),
        fetch("data/short-stories.json"),
        fetch("data/travelogues.json"),
        fetch("data/articles.json"),
      ]);

    // Convert responses to JSON
    const childrensJSON = await childrensRes.json();
    const shortStoriesJSON = await shortStoriesRes.json();
    const traveloguesJSON = await traveloguesRes.json();
    const articlesJSON = await articlesRes.json();

    // Merge JSON data with existing lists
    childrensWritingList = [...childrensJSON, ...childrensWritingList];
    shortStoriesList = [...shortStoriesJSON, ...shortStoriesList];
    traveloguesList = [...traveloguesJSON, ...traveloguesList];
    articlesList = [...articlesJSON, ...articlesList];

    // Render all content sections after merging
    renderAllContentSections();
  } catch (error) {
    console.error("Error fetching JSON files:", error);
  }
}

// Function to render a list of content as cards
function renderContentList(contentList, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '<div class="row"></div>';
  const rowContainer = container.querySelector(".row");

  contentList.forEach((content) => {
    const cardHTML = `
      <div class="col-md-4 mb-4">
        <div class="card h-100" onclick="location.href='details.html?id=${content.id}'" style="cursor: pointer;">
          <img src="${content.image}" class="card-img-top" alt="${content.title}">
          <div class="card-body">
            <h5 class="card-title">${content.title}</h5>
            <p class="card-text">${content.shortDescription}</p>
          </div>
        </div>
      </div>
    `;
    rowContainer.innerHTML += cardHTML;
  });
}

// Function to render all content sections
function renderAllContentSections() {
  renderContentList(childrensWritingList, "childrens-writing");
  renderContentList(shortStoriesList, "short-stories");
  renderContentList(traveloguesList, "travelogues");
  renderContentList(articlesList, "articles");
}

// On page load, fetch JSON and render sections
fetchAndMergeContentLists();
