const { DataCrawler } = require("../dist/index.js");

const htmlTestingPage = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Testing HTMl Markup</title>
  </head>
  <body>
    <div class="article-content">Filter is in this div</div>
  </body>
</html>
`;

test("Pulls Data Iteratively Properly", () => {
  const testCrawler = DataCrawler();
  const testObjects = testCrawler.unlinkAll(htmlTestingPage);

  const testResultCollection = testObjects
    .filter((e) => e.textContent.includes("Filter"))
    .filter((e) => e.tagName === "DIV")
    .filter((e) => e.attributes.get("class") === "article-content");

  expect(testResultCollection.length).toBe(1);
});

// test("Pulls Data With Query", () => {
//   const testCrawler = DataCrawler();
//   const testObjects = testCrawler.unlinkQuery(
//     htmlTestingPage,
//     "div .article-content"
//   );

//   const testResultCollection = testObjects.filter((e) =>
//     e.textContent.includes("Filter")
//   );

//   expect(testResultCollection.length).toBe(1);
// });
