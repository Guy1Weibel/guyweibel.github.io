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

  // --- Page-Specific Body Classes ---
  console.log("Checking for page-specific body class conditions..."); 

  if (document.getElementById('about-me')) {
    document.body.classList.add('body-is-about-me-page');
    console.log("Added class 'body-is-about-me-page' to body."); 
  }
  /*
  if (document.getElementById('welcome')) {
    document.body.classList.add('body-is-home-page');
    console.log("Added class 'body-is-home-page' to body.");
  }
  */
  console.log("Page-specific body class check complete.");

  // --- ADD LEANING SURFBOARD ELEMENT TO THE PAGE ---
  console.log("Attempting to add surfboard element...");
  const surfboardElement = document.createElement('div');
  surfboardElement.id = 'leaning-surfboard'; 
  surfboardElement.setAttribute('data-aos', 'fade-left'); 
  surfboardElement.setAttribute('data-aos-delay', '1000'); // Increased delay a bit
  surfboardElement.setAttribute('data-aos-duration', '800'); // Slightly longer fade
  surfboardElement.setAttribute('data-aos-anchor-placement', 'top-bottom');
  // surfboardElement.title = "Catch a wave!"; // Optional tooltip

  document.body.appendChild(surfboardElement);
  console.log("Surfboard element should be added.");

  // --- SURFBOARD CLICK INTERACTION (SHINE EFFECT) ---
  const clickableSurfboard = document.getElementById('leaning-surfboard');
  if (clickableSurfboard) {
    clickableSurfboard.addEventListener('click', function() {
      console.log("Surfboard clicked! Applying shine.");
      // Ensure it doesn't rapidly re-add if already shining
      if (!this.classList.contains('shine-effect')) {
        this.classList.add('shine-effect');
        // Remove the shine effect after the animation duration so it can be re-triggered
        setTimeout(() => {
          this.classList.remove('shine-effect');
          console.log("Shine effect removed.");
        }, 700); // This duration should match your CSS animation-duration for .shine-effect
      }
    });
  } else {
    console.error("Could not find #leaning-surfboard element for click listener.");
  }

}); // End of DOMContentLoaded listener

// Optional: You might need to refresh AOS if content loads dynamically later
// window.addEventListener('load', AOS.refresh);