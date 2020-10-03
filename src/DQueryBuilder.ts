import type { RequestInfo } from "node-fetch";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

/**
 * Allows autocompletion on a string based Unions
 * while still allowing unknown or wildcard strings.
 * Can be adapted to work on number types.
 */
type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never });

/** Common Tag Names */
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

/** Common Tag Attributes  */
type DCrawlerAttributes = LiteralUnion<"class" | "href" | "src">;

/**
 * Need to find a way to extend the JSDOM types
 * for this to be more effective. This is returned
 * as a data for elements picked up by DQuery.
 */
type DQueryResultElement = {
  readonly ontagName: any;
  readonly textContent: any;
  readonly attributes: Map<any, any>;
};

/**
 * Tuple type for pairing tag attributes to certain values
 */
type AttributePair = [attribute: DCrawlerAttributes, value: any];

/**
 * Build Queries for fetching html elements
 */
export class DQueryBuilder {
  private httpTarget: string;
  private tagCollection: Array<string> = [];
  private attributeCollection: Array<AttributePair> = [];
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

  private processAttributes() {
    const formatAttribute = (node: AttributePair) => {
      return `@${node[0]}='${node[1]}'`;
    };

    if (this.attributeCollection.length <= 0) {
      return null;
    }
    if (this.attributeCollection.length === 1) {
      return `[${formatAttribute(this.attributeCollection[0])}]`;
    }
    return `[${formatAttribute(
      this.attributeCollection[0]
    )} ${this.attributeCollection
      .slice(1)
      .map((node) => `and ${formatAttribute(node)}`)}]`;
  }

  private processTags() {
    const attributes = this.processAttributes();
    /**
     *  tag name attribute one and additional attribute
     * //input[@id='Passwd' and @placeholder='Password']
     */
    return `${this.tagCollection.join(" ")}${attributes}`;
  }

  public build() {
    // TODO(1): Look into using the  XPATH query instead of a normal css selector
    const generatedQueryString = this.processTags();
    console.log(`Generated Query String "${generatedQueryString}"`);
    // TODO(2) Remove Test Value before publishing package.
    return new DqueryResult(
      generatedQueryString,
      this.httpTarget,
      this.isLocalHTMl
    );
  }
}

export class DqueryResult {
  private httpTarget: RequestInfo;
  private elements: NodeListOf<Element> | null;

  private pullHttpTarget(): string {
    try {
      let mutableResult = "";
      fetch(this.httpTarget)
        .then((res) => res.text())
        .then((text) => (mutableResult = text));
      if (mutableResult.length <= 0) {
        throw new Error("There is no result or HTML to parse.");
      }
      return mutableResult;
    } catch (error) {
      throw new Error(`Fetching HTTP target failed: ${error}`);
    }
  }

  constructor(queryString: string, httpTarget: string, isLocalHTMl: boolean) {
    this.elements = null;
    this.httpTarget = httpTarget;
    /**
     *  used to skip networking and just use httpTarget as HTML Block
     */
    if (isLocalHTMl) {
      this.elements = new JSDOM(httpTarget).window.document.querySelectorAll(
        queryString
      );
      return;
    }
    /**
     * Fetch from Networking Request
     */
    const rawHTML = this.pullHttpTarget();
    this.elements = new JSDOM(rawHTML).window.document.querySelectorAll(
      queryString
    );
  }

  public getElements(): NodeListOf<Element> {
    if (this.elements === null) {
      throw new Error("Elements are null");
    } else {
      return this.elements;
    }
  }
}
