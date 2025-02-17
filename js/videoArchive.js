let youtubeVideos1 = [];

function getYouTubeID(url) {
  let match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|embed\/|v\/))([^&?\/]+)/
  );
  return match ? match[1] : null;
}

async function fetchAndMergeYouTubeVideos() {
  try {
    const [familyvideo1Response] = await Promise.all([
      fetch("data2/videogallery.json"),
    ]);

    const [familyvideo1Json] = await Promise.all([familyvideo1Response.json()]);

    // Merge JSON data with existing YouTube video lists
    youtubeVideos1 = [...youtubeVideos1, ...familyvideo1Json.youtubeVideos1];

    // Generate slides for both YouTube sliders
    generateYouTubeSlides(youtubeVideos1, "youtubeSlider1");
  } catch (error) {
    console.error("Error fetching YouTube JSON data:", error);
  }
}

// Call the function to fetch and merge YouTube videos
fetchAndMergeYouTubeVideos();

// Function to generate YouTube slides
function generateYouTubeSlides(videoList, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = videoList
    .map((video) => {
      const videoID = getYouTubeID(video.url);
      const thumbnailURL = `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`; // Medium quality thumbnail

      return `
          <div class="swiper-slide pb-4">
              <a href="${video.url}" target="_blank">
                  <img src="${thumbnailURL}" alt="${video.title}">
              </a>
              <a class="orange-solid-text" href="${video.url}" target="_blank">${video.title}</a>
          </div>
      `;
    })
    .join("");
}

// Generate slides for both YouTube sliders
generateYouTubeSlides(youtubeVideos1, "youtubeSlider1");

new Swiper(".mySwiper3", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  loop: true,

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});
