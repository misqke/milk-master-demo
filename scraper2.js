require("dotenv").config();
const fs = require("fs");
const puppeteer = require("puppeteer");
const url = "https://orders.deanfoods.com/";

const scraper2 = async (milkList, login, password) => {
  // start browser and open page
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "-disable-setuid-sandbox"],
    defaultViewport: {
      width: 360,
      height: 600,
    },
  });
  const page = await browser.newPage();

  try {
    // send page to log in page
    await page.goto(url);

    // log in
    await page.type("#ProfileID", login);
    await page.type("#AppPwd", password);
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

    // fill out inputs
    await page.waitForSelector(
      `tbody > tr:nth-child(1) > td:nth-child(3) > input`,
      { visible: true }
    );

    for (let i = 0; i < milkList.length; i++) {
      await page.type(
        `tbody > tr:nth-child(${i + 1}) > td:nth-child(3) > input`,
        `${milkList[i]}`
      );
      await page.keyboard.press("Tab");
    }

    // lock all and submit for review
    await page.click("#action-review");

    // await review page
    await page.waitForSelector("#btn-submit-order-details", { visible: true });

    // SUBMIT ORDER - PRODUCTION ONLY

    await page.hover("#btn-submit-order-details");
    await page.waitForTimeout(500);
    // screenshot confirmation and encode in base64
    const image = await page.screenshot({ type: "png" });
    const imageString = image.toString("base64");

    // close browser
    await browser.close();

    // return base64 image
    return imageString;
    // catch
  } catch (error) {
    console.log(error);

    // close browser
    await browser.close();

    return "error";
  }
};

module.exports = scraper2;
