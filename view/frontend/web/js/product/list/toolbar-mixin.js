define([
    'jquery',
    'arrosoir'
], function ($, arrosoir) {

    var mixin = {
        options: {
            productListSelector: '.product-items'
        },

        changeUrl: function (paramName, paramValue, defaultValue) {
            if (this.options.post) {
                // TODO: Add support for post req
                // return this._super(paramName, paramValue, defaultValue);
            }

            var urlPaths = this.options.url.split('?'),
                baseUrl = urlPaths[0],
                paramData = this.getUrlParams(),
                currentPage = this.getCurrentPage(),
                newPage;

            if (currentPage > 1 && paramName === this.options.limit) {
                newPage = Math.floor(this.getCurrentLimit() * (currentPage - 1) / paramValue) + 1;

                if (newPage > 1) {
                    paramData[this.options.page] = newPage;
                } else {
                    delete paramData[this.options.page];
                }
            }

            paramData[paramName] = paramValue;

            if (paramValue == defaultValue) { //eslint-disable-line eqeqeq
                delete paramData[paramName];
            }

            paramData = $.param(paramData);
            // location.href = baseUrl + (paramData.length ? '?' + paramData : '');

            arrosoir.hydrate()
        }
    }

    return function (widget) {
        $.widget('mage.productListToolbarForm', widget, mixin);
        return $.mage.productListToolbarForm;
    };
});
