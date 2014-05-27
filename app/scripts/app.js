/**
 * Created by sefi on 5/13/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

angular.module('jsBlackBelt', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angularLocalStorage',
    'ui.bootstrap',
    'pascalprecht.translate',
    'jsBlackBelt.Constants',
    'jsBlackBelt.Model',
    'jsBlackBelt.Filters',
    'jsBlackBelt.Services',
    'jsBlackBelt.Controllers',
    'jsBlackBelt.Directives'

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
angular.module('jsBlackBelt.Controllers', ['pascalprecht.translate']);
angular.module('jsBlackBelt.Constants', []);
angular.module('jsBlackBelt.Model', []);
angular.module('jsBlackBelt.Filters', []);
