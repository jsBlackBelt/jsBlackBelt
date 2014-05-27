/**
 * Created by sefi on 5/19/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

angular.module('jsBlackBelt.Services')
    .factory('InterestsDelegatorSrv', [function () {

        // This is a registry of updateTypes, each key points to an array of handlers
        var registry = {};

        var service = {
            /**
             *
             * @param interest
             *          an Interest object
             */
            registerInterest: function (interest) {
                var interestRegistry = registry[interest.updateType];

                if (angular.isUndefined(interestRegistry)) {
                    registry[interest.updateType] = [];
                    interestRegistry = registry[interest.updateType];
                }

                if (interestRegistry.indexOf(interest.handler) === -1) {
                    interestRegistry.push(interest.handler);
                }
            },

            /**
             *
             * @param interests
             *          an array of Interest objects
             */
            registerInterests: function (interests) {
                angular.forEach(interests, function (interest) {
                    service.registerInterest(interest);
                });
            },

            /**
             *
             * @param interest
             *          an Interest object
             */
            unregisterInterest: function (interest) {
                var typeRegistry = registry[interest.updateType],
                    handler;

                for (var i = 0; i < typeRegistry.length; i++) {
                    handler = typeRegistry[i];

                    if (handler === interest.handler) {
                        typeRegistry.splice(i, 1);
                        break;
                    }
                }
            },

            /**
             *
             * @param interests
             *          an array of Interest objects
             */
            unregisterInterests: function (interests) {
                angular.forEach(interests, function (interest) {
                    service.unregisterInterest(interest);
                });
            },

            /**
             *
             * @param updateType
             * @param data
             */
            notifyRegistrars: function (updateType, data) {
                var typeRegistry = registry[updateType];

                angular.forEach(typeRegistry, function (handler) {
                    handler(data);
                });

            }
        };

        return service;

    }]);