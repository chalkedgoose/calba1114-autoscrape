```js
const res = new DQueryBuilder("https://alligator.io/js/filter-array-method/")
  .containsContent("Filter")
  .containsTagName("h2")
  .containsTagAttributes(["class", "article-content"])
  .build();

console.log(res.elements);
```
