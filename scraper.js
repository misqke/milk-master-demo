require("dotenv").config();
const fs = require("fs");
const puppeteer = require("puppeteer");
const url = "https://orders.deanfoods.com/";

const scraper = async (milkList, login, password) => {
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

    // log in, click inventory, click new
    await page.type("#ProfileID", login);
    await page.type("#AppPwd", password);
    await page.keyboard.press("Enter");

    await page.waitForSelector(
      "#listView div div.col-3.col-md-2.col-lg-1 span a",
      { visible: true }
    );
    await page.click("#listView div div.col-3.col-md-2.col-lg-1 span a");

    await page.waitForSelector("#addNew", { visible: true });
    await page.click("#addNew");

    await page.waitForSelector(".k-widget.k-dropdown", { visible: true });
    await page.click(".k-widget.k-dropdown");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("Enter");
    await page.click("button[type='submit'");

    // fill out inventory form from milk list, submit for review
    await page.waitForSelector("tbody > tr > td > input", { visible: true });
    for (let i = 0; i < milkList.length; i++) {
      await page.type(
        `tr:nth-child(${i + 1}) > td:nth-child(1) > input`,
        `${milkList[i]}`
      );
      await page.click(` tr:nth-child(${i + 1}) > td:nth-child(2) > a > svg`);
    }
    await page.click("#action-review");

    // await review page
    await page.waitForSelector("div.col-5.align-right > a", { visible: true });

    // SUBMIT INVENTORY - PRODUCTION ONLY

    await page.hover("div.col-5.align-right > a");
    await page.waitForTimeout(200);
    // screenshot confirmation and encode in base64

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

module.exports = scraper;
