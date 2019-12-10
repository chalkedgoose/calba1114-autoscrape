const { DataCrawler } = require('./index');

 
(async () => {
    const GetAlligator = await DataCrawler("https://alligator.io/js/filter-array-method/");
    const Objects = await GetAlligator.gatherHTML();
    Objects
        .filter((e: any) => e.textContent.includes('Filter'))
        .filter((e: any) => e.tagName === "DIV")
        .filter((e: any) => e.attributes.get('class') === 'article-content')
        .forEach((e: any) => console.log(e));
})();