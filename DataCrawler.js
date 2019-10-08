const fetch = require('node-fetch');
const {
    JSDOM
} = require('jsdom');


const DataCrawler = (url) => {

    /**
     * @param {*} e - Element to be passes in
     * @param {*} arr - In Memory Stack for deconstructed elements
     * 
     * Deconstructs elements in key value pairs.
     */
    const elementUnlink = (e, arr) => {
        const {
            tagName,
            textContent,
            attributes
        } = e;

        /** Turns Attributes into key pair values */
        function deconstructAttributes(attributes) {
            return new Map(Array.prototype.slice
                .call(attributes).map(attr => [attr.name, attr.value]));
        };

        arr.push({
            tagName,
            textContent,
            attributes: deconstructAttributes(attributes)
        })
    }

    /**
     * 
     * @param {*} text - HTML text from Network Request 
     * takes plain HTML text and selects all elements from the DOM
     * then passes them on to the final unlinking
     */
    const unlink = (text) => {
        const results = [];
        const document = new JSDOM(text).window.document;
        document.querySelectorAll('*').forEach(e => elementUnlink(e, results));
        return results;
    }


    return {
        /**
         * Returns an array of key value pairs for the 
         * Data Document.
         */
        gatherHTML: async () => {
            const data = unlink(await (await fetch(url)).text());
            return data;
        }, 
        /**
         *  Returns very specific portion of an elementl 
         */
        trans: async (...conditions) => {
            // todo: implement using document.querySelector and return unlinked data
        }
    };
};


module.exports = DataCrawler;