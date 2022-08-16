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

scrape()

async function getVisual() {
	try {
		const URL = 'https://www.reddit.com/r/programming/'
		const browser = await puppeteer.launch()

		const page = await browser.newPage()
		await page.goto(URL)

		await page.screenshot({ path: 'screenshot.png' })
		await page.pdf({ path: 'page.pdf' })

		await browser.close()
	} catch (error) {
		console.error(error)
	}
}

getVisual()

