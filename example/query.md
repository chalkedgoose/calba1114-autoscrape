```js 
const { DataCrawler } = require("@calba1114/autoscrape");

(async () => {
    const crawler = DataCrawler();
    const rawHTML = await crawler.fetchPageText("https://alligator.io/js/filter-array-method/");
    const Objects = crawler.unlinkQuery(rawHTML,'div .article-content');
    Objects
        .filter(e => e.textContent.includes('Filter'))
        .forEach(e => console.log(e));
})();
```