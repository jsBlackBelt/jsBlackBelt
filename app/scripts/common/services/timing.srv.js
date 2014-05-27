/**
 * Created by sefi on 5/13/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

angular.module('jsBlackBelt.Services')
    .factory('TimingSrv', ['$interval', function ($interval) {
        var registrants = {},
            internalInterval = 1000;

        var start = function () {
            $interval(service.tick, internalInterval);
            service.tick();
        };

        var service = {
            register: function (id, tickHandler, interval, delay) {
                registrants[id] = {
                    tick: tickHandler,        // tick handler function.
                    interval: interval,       // configured interval.
                    delay: delay              // delay until first tick.
                };
            },

            unregister: function (id) {
                delete registrants[id];
            },

            tick: function () {
                angular.forEach(registrants, function (registrant) {
                    // update the delay.
                    registrant.delay -= internalInterval;

                    if (registrant.delay <= 0) {
                        // time to tick!
                        registrant.tick();

                        //reset delay to configured interval
                        registrant.delay = registrant.interval;
                    }
                });
            }
        };

        start();

        return service;
    }]);