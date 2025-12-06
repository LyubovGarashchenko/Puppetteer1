const { timeout } = require("puppeteer");
let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 60000);

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1", { timeout: 5000 });
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub · Change is constant. GitHub keeps you ahead. · GitHub"
    );
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 4000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    await page.setDefaultTimeout(5000);
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  },);
});

describe("Second task three tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 60000);

  test("Check title Blog", async () => {
      await page.goto("https://github.blog/");
      const title = await page.title();
    expect(title).toContain("Home - The GitHub Blog");
  }, 
  10000);

  test("Check title Trending", async () => {
    await page.goto("https://github.com/trending");
    const title = await page.title();
    expect(title).toContain("Trending repositories on GitHub today · GitHub");
  }, 10000);

  test("Check title AI", async () => {
    await page.goto("https://github.com/resources/articles?topic=ai");
    const title = await page.title();
    expect(title).toContain(
      "GitHub Articles • Technical Guides, Developer Insights & Best Practices · GitHub"
    );
  }, 10000);
})
