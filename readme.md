# WellyFringe 2026

A private scraping and scheduling toolset for the Wellington Fringe Festival 2026.

## Project Origins: "Pre-Vibe Coding"
This project was born out of a personal need many years ago—long before "vibe coding" was a thing. Back then, planning for the Fringe meant manually navigating slow ticket sites and juggling calendar invites. This tool was built to automate that process, becoming a yearly tradition to scrape the latest shows and visualize them in a custom, high-performance interface.

It’s a passion project from the "classic" era of coding, repurposed and polished for 2026.

## Features
- **Discovery**: Automatically scans the Fringe ticket site for all upcoming events.
- **Priority**: Support for a `f2026.csv` list of favorite shows to highlight.
- **Interactive Calendar**: A standalone HTML file (`fringe_calendar.html`) that provides:
    - Monthly views for Feb/March.
    - Quick-hover show titles.
    - Interactive Timeline with zoom and drag support.
    - Direct links to ticket pages.

## Project Architecture
- `index.js`: The Puppeteer-based scraper. Navigates, discovers, and extracts event metadata.
- `generate_calendar.js`: The data processor. Takes scraped JSON and builds the interactive HTML/JS viewer.
- `fringe_calendar.html`: The final presentation layer (standalone).
- `fringe_style.css`: Modern, responsive styling for the calendar.

## Quick Start
1.  **Install Dependencies**: `npm install puppeteer`
2.  **Scrape Data**: Run `node index.js`. This generates `fringe_all_events.json`.
3.  **Generate Viewer**: Run `node generate_calendar.js`. This updates `fringe_data.js` and `fringe_calendar.html`.
4.  **View Results**: Open `fringe_calendar.html` in your browser.

---
*Disclaimer: This tool is for private use. Always support the artists by purchasing tickets directly through [tickets.fringe.co.nz](https://tickets.fringe.co.nz).*
