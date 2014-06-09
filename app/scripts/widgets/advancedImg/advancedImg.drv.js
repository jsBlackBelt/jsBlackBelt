/**
 * Created by sefi on 6/3/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

angular.module('jsBlackBelt.Directives')
    .directive('jsbbAdvancedImg', ['$state', '$timeout', 'ImageSrv', function ($state, $timeout, imageSrv) {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'scripts/widgets/advancedImg/advancedImg.tpl.html',
            scope: {imageId: '@', fallback: '@', imageTitle: '@'},
            link: function ($scope, element, attrs) {
                // add random delay for extra dynamic UI.
                var delay = Math.floor(Math.random() * 1000);

                $timeout(function() {
                    $scope.imageSrc = imageSrv.getThumbUrlFromId($scope.imageId);
                }, delay);

                $scope.openImage = function () {
                    $state.go('image', {
                        imageId: $scope.imageId
                    });
                };
            }
        };
    }]);