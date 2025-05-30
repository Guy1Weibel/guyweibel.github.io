// Helper function to update the spotlight's radial gradient
// It's good practice to define helper functions outside the main event listener
// if they don't rely on variables scoped only within that listener,
// or pass everything they need as arguments.
function updateSpotlight(event, containerElement, spotlightElement) {
  const rect = containerElement.getBoundingClientRect();
  const x = event.clientX - rect.left; // x position within the element.
  const y = event.clientY - rect.top;  // y position within the element.

  const pageBackgroundColor = '#c4ccc6'; // The solid color of the Projects Overview page
  const radius = 150; // Radius of the area WHERE THE PATTERN IS ERASED (solid color appears)
  const fadeExtent = radius * 0.5; // How far the fade to transparent should extend

  // The gradient:
  // - Starts with the solid background color at the mouse center (erasing pattern)
  // - Fades to transparent, revealing the pattern again
  // Using the RGB values of #c4ccc6 (196, 204, 198) for the transparent part
  spotlightElement.style.background = `radial-gradient(circle ${radius}px at ${x}px ${y}px, 
                                          ${pageBackgroundColor} 0%, 
                                          ${pageBackgroundColor} ${radius - fadeExtent}px, /* Solid color out to here */
                                          rgba(196, 204, 198, 0) ${radius + fadeExtent}px)`; /* Fades to transparent version of page bg */
  // console.log(`Spotlight updated: x=${x}, y=${y}`); // Can be noisy, uncomment for debug if needed
}


document.addEventListener('DOMContentLoaded', function() {
// --- Your existing AOS Initialization ---
console.log("Initializing AOS..."); // For debugging
AOS.init({
  disable: false, 
  startEvent: 'DOMContentLoaded', 
  initClassName: 'aos-init', 
  animatedClassName: 'aos-animate', 
  useClassNames: false, 
  disableMutationObserver: false, 
  debounceDelay: 50, 
  throttleDelay: 99, 
  offset: 120, 
  delay: 0, 
  duration: 600, 
  easing: 'ease-in-out', 
  once: true, 
  mirror: false, 
  anchorPlacement: 'top-bottom', 
});
console.log("AOS Initialized."); // For debugging

// --- Page-Specific Body Classes & Page-Specific Elements ---
console.log("Checking for page-specific conditions...");

// Check if we're on the "About Me" page
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
  document.body.appendChild(surfboardElement);
  console.log("Surfboard element should be added to About Me page.");

  const clickableSurfboard = document.getElementById('leaning-surfboard');
  if (clickableSurfboard) {
    clickableSurfboard.addEventListener('click', function() {
      console.log("Surfboard clicked! Applying shine.");
      if (!this.classList.contains('shine-effect')) {
        this.classList.add('shine-effect');
        setTimeout(() => {
          this.classList.remove('shine-effect');
          console.log("Shine effect removed.");
        }, 1500); 
      }
    });
  } else {
    console.error("Could not find #leaning-surfboard for click listener.");
  }
} else {
  console.log("Not on About Me page, conditions for surfboard/body class not met.");
}

// --- Spotlight Effect for Projects Overview Page ---
const projectsOverviewContent = document.querySelector('.md-main__inner:has(h1#my-data-science-projects)');
console.log("projectsOverviewContent element for spotlight:", projectsOverviewContent);

if (projectsOverviewContent) {
  if (getComputedStyle(projectsOverviewContent).position === 'static') {
    projectsOverviewContent.style.position = 'relative';
  }

  const spotlightOverlay = document.createElement('div');
  spotlightOverlay.id = 'pattern-spotlight-overlay';
  spotlightOverlay.style.position = 'absolute';
  spotlightOverlay.style.top = '0';
  spotlightOverlay.style.left = '0';
  spotlightOverlay.style.width = '100%';
  spotlightOverlay.style.height = '100%';
  spotlightOverlay.style.pointerEvents = 'none'; 
  spotlightOverlay.style.zIndex = '-2'; 
  spotlightOverlay.style.background = 'transparent'; 
  projectsOverviewContent.appendChild(spotlightOverlay);
  console.log("Spotlight overlay div added for Projects Overview.");

  projectsOverviewContent.addEventListener('mouseenter', function(e) {
      updateSpotlight(e, projectsOverviewContent, spotlightOverlay);
  });
  projectsOverviewContent.addEventListener('mousemove', function(e) {
      updateSpotlight(e, projectsOverviewContent, spotlightOverlay);
  });
  projectsOverviewContent.addEventListener('mouseleave', function() {
      spotlightOverlay.style.background = 'transparent'; 
      console.log("Mouse left Projects Overview, spotlight reset.");
  });
} else {
  console.log("Spotlight target for Projects Overview NOT FOUND!"); // Changed to log instead of error for clarity
}

// --- End of Page-Specific Logic ---
console.log("Page-specific condition checks complete."); // This should be the last log inside DOMContentLoaded

}); // THIS IS THE CORRECT ENDING BRACE AND PARENTHESIS for document.addEventListener('DOMContentLoaded', function() { ... });

// Optional: You might need to refresh AOS if content loads dynamically later
// window.addEventListener('load', AOS.refresh);