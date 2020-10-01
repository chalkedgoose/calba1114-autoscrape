const { DQueryBuilder } = require("../dist/index.js");

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
    .containsContent("Filter")
    .build();

  expect(dQueryResult.elements).toBe(1);
});
