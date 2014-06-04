/**
 * Created by sefi on 6/3/14.
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