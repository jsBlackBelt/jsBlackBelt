/**
 * Created by sefi on 7/1/14.
 */

'use strict';

angular.module('jsBlackBelt.Directives')
    .directive('jsbbReplace', ['$http', '$templateCache', '$compile', function ($http, $templateCache, $compile) {

//        Pre and Post functions:
        var preLink = function (scope, element, attrs) {
            var text = 'scripts/widgets/replace/myDirectiveText.tpl.html',
                image = 'scripts/widgets/replace/myDirectiveImage.tpl.html';

            var getTemplate = function (type) {
                if (type === 'text') {
                    return text;
                } else {
                    return image;
                }
            };

            $http.get(getTemplate(scope.templateType), {cache: $templateCache}).then(function (result) {
                element.html(result.data);
                $compile(element.contents())(scope);
            });

        },
        postLink = function(scope, element, attrs) {
            scope.text = "hello world";
        };


        return {
            scope: {templateType: "="},
            compile: function compile (element, attrs) {
                return {
                    pre: preLink,
                    post: postLink
                }
            }
        };





//        Link function:
//
//        return {
//            scope: {templateType: "="},
//            link: function(scope, element, attrs) {
//                var text = 'scripts/widgets/replace/myDirectiveText.tpl.html',
//                    image = 'scripts/widgets/replace/myDirectiveImage.tpl.html';
//
//                var getTemplate = function (type) {
//                    if (type === 'text') {
//                        return text;
//                    } else {
//                        return image;
//                    }
//                };
//
//                $http.get(getTemplate(scope.templateType), {cache: $templateCache}).then(function (result) {
//                    element.html(result.data);
//                    $compile(element.contents())(scope);
//                });
//            }
//        };
    }]);