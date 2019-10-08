### Purpose
The reason @alba/autoscrape was created was an effort to facilitate the process 
of scraping and analyzing any HTML or XHTML page. You can use powerful Array methods like reduce, 
map, filter in order to sort and search through a list of objects containing HTML data in key pair values.

### Future Features 
The Implementation of Filtering through Parent, Sibling and Child elements 
will soon be implemented in the next release.

### Example Code

```js 
const autoscrape = require("@calba1114/autoscrape");
const DataCrawler = autoscrape.DataCrawler;

/**
 *  const { DataCrawler } = require("@calba1114/autoscrape");
*/

(async () => {
    const GetAlligator = await DataCrawler("https://alligator.io/js/filter-array-method/");
    const Objects = await GetAlligator.gatherHTML();
    Objects
        .filter(e => e.textContent.includes('Filter'))
        .filter(e => e.tagName === "DIV")
        .filter(e => e.attributes.get('class') === 'article-content')
        .forEach(e => console.log(e));
})();
```

### New Trans Function (Utilizes Query String)

```js 
const autoscrape = require("@calba1114/autoscrape");
const DataCrawler = autoscrape.DataCrawler;

(async () => {
    const GetAlligator = await DataCrawler("https://alligator.io/js/filter-array-method/");
    const Objects = await GetAlligator.trans('div .article-content');
    Objects
        .filter(e => e.textContent.includes('Filter'))
        .forEach(e => console.log(e));
})();
```

