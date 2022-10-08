define([
    'jquery',
    'arrosoir'
], function ($, arrosoir) {
    'use strict';

    const defaultOptions = {
        history: false,
        contentOnly: true,
    }

    /**
     * Function to hydrate the #maincontent with the server side response.
     * @see https://github.com/ubermanu/arrosoir
     *
     * @param {string} url
     * @param {object} options
     */
    return function (url, options = {}) {
        options = $.extend({}, defaultOptions, options);

        $('body').trigger('processStart');

        // Add the `isContent` GET param to the url
        if (options.contentOnly) {
            const params = arrosoir.params(url);
            params.isContent = true;
            return params.apply(url);
        }

        arrosoir.hydrate('#maincontent', url, options).then(function () {
            $('#maincontent').trigger('contentUpdated');
            $('body').trigger('processStop');
        });
    }
});
