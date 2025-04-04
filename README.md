# Scroll Distance Tracker

A simple web application that tracks and displays the total scrolled distance in both the horizontal (X) and vertical (Y) directions in pixels. 100% build by ai.

![Scroll Distance Tracker](favicon-192.png)

## Features

- Real-time tracking of scroll distance
- Separate tracking for horizontal and vertical scrolling
- Display of total combined scroll distance
- Sticky information panel that remains visible while scrolling
- Unlimited scrolling in all directions (left, right, up, down)
- Reset button to zero the counters
- Visual grid pattern to help visualize distances
- Responsive design

## Live Demo

You can try the application live at: [https://goesta.github.io/scroll_distance/](https://goesta.github.io/scroll_distance/)

## How It Works

The web application uses JavaScript's scroll event listener to track changes in scroll position. It calculates the absolute difference in scroll position between each scroll event and adds this to running totals for both X and Y directions.

The application dynamically extends the scroll area as you approach any edge, creating an unlimited scrollable space in all directions.

## Usage

1. Open the application in any modern web browser
2. Scroll around in any direction (left, right, up, down)
3. Watch the distance counters update in real-time
4. Use the Reset button to zero the counters at any time

## Local Development

To run this project locally:

```bash
git clone https://github.com/goesta/scroll_distance.git
cd scroll_distance
# Simply open index.html in your browser
```

## Deployment

This project is set up to be deployed to GitHub Pages. To deploy your own version:

1. Fork this repository
2. Go to your repository's Settings > Pages
3. Under "Source", select "main" branch
4. Click Save
5. Your site will be published at https://yourusername.github.io/scroll_distance/

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

## Browser Compatibility

This application works in all modern browsers that support:
- ES6 JavaScript
- CSS position: fixed
- window.scrollX/Y or window.pageXOffset/YOffset

## Keywords

scroll tracker, distance measurement, pixel tracking, scroll distance, web utility, JavaScript tool, unlimited scrolling, scroll measurement 