let slider1Data = [];

// List of objects for second slider
let slider2Data = [];

let youtubeVideos1 = [];

// List of YouTube videos for second slider
let youtubeVideos2 = [];

async function fetchAndMergeFamilyImages() {
  try {
    const [familyimage1Response, familyimage2Response] = await Promise.all([
      fetch("data2/familyimage1.json"),
      fetch("data2/familyimage2.json"),
    ]);

    const [familyimage1Json, familyimage2Json] = await Promise.all([
      familyimage1Response.json(),
      familyimage2Response.json(),
    ]);

    // Merge JSON data with existing slider data
    slider1Data = [...slider1Data, ...familyimage1Json.slider1];
    slider2Data = [...slider2Data, ...familyimage2Json.slider2];

    // Generate slides for both sliders
    generateSlides(slider1Data, "slider1");
    generateSlides(slider2Data, "slider2");
  } catch (error) {
    console.error("Error fetching JSON data:", error);
  }
}

// Call the function to fetch and merge JSON data
fetchAndMergeFamilyImages();

// Function to generate slides dynamically
function generateSlides(sliderData, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = sliderData
    .map(
      (item) => `
      <div class="swiper-slide">
          <img src="image/${item.imgSrc}" alt="${item.name}">
          <h6 class="pb-3">${item.name}</h6>
      </div>
  `
    )
    .join("");
}

// Generate slides for both sliders
generateSlides(slider1Data, "slider1");
generateSlides(slider2Data, "slider2");

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
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

var swiper = new Swiper(".mySwiper2", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
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

// Function to extract YouTube video ID from URL
function getYouTubeID(url) {
  let match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|embed\/|v\/))([^&?\/]+)/
  );
  return match ? match[1] : null;
}

async function fetchAndMergeYouTubeVideos() {
  try {
    const [familyvideo1Response, familyvideo2Response] = await Promise.all([
      fetch("data2/familyvideo1.json"),
      fetch("data2/familyvideo2.json"),
    ]);

    const [familyvideo1Json, familyvideo2Json] = await Promise.all([
      familyvideo1Response.json(),
      familyvideo2Response.json(),
    ]);

    // Merge JSON data with existing YouTube video lists
    youtubeVideos1 = [...youtubeVideos1, ...familyvideo1Json.youtubeVideos1];
    youtubeVideos2 = [...youtubeVideos2, ...familyvideo2Json.youtubeVideos2];

    // Generate slides for both YouTube sliders
    generateYouTubeSlides(youtubeVideos1, "youtubeSlider1");
    generateYouTubeSlides(youtubeVideos2, "youtubeSlider2");
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
generateYouTubeSlides(youtubeVideos2, "youtubeSlider2");

// Initialize Swipers
new Swiper(".mySwiper3", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
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

new Swiper(".mySwiper4", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
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
