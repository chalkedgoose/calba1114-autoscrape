```js 
const { DataCrawler } = require("@calba1114/autoscrape");

(async () => {
    const crawler = DataCrawler();
    const rawHTML = await crawler.fetchPageText("https://alligator.io/js/filter-array-method/");
    const Objects = crawler.unlinkAll(rawHTML);
    Objects
        .filter(e => e.textContent.includes('Filter'))
        .filter(e => e.tagName === "DIV")
        .filter(e => e.attributes.get('class') === 'article-content')
        .forEach(e => console.log(e));
})();