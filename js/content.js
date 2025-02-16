//

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

    // Extract category-specific arrays from JSON structure
    const highlightsData = highlightsJSON["highlights"] || [];
    const novelsData = novelsJSON["novels"] || [];
    const childrensData = childrensJSON["childrens-writing"] || [];
    console.log(childrensData);

    const shortStoriesData = shortStoriesJSON["short-stories"] || [];
    const traveloguesData = traveloguesJSON["travelogues"] || [];
    const articlesData = articlesJSON["articles"] || [];

    // Merge JSON data with existing lists
    highlightsList = [...highlightsData, ...highlightsList];
    novelsList = [...novelsData, ...novelsList];
    childrensWritingList = [...childrensData, ...childrensWritingList];
    shortStoriesList = [...shortStoriesData, ...shortStoriesList];
    traveloguesList = [...traveloguesData, ...traveloguesList];
    articlesList = [...articlesData, ...articlesList];

    renderContentList(childrensWritingList, "childrens-writing");
    renderContentList(shortStoriesList, "short-stories");
    renderContentList(traveloguesList, "travelogues");
    renderContentList(articlesList, "articles");

    // After fetching and merging, display the details
  } catch (error) {
    console.error("Error fetching JSON files for details page:", error);
  }
}

fetchAllListsForDetails();
// Render all new content sections
// function renderAllContentSections() {
//   fetchAllListsForDetails();
//   console.log(shortStoriesList);
//   renderContentList(childrensWritingList, "childrens-writing");
//   renderContentList(shortStoriesList, "short-stories");
//   renderContentList(traveloguesList, "travelogues");
//   renderContentList(articlesList, "articles");
// }

// renderAllContentSections();
