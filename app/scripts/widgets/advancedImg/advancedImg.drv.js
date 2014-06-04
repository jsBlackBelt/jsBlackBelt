/**
 * Created by sefi on 6/3/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

angular.module('jsBlackBelt.Directives')
    .directive('jsbbAdvancedImg', [function () {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'scripts/widgets/advancedImg/advancedImg.tpl.html',
            scope: {imageSrc: '@', fallback: '@', imageTitle: '@'},
            link: function ($scope, element, attrs) {

            }
        };
    }]);