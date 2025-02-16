const slider1Data = [
  { imgSrc: "placeholder.png", name: "John Doe" },
  { imgSrc: "placeholder.png", name: "Jane Smith" },
  { imgSrc: "placeholder.png", name: "Mike Johnson" },
  { imgSrc: "placeholder.png", name: "Emily Davis" },
  { imgSrc: "placeholder.png", name: "Chris Wilson" },
  { imgSrc: "placeholder.png", name: "Sophia Brown" },
];

// List of objects for second slider
const slider2Data = [
  { imgSrc: "placeholder.png", name: "Daniel Lee" },
  { imgSrc: "placeholder.png", name: "Olivia Clark" },
  { imgSrc: "placeholder.png", name: "Liam Martinez" },
  { imgSrc: "placeholder.png", name: "Emma White" },
  { imgSrc: "placeholder.png", name: "James Anderson" },
  { imgSrc: "placeholder.png", name: "Ava Thomas" },
];

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
];

// List of YouTube videos for second slider
const youtubeVideos2 = [
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
