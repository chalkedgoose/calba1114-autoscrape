export { DataCrawler } from './DataCrawler';

import { DataCrawler as DCrawler, DQueryBuilder } from './DQueryBuilder';

// (async function () {
//     const dCrawler = new DCrawler();
//     const rawMarkup = await dCrawler.fetchPageText("https://alligator.io/js/filter-array-method/");
//     const objs = dCrawler.unlinkAllProperties(rawMarkup);
//     objs
//         .filter(e => e.textContent.includes("Filter"))
// })();

const res = new DQueryBuilder("https://alligator.io/js/filter-array-method/")
    .containsContent('Filter')
    .containsTagName('h2')
    .containsTagAttributes(['class', 'article-content'])
    .build()

// console.log(res.elements);