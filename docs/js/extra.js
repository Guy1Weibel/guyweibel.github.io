document.addEventListener('DOMContentLoaded', function() {
  // --- Your existing AOS Initialization ---
  console.log("Initializing AOS..."); // For debugging
  AOS.init({
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 600, // values from 0 to 3000, with step 50ms (orig: 400)
    easing: 'ease-in-out', // default easing for AOS animations (orig: ease)
    once: true, // whether animation should happen only once - while scrolling down (orig: false)
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  });
  console.log("AOS Initialized."); // For debugging

  // --- Page-Specific Body Classes & Page-Specific Elements ---
  console.log("Checking for page-specific conditions...");

  // Check if we're on the "About Me" page by looking for its unique H1 ID
  if (document.getElementById('about-me')) {
    document.body.classList.add('body-is-about-me-page');
    console.log("Added class 'body-is-about-me-page' to body.");

    // --- ADD LEANING SURFBOARD ELEMENT ONLY TO THE "ABOUT ME" PAGE ---
    console.log("On About Me page, attempting to add surfboard element...");
    const surfboardElement = document.createElement('div');
    surfboardElement.id = 'leaning-surfboard';
    surfboardElement.setAttribute('data-aos', 'fade-left');
    surfboardElement.setAttribute('data-aos-delay', '1000');
    surfboardElement.setAttribute('data-aos-duration', '800');
    surfboardElement.setAttribute('data-aos-anchor-placement', 'top-bottom');
    // surfboardElement.title = "Catch a wave!"; // Optional tooltip

    document.body.appendChild(surfboardElement);
    console.log("Surfboard element should be added to About Me page.");

    // --- SURFBOARD CLICK INTERACTION (SHINE EFFECT) ---
    // This listener is now also only added if the surfboard exists (i.e., on About Me page)
    const clickableSurfboard = document.getElementById('leaning-surfboard');
    if (clickableSurfboard) {
      clickableSurfboard.addEventListener('click', function() {
        console.log("Surfboard clicked! Applying shine.");
        if (!this.classList.contains('shine-effect')) {
          this.classList.add('shine-effect');
          setTimeout(() => {
            this.classList.remove('shine-effect');
            console.log("Shine effect removed.");
          }, 1500); // Your desired shine duration (e.g., 1.5 seconds)
        }
      });
    } else {
      console.error("Could not find #leaning-surfboard element for click listener (this shouldn't happen if creation succeeded).");
    }
    // --- END OF SURFBOARD LOGIC ---

  } else {
    // This block executes if it's NOT the "About Me" page
    console.log("Not on About Me page, surfboard not added, body class 'body-is-about-me-page' not added.");
  }

  // Example: Add a class for the Home page if its H1 has id="welcome"
  // This is separate from the About Me logic
  /*
  if (document.getElementById('welcome')) {
    document.body.classList.add('body-is-home-page');
    console.log("Added class 'body-is-home-page' to body.");
  }
  */
  console.log("Page-specific condition checks complete.");
}); // End of DOMContentLoaded listener

// Optional: You might need to refresh AOS if content loads dynamically later
// window.addEventListener('load', AOS.refresh);