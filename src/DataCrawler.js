const fetch = require('node-fetch');
const {
    JSDOM
} = require('jsdom');

const DataCrawler = async (url) => {

    const rawHTML = await (await fetch(url)).text();
    const results = [];

    /** Turns Attributes into key pair values */
    const deconstructAttributes = (attributes) => {
        return new Map(Array.prototype.slice
            .call(attributes).map(attr => [attr.name, attr.value]));
    };


    /**
     * @param {*} element - Element to be passes in
     * @param {*} arr - In Memory Stack for deconstructed elements
     * 
     * Deconstructs elements in key value pairs.
     */
    const elementUnlink = (element) => {
        const {
            tagName,
            textContent,
            attributes
        } = element;
        results.push({
            tagName,
            textContent,
            attributes: deconstructAttributes(attributes)
        });
    }

    /**
     * 
     * @param {*} text - HTML text from Network Request 
     * takes plain HTML text and selects all elements from the DOM
     * then passes them on to the final unlinking
     */
    const unlink = (text) => {
        // resetting in memory array.
        results.length = 0;
        const document = new JSDOM(text).window.document;
        document.querySelectorAll('*').forEach(e => elementUnlink(e, results));
        return results;
    }

    /**
     * 
     * @param {*} text - HTML text from Network Request 
     * takes plain HTML text and selects specified elements from the DOM
     * then passes them on to the final unlinking
     */
    const unlinkQuery = (text, queryString) => {
        // resetting in memory array.
        results.length = 0;
        const document = new JSDOM(text).window.document;
        document.querySelectorAll(queryString).forEach(e => elementUnlink(e, results));
        return results;
    }

    return {
        /**
         * Returns an array of key value pairs for the 
         * Data Document.
         */
        gatherHTML: async () => {
            return unlink(rawHTML);
        },
        /**
         * Returns an array of key value pairs for the 
         * Data Document from  Queried area.
         */
        trans: async (queryString) => {
            return unlinkQuery(rawHTML, queryString);
        }
    };


}

module.exports = DataCrawler;