document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const xDistanceElement = document.getElementById('x-distance');
    const yDistanceElement = document.getElementById('y-distance');
    const totalDistanceElement = document.getElementById('total-distance');
    const resetButton = document.getElementById('reset-button');

    // Initialize scroll area size and position first
    const spacer = document.querySelector('.spacer');
    spacer.style.width = '10000px';
    spacer.style.height = '10000px';
    
    // Initial positioning to allow scrolling in all directions
    spacer.style.marginLeft = '5000px';
    spacer.style.marginTop = '5000px';
    
    // Scroll to the middle to allow movement in all directions
    // but don't track this initial positioning
    window.scrollTo(5000, 5000);

    // Now initialize variables to track scroll distance AFTER initial positioning
    let totalXDistance = 0;
    let totalYDistance = 0;
    let lastScrollX = window.scrollX || window.pageXOffset || 0;
    let lastScrollY = window.scrollY || window.pageYOffset || 0;

    // Function to update the display
    function updateDistanceDisplay() {
        xDistanceElement.textContent = `${Math.round(totalXDistance)} px`;
        yDistanceElement.textContent = `${Math.round(totalYDistance)} px`;
        totalDistanceElement.textContent = `${Math.round(totalXDistance + totalYDistance)} px`;
    }

    // Function to reset scroll distances
    function resetScrollDistance() {
        totalXDistance = 0;
        totalYDistance = 0;
        updateDistanceDisplay();
    }

    // Add reset button event listener
    resetButton.addEventListener('click', resetScrollDistance);

    // Function to extend scroll area in all directions if needed
    function extendScrollAreaIfNeeded() {
        // Get current dimensions and positions
        const currentWidth = parseInt(getComputedStyle(spacer).width);
        const currentHeight = parseInt(getComputedStyle(spacer).height);
        const currentLeft = parseInt(getComputedStyle(spacer).marginLeft) || 0;
        const currentTop = parseInt(getComputedStyle(spacer).marginTop) || 0;
        
        // How close to the edge before extending (in pixels)
        const threshold = 1000;
        
        // Current viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Current scroll position
        const scrollX = window.scrollX || window.pageXOffset || 0;
        const scrollY = window.scrollY || window.pageYOffset || 0;
        
        // Check if we're near any edge
        let needsUpdate = false;
        
        // Near right edge - extend width
        if (currentWidth - (scrollX + viewportWidth) < threshold) {
            spacer.style.width = (currentWidth + viewportWidth) + 'px';
            needsUpdate = true;
        }
        
        // Near bottom edge - extend height
        if (currentHeight - (scrollY + viewportHeight) < threshold) {
            spacer.style.height = (currentHeight + viewportHeight) + 'px';
            needsUpdate = true;
        }
        
        // Near left edge - extend to the left
        if (scrollX < threshold) {
            const additionalSpace = 1000;
            // First move the spacer to the right
            spacer.style.marginLeft = (currentLeft + additionalSpace) + 'px';
            // Then adjust scroll position to maintain visual position
            window.scrollBy(additionalSpace, 0);
            needsUpdate = true;
        }
        
        // Near top edge - extend upward
        if (scrollY < threshold) {
            const additionalSpace = 1000;
            // First move the spacer down
            spacer.style.marginTop = (currentTop + additionalSpace) + 'px';
            // Then adjust scroll position to maintain visual position
            window.scrollBy(0, additionalSpace);
            needsUpdate = true;
        }
        
        return needsUpdate;
    }

    // Listen for scroll events
    window.addEventListener('scroll', () => {
        // Get current scroll position
        const currentScrollX = window.scrollX || window.pageXOffset || 0;
        const currentScrollY = window.scrollY || window.pageYOffset || 0;

        // Calculate the delta (how much was scrolled since last event)
        const deltaX = Math.abs(currentScrollX - lastScrollX);
        const deltaY = Math.abs(currentScrollY - lastScrollY);

        // Add to total distance
        totalXDistance += deltaX;
        totalYDistance += deltaY;

        // Update last scroll position
        lastScrollX = currentScrollX;
        lastScrollY = currentScrollY;

        // Update the display
        updateDistanceDisplay();
        
        // Extend scroll area if approaching edges
        extendScrollAreaIfNeeded();
    });

    // Initialize the display
    updateDistanceDisplay();
    
    // Add hover effect to make scrolling more engaging
    spacer.addEventListener('mousemove', (e) => {
        // Calculate position relative to spacer
        const x = e.clientX - spacer.getBoundingClientRect().left;
        const y = e.clientY - spacer.getBoundingClientRect().top;
        
        // Update ONLY the background, not the pseudo-elements with the grid pattern
        spacer.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2), transparent 500px), linear-gradient(135deg, #f6d365 0%, #fda085 100%)`;
    });
}); 