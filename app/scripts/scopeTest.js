/**
 * Created by sefi on 5/15/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

angular.module('jsBlackBelt')
    .controller('ScopeTestCtrl', function ($scope) {

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
