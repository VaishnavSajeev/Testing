const imageFolder = ""; // Folder path
let images = [];

async function fetchAndMergeImageGallery() {
  try {
    const imageGalleryResponse = await fetch("data2/imagegallery.json");
    const imageGalleryJson = await imageGalleryResponse.json();

    // Merge JSON data with existing image list
    images = [...images, ...imageGalleryJson.images];
    // console.log(images);

    const swiperWrapper = document.getElementById("swiperWrapper1");

    // Loop through images and create slides
    images.forEach((img) => {
      let slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.innerHTML = `<img src="${imageFolder + img.filename}" alt="${
        img.filename
      }">`;
      swiperWrapper.appendChild(slide);
    });

    // Initialize Swiper
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      grid: {
        rows: 2,
      },
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          grid: { rows: 2 },
        },
        1024: {
          slidesPerView: 3,
          grid: { rows: 2 },
        },
      },
    });

    // Generate image slides
  } catch (error) {
    console.error("Error fetching image gallery JSON data:", error);
  }
}

// Call the function to fetch and merge image gallery
fetchAndMergeImageGallery();

// Get the Swiper wrapper

// List of YouTube videos
