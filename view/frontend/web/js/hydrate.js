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

        // Preserve the original URL, so we can use it in the history
        const origUrl = url;

        // Add the `isContent` GET param to the url
        if (options.contentOnly) {
            const params = arrosoir.params(url);
            params.isContent = true;
            url = params.apply(url);
        }

        $('body').trigger('processStart');

        // Force the history option to false and manually do it on callback
        // Since we might have the `isContent` GET param, we don't want to push it to the history
        const hydrateOptions = $.extend({}, options, { history: false });

        arrosoir.hydrate('#maincontent', url, hydrateOptions).then(function () {
            $('#maincontent').trigger('contentUpdated');
            $('body').trigger('processStop');

            if (options.history) {
                history.pushState({}, '', origUrl);
            }
        });
    }
});
