const puppeteer = require('puppeteer');
const {screenshot} = require('./config/default');
(async () => {
  const browser = await puppeteer.launch({
    // const browser = await puppeteer.launch({headless: false}); // default is true
    executablePath: './chromium/chrome.exe',
    timeout:0
  });
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  await page.screenshot({
      path: `${screenshot}/${Date.now()}.png`
    });

  await browser.close();
})(); 