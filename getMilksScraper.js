require("dotenv").config();
const puppeteer = require("puppeteer");
const url = "https://orders.deanfoods.com/";

const getMilks = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "-disable-setuid-sandbox"],
    defaultViewport: {
      width: 360,
      height: 600,
    },
  });
  const page = await browser.newPage();
  try {
    await page.goto(url);

    await page.type("#ProfileID", process.env.DEANS_LOGIN);
    await page.type("#AppPwd", process.env.DEANS_PASSWORD);
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

    await page.waitForTimeout(1000);
    const milks = await page.evaluate(() => {
      const milkList = [];

      const tableRows = document.querySelectorAll("tbody > tr");
      for (let i = 0; i < tableRows.length; i++) {
        const name = tableRows[i].querySelector("td:nth-child(9)").innerText;
        const crateMultiplier =
          tableRows[i].querySelector("td:nth-child(11)").innerText;
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
    await browser.close();
  }
};

module.exports = getMilks;
