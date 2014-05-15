/**
 * Created by sefi on 5/15/14.
 */

'use strict';

angular.module('jsBlackBelt')
    .controller('MainCtrl', function ($scope) {

        $scope.object = {
            data: {
                collection: [],
                archived: []
            }
        };

        $scope.$watch('object.data.collecton', function(newValue, oldValue) {
            // This won't get invoked...
        });

        $scope.$watchCollection('object.data.collecton', function(newValue, oldValue) {
            // This will get invoked, 3 times
        });


        $scope.$watchCollection(
            function() {
                return $scope.object.data.collection;
            },
            function(newValue, oldValue) {
                // this will get invoked only once.
            }
        );

    });
