document.addEventListener('DOMContentLoaded', function() {
  console.log("Initializing AOS..."); // Add this line for debugging
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
  console.log("AOS Initialized."); // Add this line for debugging
});

// Optional: You might need to refresh AOS if content loads dynamically later
// For example, if you were using infinite scroll or something similar
// window.addEventListener('load', AOS.refresh);
