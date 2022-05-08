require("dotenv").config();
const fs = require("fs");
const puppeteer = require("puppeteer");
const url = "https://orders.deanfoods.com/";

const orderScraper = async (milkList) => {
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

    // screenshot confirmation and encode in base64
    await page.waitForTimeout(2000);
    const image = await page.screenshot({ type: "png" });
    const imageString = await image.toString("base64");

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

module.exports = orderScraper;
