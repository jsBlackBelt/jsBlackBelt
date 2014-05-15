'use strict';

angular.module('jsBlackBelt', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularLocalStorage',
    'ui.bootstrap',
    'pascalprecht.translate',
    'jsBlackBelt.Services',
    'jsBlackBelt.Directives',
    'jsBlackBelt.Controllers',
    'jsBlackBelt.Constants',
    'jsBlackBelt.Filters'

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

angular.module('jsBlackBelt.Services', ['ngResource', 'angularLocalStorage']);
angular.module('jsBlackBelt.Directives', ['ui.bootstrap', 'pascalprecht.translate']);
angular.module('jsBlackBelt.Controllers', ['angularLocalStorage', 'pascalprecht.translate']);
angular.module('jsBlackBelt.Constants', []);
angular.module('jsBlackBelt.Filters', []);
