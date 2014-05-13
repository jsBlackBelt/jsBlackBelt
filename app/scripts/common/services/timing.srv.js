/**
 * Created by sefi on 5/13/14.
 */

'use strict';

angular.module('jsBlackBelt.Services')
    .factory('TimingSrv', ['$log', '$interval', function($log, $interval) {
        var registrants = {},
            intervalInterval = 1000;

        var start = function () {
            $interval(service.tick, intervalInterval);
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
                    registrant.delay -= intervalInterval;

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