const { DataCrawler } = require('./index');

 
(async () => {
    const GetAlligator = await DataCrawler("https://alligator.io/js/filter-array-method/");
    const Objects = await GetAlligator.gatherHTML();
    Objects
        .filter((e: { textContent: { includes: (arg0: string) => void; }; }) => e.textContent.includes('Filter'))
        .filter((e: { tagName: string; }) => e.tagName === "DIV")
        .filter((e: { attributes: { get: (arg0: string) => string; }; }) => e.attributes.get('class') === 'article-content')
        .forEach((e: any) => console.log(e));
})();