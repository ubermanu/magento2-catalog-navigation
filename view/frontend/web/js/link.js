/**
 * Make links asynchronous.
 * Note: This works only in the #maincontent area.
 */
define([
    'jquery',
    'Ubermanu_NavigationAsync/js/hydrate'
], function ($, hydrate) {
    'use strict';

    // FIXME: The link must refer to the website baseUrl
    // FIXME: Avoid links with targets
    return function (config, element) {
        $(element).on('click', function (e) {
            e.preventDefault();

            var url = $(this).attr('href');

            if (url
                && !url.startsWith('#')
                && !url.startsWith('mailto:')
                && !url.startsWith('tel:')
                && !url.startsWith('javascript:')
                && !url.startsWith('data:')) {
                hydrate(this.href, config);
            }
        });
    }
});
