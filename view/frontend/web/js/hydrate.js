define([
    'jquery',
    'arrosoir'
], function ($, arrosoir) {
    'use strict';

    /**
     * Function to hydrate the #maincontent with the server side response.
     * @see https://github.com/ubermanu/arrosoir
     *
     * @param {string} url
     * @param {object} options
     */
    return function (url, options = {}) {
        $('body').trigger('processStart');

        arrosoir.hydrate('#maincontent', url, options).then(function () {
            $('#maincontent').trigger('contentUpdated');
            $('body').trigger('processStop');
        });
    }
});
