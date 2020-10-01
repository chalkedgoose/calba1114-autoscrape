import fetch from 'node-fetch'
import { JSDOM } from 'jsdom';

type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never })

type DCrawlerCommonTags = LiteralUnion<"h1" | "h2" | "h3" |
    "h4" | "h5" | "h6" | "p" | "small" | "strong" | "span" | "div">

type DCrawlerAttributes = LiteralUnion<"class" | "href" | "src">


/**
 * Private Utilities Class
 */
export class DataCrawler {
    constructor() { }
    public async fetchPageText(url: string): Promise<string> {
        return await (await fetch(url)).text();
    }
    public deconstructAttributes(attributes: any) {
        return new Map(Array.prototype.slice
            .call(attributes).map(attr => [attr.name, attr.value]))
    }
    public elementUnlink({ tagName, textContent, attributes }: any) {
        return ({
            tagName,
            textContent,
            attributes: this.deconstructAttributes(attributes)
        })
    }
    public unlinkAllProperties(text: string) {
        return Array.from(new JSDOM(text).window.document.querySelectorAll('*'))
            .map(this.elementUnlink)
    }
    public unlinkQuery(text: string, queryString: string) {
        Array
            .from(new JSDOM(text).window.document.querySelectorAll(queryString)).map(this.elementUnlink)
    }
}

type AttributePair = [attribute: DCrawlerAttributes, value: any]

/**
 * Build Queries for fetching html elements
 */
export class DQueryBuilder {
    private httpTarget: string;
    private tagCollection: Array<string> = [];
    private attributeCollection: Array<AttributePair> = [];
    private contentCollection: Array<string> = [];
    constructor(httpTarget: string) {
        this.httpTarget = httpTarget;
    }
    public containsTagName(tag: DCrawlerCommonTags) {
        this.tagCollection.push(tag)
        return this;
    }
    public containsTagAttributes(input: AttributePair) {
        this.attributeCollection.push(input);
        return this;
    }
    public containsContent(content: string) {
        this.contentCollection.push(content)
        return this;
    }
    public build() {
        return new DqueryResult(this.httpTarget, "");
    }
}

type ResElement = {
    readonly ontagName: any;
    readonly textContent: any;
    readonly attributes: Map<any, any>;
}[]

export class DqueryResult {
    private queryString: string;
    private httpTarget: string;
    public elements: ResElement;
    constructor(queryString: string, httpTarget: string) {
        this.queryString = queryString;
        this.httpTarget = httpTarget;
        this.elements = []
    }
}



// filter(predicate: (value: never, index: number, array: never[]) => value is never, thisArg?: any): never[]