import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export const DataCrawler = async (url: string) => {

    const raw: string = await (await fetch(url)).text();

    // const fetchPageText

    /** Turns Attributes into key pair values */
    const deconstructAttributes = (attributes: any) => new Map(Array.prototype.slice
        .call(attributes).map(attr => [attr.name, attr.value]));

    /**
     * @param {*} element - Element to be passed in.
     * 
     * Deconstructs elements in key value pairs.
     */
    const elementUnlink = ({ tagName, textContent, attributes }: any) => ({ tagName,
         textContent, attributes: deconstructAttributes(attributes) });

 
    /**
     * 
     * @param {*} text - HTML text from Network Request 
     * takes plain HTML text and selects all elements from the DOM
     * then passes them on to the final unlinking
     */
    const unlinkAll = (text: string) => Array.from(new JSDOM(text).window.document
    .querySelectorAll('*')).map(elementUnlink);

    /**
     * 
     * @param {*} text - HTML text from Network Request 
     * takes plain HTML text and selects specified elements from the DOM
     * then passes them on to the final unlinking
     */
    const unlinkQueryFunctional = (text: string, queryString: string) => Array
    .from(new JSDOM(text).window.document.querySelectorAll(queryString)).map(elementUnlink)

    return {
        /**
         * Returns an array of key value pairs for the 
         * Data Document.
         */
        gatherHTML: async (): Promise<any[]> => {
            return unlinkAll(raw);
        },
        /**
         * Returns an array of key value pairs for the 
         * Data Document from  Queried area.
         */
        trans: async (queryString: string): Promise<any[]> => {
            return unlinkQueryFunctional(raw, queryString);
        }
    };


}