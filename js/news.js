// Render functions for the new sections
let newsList = [].reverse();

async function fetchAndMergeNews() {
  try {
    const [newsResponse] = await Promise.all([fetch("data2/news2.json")]);

    const [newsJson] = await Promise.all([newsResponse.json()]);

    // Merge JSON data with existing lists
    newsList = [...newsList, ...newsJson.newsList];

    // Display updated content
    displayNews();
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

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
          <a href="details.html?id=${news.id}" class="btn btn-primary orange-btn">Read More</a>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

fetchAndMergeNews();
