document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const xDistanceElement = document.getElementById('x-distance');
    const yDistanceElement = document.getElementById('y-distance');
    const totalDistanceElement = document.getElementById('total-distance');
    const resetButton = document.getElementById('reset-button');
    const loadingOverlay = document.getElementById('loading-overlay');
    const spacer = document.querySelector('.spacer');
    
    // Make sure counters start at 0
    xDistanceElement.textContent = "0 px";
    yDistanceElement.textContent = "0 px";
    totalDistanceElement.textContent = "0 px";

    // Initialize tracking variables
    let totalXDistance = 0;
    let totalYDistance = 0;
    let lastScrollX = 0;
    let lastScrollY = 0;
    let isInitialScrollComplete = false;

    // Ensure we don't start tracking until fully loaded
    window.addEventListener('scroll', handleScroll);
    
    // Suppress any scrolling while we set up
    document.body.style.overflow = 'hidden';
    
    // Initialize tracking and positioning
    initializeTracker();
    
    function initializeTracker() {
        // First set up the spacer - adjust size to show grid lines properly
        spacer.style.width = '10000px';
        spacer.style.height = '10000px';
        
        // We want to target a specific grid intersection - 5000px is a clean center point
        const targetX = 5000;
        const targetY = 5000;
        
        // Position spacer to show the grid center
        spacer.style.marginLeft = '0px';
        spacer.style.marginTop = '0px';
        
        // First wait for the DOM to fully render
        setTimeout(() => {
            // Get viewport dimensions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Calculate the scroll position needed to center the target point
            // Account for the header and other elements (add 200px to Y)
            const scrollToX = targetX - (viewportWidth / 2);
            const scrollToY = targetY - (viewportHeight / 2) + 200;
            
            // Scroll to the target position
            window.scrollTo(scrollToX, scrollToY);
            
            // Wait for the scroll to complete
            setTimeout(() => {
                // Record initial position
                lastScrollX = window.scrollX || window.pageXOffset || 0;
                lastScrollY = window.scrollY || window.pageYOffset || 0;
                
                // Enable scroll tracking
                isInitialScrollComplete = true;
                
                // Re-enable page scrolling
                document.body.style.overflow = 'auto';
                
                // Remove the loading overlay
                loadingOverlay.classList.add('hidden');
                
                // Remove overlay from DOM after transition
                setTimeout(() => {
                    if (loadingOverlay.parentNode) {
                        loadingOverlay.parentNode.removeChild(loadingOverlay);
                    }
                }, 400);
            }, 200);
        }, 100);
    }
    
    // Scroll event handler
    function handleScroll() {
        // Skip tracking during initial positioning
        if (!isInitialScrollComplete) return;
        
        // Get current position
        const currentScrollX = window.scrollX || window.pageXOffset || 0;
        const currentScrollY = window.scrollY || window.pageYOffset || 0;
        
        // Calculate distance scrolled since last event
        const deltaX = Math.abs(currentScrollX - lastScrollX);
        const deltaY = Math.abs(currentScrollY - lastScrollY);
        
        // Add to total distance
        totalXDistance += deltaX;
        totalYDistance += deltaY;
        
        // Update reference positions
        lastScrollX = currentScrollX;
        lastScrollY = currentScrollY;
        
        // Update display
        updateDistanceDisplay();
        
        // Check if we need to extend the scroll area
        extendScrollAreaIfNeeded();
    }

    // Update the display elements
    function updateDistanceDisplay() {
        xDistanceElement.textContent = `${Math.round(totalXDistance)} px`;
        yDistanceElement.textContent = `${Math.round(totalYDistance)} px`;
        totalDistanceElement.textContent = `${Math.round(totalXDistance + totalYDistance)} px`;
    }
    
    // Reset counter function
    function resetScrollDistance() {
        totalXDistance = 0;
        totalYDistance = 0;
        updateDistanceDisplay();
    }
    
    // Add reset button event listener
    resetButton.addEventListener('click', resetScrollDistance);
    
    // Function to extend the scrollable area as needed
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
        
        // Check each edge
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
    
    // Add hover effect for visual feedback
    spacer.addEventListener('mousemove', (e) => {
        // Calculate position relative to spacer
        const x = e.clientX - spacer.getBoundingClientRect().left;
        const y = e.clientY - spacer.getBoundingClientRect().top;
        
        // Update ONLY the background, not the pseudo-elements with the grid pattern
        spacer.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2), transparent 500px), linear-gradient(135deg, #f6d365 0%, #fda085 100%)`;
    });
}); 