/**
 * Created by sefi on 5/13/14.
 */
'use strict';

angular.module('jsBlackBelt.Services')
    .factory('TimingSrv', ['$interval', function($interval) {
        var registrants = {},
            internalInterval = 1000;

        var start = function () {
            $interval(service.tick, internalInterval);
            service.tick();
        };

        var service = {
            register: function(id, tickFunction, interval, delay) {
                registrants[id] = {
                    tick: tickFunction,                 // tick handler function.
                    configuredInterval: interval,       // configured interval.
                    delay: delay                        // delay until first tick.
                };
            },

            unregister: function(id) {
                delete registrants[id];
            },

            tick: function() {
                angular.forEach(registrants, function(registrant) {
                    // update the delay.
                    registrant.delay -= internalInterval;

                    if (registrant.delay <= 0) {
                        // time to tick!
                        registrant.tick();

                        //reset delay to configured interval
                        registrant.delay = registrant.configuredInterval;
                    }
                });
            }
        };

        start();

        return service;
    }]);