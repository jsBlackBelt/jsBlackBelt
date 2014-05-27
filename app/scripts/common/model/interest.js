/**
 * Created by sefi on 5/19/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

angular.module('jsBlackBelt.Model')
    .factory('Interest', [function () {
        /**
         * Constructor, with class name
         */
        function Interest(updateType, handler) {
            this.updateType = updateType;
            this.handler = handler;
        }

        Interest.prototype.updateType = undefined;
        Interest.prototype.handler = undefined;

        return Interest;
    }]);