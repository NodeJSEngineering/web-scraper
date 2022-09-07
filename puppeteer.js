const puppeteer = require('puppeteer')

async function scrape() {
    const browser = await puppeteer.launch({})
    const page = await browser.newPage()
    await page.goto('https://www.thesaurus.com/browse/smart')
    // var element = await page.waitForSelector("#meanings > div.css-ixatld.e15rdun50 > ul > li:nth-child(1) > a")
    // var text = await page.evaluate(element => element.textContent, element)
    // console.log(text)
    for(i = 1; i < 6; i++){
        var element = await page.waitForSelector("#meanings > div.css-ixatld.e15rdun50 > ul > li:nth-child(" + i + ") > a")
        var text = await page.evaluate(element => element.textContent, element)
        console.log(text)
       }
    browser.close()
}

// scrape()

async function getVisual() {
	try {
		const URL = 'https://www.reddit.com/r/programming/'
		const browser = await puppeteer.launch()

		const page = await browser.newPage()
		await page.goto(URL, {waitUntil: 'networkidle2'})

		await page.screenshot({ path: 'screenshot.png' })
		// await page.pdf({ path: 'page.pdf' })

		await browser.close()
	} catch (error) {
		console.error(error)
	}
}

// getVisual()

// let browser;
// (async () => {
//   const searchQuery = "stack overflow";

//   browser = await puppeteer.launch();
//   const [page] = await browser.pages();
//   await page.goto("https://www.google.com/", {waitUntil: "domcontentloaded"});
//   await page.waitForSelector('input[aria-label="Search"]', {visible: true});
//   await page.type('input[aria-label="Search"]', searchQuery);
//   await Promise.all([
//     page.waitForNavigation(),
//     page.keyboard.press("Enter"),
//   ]);
//   await page.waitForSelector(".LC20lb", {visible: true});
//   const searchResults = await page.$$eval(".LC20lb", els => 
//     els.map(e => ({title: e.innerText, link: e.parentNode.href}))
//   );
//   console.log(searchResults);
// })()
//   .catch(err => console.error(err))
//   .finally(() => browser?.close())
// ;

async function searchScraper2() {
    let browser;
    let status;
    let statusval;

    // (async () => {
      const searchQuery = "angular";
    
      browser = await puppeteer.launch({headless: false});
      const [page] = await browser.pages();
      status = await page.goto("https://stackoverflow.com/", {waitUntil: "domcontentloaded"});
      await page.waitForSelector('#search > div > input', {visible: true});
      await page.type('#search > div > input', searchQuery);
    //   await Promise.all([
      await  page.waitForNavigation(),
        page.keyboard.press("Enter"),
    //   ]);
      statusval = status.status();
      await page.waitForSelector("#mainbar", {visible: true});
      const searchResults = await page.$$eval("#question-summary-73617947", els => 
        // els.map(e =>e)
      console.log(els)
      );
      console.log(searchResults);
      console.log(statusval);

      browser?.close()
    // })()
    //   .catch(err => console.error(err))
    //   .finally(() => browser?.close())
    ;
}
// searchScraper2()

async function searchScraper() {
let browser;
// (async () => {
  const searchQuery = "new york";

  browser = await puppeteer.launch({headless: false});
  const [page] = await browser.pages();
  await page.goto("https://www.google.com/travel/flights", {waitUntil: "domcontentloaded"});
  await page.waitForSelector('input[aria-labelledby="i21"]', {visible: true});
  await page.type('input[aria-labelledby="i21"]', searchQuery);
  await Promise.all([
    page.waitForNavigation(),
    page.keyboard.press("Enter"),
  ]);
  await page.waitForSelector(".W6bZuc", {visible: true});
  const searchResults = await page.$$eval(".W6bZuc", els => 
    els.map(e => ({title: e.innerText}))
  );
  console.log(searchResults);
  browser?.close()
// })()
//   .catch(err => console.error(err))
//   .finally(() => browser?.close())
;
}
// searchScraper()

function run (pagesToScrape) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pagesToScrape) {
                pagesToScrape = 1;
            }
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            await page.goto("https://news.ycombinator.com/");
            let currentPage = 1;
            let urls = [];
            while (currentPage <= pagesToScrape) {
                let newUrls = await page.evaluate(() => {
                    let results = [];
                    let items = document.querySelectorAll('a.storylink');
                    items.forEach((item) => {
                        results.push({
                            url:  item.getAttribute('href'),
                            text: item.innerText,
                        });
                    });
                    return results;
                });
                urls = urls.concat(newUrls);
                if (currentPage < pagesToScrape) {
                    await Promise.all([
                        await page.click('a.morelink'),
                        // await page.waitForSelector('a.storylink')
                    ])
                }
                currentPage++;
            }
            console.log(urls, 'urls'); 
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run(2).then(console.log).catch(console.error);

// node puppeteer.js
