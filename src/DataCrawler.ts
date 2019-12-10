import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export const DataCrawler = () => {

    /**
     * 
     * @param {string} url - target url
     */
    const fetchPageText = async (url: string) => await (await fetch(url)).text();

    /** Turns Attributes into key pair values */
    const deconstructAttributes = (attributes: any) => new Map(Array.prototype.slice
        .call(attributes).map(attr => [attr.name, attr.value]));

    /**
     * @param {*} element - Element to be passed in.
     * 
     * Deconstructs elements in key value pairs.
     */
    const elementUnlink = ({ tagName, textContent, attributes }: any) => ({
        tagName,
        textContent, attributes: deconstructAttributes(attributes)
    });


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
    const unlinkQuery = (text: string, queryString: string) => Array
        .from(new JSDOM(text).window.document.querySelectorAll(queryString)).map(elementUnlink)

    return {
        fetchPageText, 
        unlinkAll,
        unlinkQuery
    };


}