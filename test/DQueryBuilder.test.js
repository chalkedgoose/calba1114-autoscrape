const { DQueryBuilder } = require("../dist/index.js");
const fetch = require("node-fetch");

const htmlTemplate = `
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
  const dQueryResult = new DQueryBuilder(htmlTemplate)
    .containsTagName("div")
    .containsTagAttributes(["class", "article-content"])
    .containsTagAttributes(["textContent", "Filter"])
    .build();
  expect(dQueryResult.getElements()).toBe(1);
});
