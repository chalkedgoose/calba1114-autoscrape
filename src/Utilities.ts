import type {} from "jsdom";
import fetch, { RequestInfo } from "node-fetch";
import { JSDOM } from "jsdom";

const Utils = {
  fetchPageText: async (url: RequestInfo) => await (await fetch(url)).text(),
  deconstructAttributes: (attributes: any) =>
    new Map(
      Array.prototype.slice
        .call(attributes)
        .map((attr) => [attr.name, attr.value])
    ),
  elementUnlink: ({ tagName, textContent, attributes }: any) => ({
    tagName,
    textContent,
    attributes: Utils.deconstructAttributes(attributes),
  }),
  unlinkAll: (text: string) =>
    Array.from(new JSDOM(text).window.document.querySelectorAll("*")).map(
      Utils.elementUnlink
    ),
  unlinkQuery: (text: string, queryString: string) =>
    Array.from(
      new JSDOM(text).window.document.querySelectorAll(queryString)
    ).map(Utils.elementUnlink),
};

export default Utils;
