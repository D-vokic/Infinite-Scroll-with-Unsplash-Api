const imageContainer = document.getElementById("image-container");
const darkModeBtn = document.getElementById("drk-mode");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = "rUWg3LXo6sxRlHv7pk-ZdNv_tmo3Qj1Nk1daUmvQSJ4";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Adding animation to the dark mode button when it is clicked
document.getElementById("drk-mode").addEventListener("click", function () {
  const modeDark = document.getElementById("drk-mode");
  modeDark.style.animation = "pulse-animation 1s ease";

  // This will reset the animation upon completion
  modeDark.addEventListener("animationend", function () {
    modeDark.style.animation = ""; // Resetting the animation
  });
});

// Adding animation to the dark mode button when the page loads
addEventListener("load", function () {
  const modeDark = document.getElementById("drk-mode");
  modeDark.style.animation = "hero-animation 5s ease";
});

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // alert("Error fetching photos from Unsplash. Try again later.");
    throw new Error("Error fetching photos from Unsplash. Try again later.");
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// Dark Mode
function darkMode() {
  document.documentElement.classList.toggle("dark-mode");
}

// Event Listeners
darkModeBtn.addEventListener("click", darkMode);

// Back to top button
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Adding animation to the back to top button
    backToTopButton.style.animation = "backToTopAnimation 0.5s ease";
    // Cleaning up the animation after 1 second
    setTimeout(function () {
      backToTopButton.style.animation = "";
    }, 1000);
  });
});

// On Load
getPhotos();
