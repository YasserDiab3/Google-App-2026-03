const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const title = await page.title();
    console.log('Page Title:', title);

    // Check if login form exists
    const loginForm = await page.$('form');
    if (loginForm) {
      console.log('✅ Login form found');
    } else {
      console.log('❌ Login form not found');
    }

    // Check for specific clinic UI elements if possible (might need login bypass)

  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    await browser.close();
  }
})();
