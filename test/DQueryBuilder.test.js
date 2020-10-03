const { DQueryBuilder } = require("../dist/index.js");
const fetch = require("node-fetch");

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

test("Pulls Data from HTML with DQueryBuilder", () => {
  const dQueryResult = new DQueryBuilder(htmlTestingPage)
    .setLocalHTML(true)
    .containsTagName("div")
    .containsTagAttributes(["class", "article-content"])
    .containsTagAttributes(["textContent", "Filter"])
    .build();

  expect(dQueryResult.getElements()).toBe(1);
});

/**
 * Dangerous Test: Relies on other site
 * only ran for dev use never use for sanity
 * checks.
 */
test("Pulls Data from HTML with DQueryBuilder", () => {
  let html = "";
  fetch("https://alligator.io/js/filter-array-method/")
    .then((res) => res.text())
    .then((txt) => (html = txt));

  const testing = new DQueryBuilder(html)
    .containsTagName("div")
    .containsTagAttributes(["class", "article-content"])
    .containsTagAttributes(["textContent", "Filter"])
    .build();

  expect(testing.elements).toBe(1);
});
