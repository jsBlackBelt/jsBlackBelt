'use strict';

angular.module('jsBlackBelt', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

angular.module('jsBlackBelt.Services', []);
angular.module('jsBlackBelt.Directives', []);
angular.module('jsBlackBelt.Controllers', []);
angular.module('jsBlackBelt.Constants', []);
angular.module('jsBlackBelt.Filters', []);
