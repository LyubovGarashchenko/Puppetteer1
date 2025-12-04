const puppeteer = require("puppeteer");
let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  }, 5000);
  
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});

describe("Second task three tests", () => {
  afterEach(() => {
    page.close();
  });

  test("Check title Healthcare", async () => {
    await page.goto("https://github.com/solutions/industry/healthcare");
    const actual = await page.$eval("main a", (link) =>
      link.getAttribute("href")
    );
    expect(actual).toEqual("#hero-section-brand-heading");
  }, 4000);

  test("Check title Trending", async () => {
    await page.goto("https://github.com/trending");
    const title = await page.title();
    expect(title).toContain("Trending · GitHub");
  }, 2000);

  test("Check title AI", async () => {
    await page.goto("https://github.com/resources/articles?topic=ai");
    const title = await page.title();
    expect(title).toContain("GitHub Articles · GitHub");
  }, 4000);
});