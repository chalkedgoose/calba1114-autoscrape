import fetch from "node-fetch";
import { JSDOM } from "jsdom";

type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never });

type DCrawlerCommonTags = LiteralUnion<
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "small"
  | "strong"
  | "span"
  | "div"
>;

type DCrawlerAttributes = LiteralUnion<"class" | "href" | "src">;

type DQueryResultElement = {
  readonly ontagName: any;
  readonly textContent: any;
  readonly attributes: Map<any, any>;
};

type AttributePair = [attribute: DCrawlerAttributes, value: any];

/**
 * Build Queries for fetching html elements
 */
export class DQueryBuilder {
  private httpTarget: string;
  private tagCollection: Array<string> = [];
  private attributeCollection: Array<AttributePair> = [];
  private contentCollection: Array<string> = [];
  private isLocalHTMl: boolean = false;
  constructor(httpTarget: string) {
    this.httpTarget = httpTarget;
  }
  /**
   * USE THIS IF YOU WANT TO SET httpTarget IN THE
   * CONSTRUCTOR TO A LOCAL HTML STRING. If you don't know
   * what this does then you should not be using it.
   */
  public setLocalHTML() {
    this.isLocalHTMl = true;
    return this;
  }
  public containsTagName(tag: DCrawlerCommonTags) {
    this.tagCollection.push(tag);
    return this;
  }
  public containsTagAttributes(input: AttributePair) {
    this.attributeCollection.push(input);
    return this;
  }
  public containsContent(content: string) {
    this.contentCollection.push(content);
    return this;
  }
  public build() {
    return new DqueryResult(this.httpTarget, "", this.isLocalHTMl);
  }
}

export class DqueryResult {
  private queryString: string;
  private httpTarget: string;
  public elements: Array<DQueryResultElement>;
  private isLocalHTMl: boolean = false;

  constructor(queryString: string, httpTarget: string, isLocalHTMl: boolean) {
    this.queryString = queryString;
    this.httpTarget = httpTarget;
    this.elements = [];
    // used to skip networking and just use httpTarget as HTML Block
    this.isLocalHTMl = isLocalHTMl;
  }
}
