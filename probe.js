/**
 * Probe Utility (probe.js)
 * 
 * A debug/testing utility for inspecting Fringe Festival event page structure.
 * This helps identify correct CSS selectors when the website layout changes.
 */

const puppeteer = require('puppeteer');

(async () => {
    // 1. CONFIGURATION
    const browser = await puppeteer.launch({ headless: true });
    const browserPage = await browser.newPage();
    const targetUrl = "https://tickets.fringe.co.nz/event/446:8271/"; // Dirty Old Songs example

    try {
        console.log(`Navigating to test page: ${targetUrl}`);
        await browserPage.goto(targetUrl, { waitUntil: 'domcontentloaded' });

        // 2. EXTRACTION TESTING
        const pageData = await browserPage.evaluate(() => {
            const title = document.querySelector('.primary-color')?.innerText || document.querySelector('h1')?.innerText;

            // Look for all list items in the main container
            const allListItems = Array.from(document.querySelectorAll('li'));
            const listTexts = allListItems.map(li => li.innerText.trim()).filter(t => t.length > 0 && t.length < 50);

            // Specifically look for the element containing "Comedy"
            // (Only for this specific test case "Bad Girls" which we know has "Comedy")
            const genreElement = Array.from(document.querySelectorAll('*'))
                .find(el => el.innerText && el.innerText.trim() === 'Comedy' && el.tagName !== 'SCRIPT');

            // NEW: Probe the 'small' tag in the title
            const titleSmall = document.querySelector('div.title small')?.innerText;

            let genreSelector = null;
            let genreParentClass = null;
            if (genreElement) {
                console.log(genreElement);
                genreSelector = genreElement.tagName.toLowerCase() + (genreElement.className ? '.' + genreElement.className.split(' ').join('.') : '');
                genreParentClass = genreElement.parentElement ? genreElement.parentElement.className : 'No parent';
            }

            return {
                title,
                listTexts: listTexts.slice(0, 20), // Just the first few
                genreFound: !!genreElement,
                genreSelector,
                genreParentClass,
                genreText: genreElement ? genreElement.innerText : 'Not Found',
                titleSmall: titleSmall // Return the value
            };
        });

        // 3. RESULTS OUTPUT
        console.log("\n--- [ PROBE RESULTS ] ---");
        console.log(`Title:       ${pageData.title}`);
        console.log(`Small Tag:   ${pageData.titleSmall}`);
        console.log(`Genre Found: ${pageData.genreFound}`);
        console.log(`Genre Selector: ${pageData.genreSelector}`);
        console.log(`Genre Parent Class: ${pageData.genreParentClass}`);
        console.log(`List Items Sample:`, pageData.listTexts);
        console.log("-------------------------\n");

    } catch (unexpectedError) {
        console.error(`Probe failed: ${unexpectedError.message}`);
    } finally {
        await browser.close();
        console.log("Probe complete. Browser closed.");
    }
})();
