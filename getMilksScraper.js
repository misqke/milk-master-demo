require("dotenv").config();
const puppeteer = require("puppeteer");
const url = "https://orders.deanfoods.com/";

const getMilks = async () => {
  // start browser and open page
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "-disable-setuid-sandbox"],
    defaultViewport: {
      width: 360,
      height: 600,
    },
    // headless: false,
    // slowMo: 30,
  });
  const page = await browser.newPage();

  try {
    // send page to log in page
    await page.goto(url);

    // log in
    await page.type("#ProfileID", process.env.DEANS_LOGIN);
    await page.type("#AppPwd", process.env.DEANS_PASSWORD);
    await page.keyboard.press("Enter");

    // click order
    await page.waitForNavigation();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    // click date of next available delivery
    await page.waitForSelector(".delivery");
    await page.click(".delivery");

    await page.waitForTimeout(1000);
    const milks = await page.evaluate(() => {
      const milkList = [];
      const tableRows = document.querySelectorAll("tbody > tr[data-uid]");
      for (let i = 0; i < tableRows.length; i++) {
        const name = tableRows[i].querySelector("td:nth-child(7)").innerText;
        const crateMultiplier =
          tableRows[i].querySelector("td:nth-child(13)").innerText;
        milkList.push({
          name,
          crateMultiplier,
        });
      }
      return milkList;
    });
    await browser.close();
    return milks;
  } catch (error) {
    console.log(error);
    // await browser.close();
  }
};

module.exports = getMilks;
