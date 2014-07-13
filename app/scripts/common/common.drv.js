/**
 * Created by sefi on 4/22/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

angular.module('jsBlackBelt.Directives')
    .directive('jsbbPopOverDialog', ['$log', '$document', function ($log, $window) {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            templateUrl: 'scripts/common/partials/popOverDialog.tpl.html',
            scope: {dialogTitle: '@', saveCallback: '&', cancelCallback: '&', dialogStyle: '@', x: '@', y: '@', position: '@', showTitle: '@', showButtons: '@', readOnly: '='},
            link: function ($scope, element, attrs) {

                //remove auto center of the dialog
                var parentElem = element.parent().parent();
                parentElem.css('padding', '0px');
                var marginLeft = ($window.width() - parentElem.width()) / 2;
                //var maringLeft = parseInt(parentElem.css('margin-left'),10);

                // set default to left if position is not defined
                var position = $scope.position || 'left';
                var dialog = element;
                var top = parseInt($scope.y, 10);
                var left = parseInt($scope.x, 10) - marginLeft;

                if (angular.isUndefined($scope.showTitle) || $scope.showTitle === 'true') {
                    $scope.shouldShowTitle = true;
                } else {
                    $scope.shouldShowTitle = false;
                }

                if (angular.isUndefined($scope.showButtons) || $scope.showButtons === 'true') {
                    $scope.shouldShowButtons = true;
                } else {
                    $scope.shouldShowButtons = false;
                }


                var setDialogPos = function () {
                    switch (position) {
                        case "left":
                            dialog.css('top', Math.round(top - dialog.height() / 2) + 'px');
                            dialog.css('left', (left - dialog.width()) + 'px');
                            break;
                        case "right":
                            dialog.css('top', Math.round(top - dialog.height() / 2) + 'px');
                            dialog.css('left', left + 'px');
                            break;
                        case "top":
                            dialog.css('top', (top - dialog.height()) + 'px');
                            dialog.css('left', Math.round(left - dialog.width() / 2) + 'px');
                            break;
                        case "bottom":
                            dialog.css('top', top + 'px');
                            dialog.css('left', Math.round(left - dialog.width() / 2) + 'px');
                            break;
                        case "absolute":
                            dialog.css('top', top + 'px');
                            dialog.css('left', left + 'px');
                            break;
                        default:
                            break;
                    }
                };


                setDialogPos();

                $scope.$watch("assignments", function (value) {
                    setDialogPos();
                    dialog.focus();
                    var dialogZ = angular.element('.modal-backdrop').css('z-index');
                    angular.element('.modal-backdrop').css('z-index', +dialogZ + 10);
                });

                $scope.onCancel = function () {
                    try {
                        $scope.cancelCallback();
                    } catch (e) {
                        $log.error(e);
                    }
                };

                $scope.onSave = function () {
                    try {
                        $scope.saveCallback();
                    } catch (e) {
                        $log.error(e);
                    }
                };
            }
        };
    }]);


