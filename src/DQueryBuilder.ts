import type {
  AttributePair,
  HTML,
  CommonAttributes,
  CommonTags,
} from "./DQueryBuilder.types";
import { JSDOM } from "jsdom";

/**
 * TODO(3)
 * var matches = document.querySelectorAll("iframe[data-src]");
 * const refs = [...document.querySelectorAll(`[data-name*="funnel-chart-percent"]`)];
 * might be able to use attribute selectors instead of xpath minimal changes from old system.
 */

function DQueryProcess(
  tagCollection: Array<CommonTags>,
  attributeCollection: Array<AttributePair>,
  html: HTML
): DQueryResult {
  return new DQueryResult("queryString", html);
}

/**
 * Build Queries for fetching html elements
 */
export class DQueryBuilder {
  private tagCollection: Array<CommonTags> = [];
  private attributeCollection: Array<AttributePair> = [];
  private html: HTML;

  constructor(html: HTML) {
    this.html = html;
  }

  /**
   *
   * @param tag - HTML tag usually represented as h1, h2, h3, etc.
   */
  public containsTag(tag: CommonTags) {
    this.tagCollection.push(tag);
    return this;
  }
  /**
   *
   * @param attribute - the name of the attribute you want to search.
   * @param value - the expected value of the attribute.
   */
  public containsAttribute(attribute: CommonAttributes, value: any) {
    this.attributeCollection.push([attribute, value]);
    return this;
  }

  /**
   * Construct a DQueryResult object containing parsed results.
   */
  public build(): DQueryResult {
    return DQueryProcess(
      this.tagCollection,
      this.attributeCollection,
      this.html
    );
  }
}

/**
 *  Holds DQuery Result Data
 *  contains .elements a list of Elements
 */
export class DQueryResult {
  public elements: NodeListOf<Element>;

  constructor(queryString: string, html: string) {
    this.elements = new JSDOM(html).window.document.querySelectorAll(
      queryString
    );
  }
}
