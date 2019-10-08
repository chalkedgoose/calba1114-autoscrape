const DataCrawler = require('./DataCrawler');


(async () => {
    const GetAlligator = await DataCrawler("https://alligator.io/js/filter-array-method/");
    const Objects = await GetAlligator.trans('div .article-content');
    Objects
        .filter(e => e.textContent.includes('Filter'))
        .forEach(e => console.log(e));
})();

module.exports.DataCrawler =  DataCrawler;
