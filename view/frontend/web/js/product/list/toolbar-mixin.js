define([
    'jquery',
    'arrosoir'
], function ($, arrosoir) {

    var mixin = {
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
            var url = baseUrl + (paramData.length ? '?' + paramData : '');

            $('body').trigger('processStart');

            arrosoir.hydrate('#maincontent', url, { history: true }).then(function () {
                $('#maincontent').trigger('contentUpdated');
                $('body').trigger('processStop');
            });
        }
    }

    return function (widget) {
        $.widget('mage.productListToolbarForm', widget, mixin);
        return $.mage.productListToolbarForm;
    };
});
