import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export const DataCrawler = async (url: string) => {

    const rawHTML: string = await (await fetch(url)).text();
    const results: any[] = [];

    /** Turns Attributes into key pair values */
    const deconstructAttributes = (attributes: any) => new Map(Array.prototype.slice
        .call(attributes).map(attr => [attr.name, attr.value]));



    /**
     * @param {*} element - Element to be passed in.
     * 
     * Deconstructs elements in key value pairs.
     */
    const elementUnlink = ({ tagName, textContent, attributes }: any) => {
        results.push({
            tagName,
            textContent,
            attributes: deconstructAttributes(attributes)
        });
    }

    const elementUnlinkSimple = ({ tagName, textContent, attributes }: any) => ({ tagName,
         textContent, attributes: deconstructAttributes(attributes) });

    const unlinkSimple = (text: string) => new JSDOM(text)


    /**
     * 
     * @param {*} text - HTML text from Network Request 
     * takes plain HTML text and selects all elements from the DOM
     * then passes them on to the final unlinking
     */
    const unlink = (text: string) => {
        // resetting in memory array.
        results.length = 0;
        const document: Document = new JSDOM(text).window.document;
        document.querySelectorAll('*').forEach(e => elementUnlink(e));
        return results;
    }

    /**
     * 
     * @param {*} text - HTML text from Network Request 
     * takes plain HTML text and selects specified elements from the DOM
     * then passes them on to the final unlinking
     */
    const unlinkQuery = (text: string, queryString: string) => {
        // resetting in memory array.
        results.length = 0;
        const document: Document = new JSDOM(text).window.document;
        document.querySelectorAll(queryString).forEach(e => elementUnlink(e));
        return results;
    }

    return {
        /**
         * Returns an array of key value pairs for the 
         * Data Document.
         */
        gatherHTML: async (): Promise<any[]> => {
            return unlink(rawHTML);
        },
        /**
         * Returns an array of key value pairs for the 
         * Data Document from  Queried area.
         */
        trans: async (queryString: string): Promise<any[]> => {
            return unlinkQuery(rawHTML, queryString);
        }
    };


}