const youtubeVideos1 = [
  {
    url: "https://www.youtube.com/watch?v=SXpAOKY6g48",
    title: "Tile 1",
  },
  {
    url: "https://www.youtube.com/watch?v=cCgn3H4UJr0",
    title: "Tile 2",
  },
  {
    url: "https://www.youtube.com/watch?v=IkudDf-qRrY",
    title: "Tile 3",
  },
  { url: "https://www.youtube.com/watch?v=xnWBZQ7wkb4", title: "Tile 4" },
  {
    url: "https://www.youtube.com/watch?v=iy5SqM0bnqI",
    title: "Tile 5",
  },
  {
    url: "https://www.youtube.com/watch?v=SXpAOKY6g48",
    title: "Tile 1",
  },
  {
    url: "https://www.youtube.com/watch?v=cCgn3H4UJr0",
    title: "Tile 2",
  },
  {
    url: "https://www.youtube.com/watch?v=IkudDf-qRrY",
    title: "Tile 3",
  },
  { url: "https://www.youtube.com/watch?v=xnWBZQ7wkb4", title: "Tile 4" },
  {
    url: "https://www.youtube.com/watch?v=iy5SqM0bnqI",
    title: "Tile 5",
  },
];

function getYouTubeID(url) {
  let match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|embed\/|v\/))([^&?\/]+)/
  );
  return match ? match[1] : null;
}

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
