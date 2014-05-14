/**
 * Created by sefi on 5/14/14.
 */
'use strict';

angular.module("jsBlackBelt.Services")
    .factory('CacheSrv', ['storage', '$log', function (storage, $log) {
        var api = {};

        // create a setter function for the key
        var createSetter = function(key) {
            return function(value) {
                // if both key and value are valid
                if (key && value) {
                    try {
                        storage.set(key, value);
                    } catch (e) {
                        // failure might be because of over quota, for example, so log it.
                        $log.info('[CacheSrv] ' + e.message);
                    }

                } else {
                    // if value is undefined, clear it from the storage.
                    storage.remove(key);
                }
            };
        },

        // create a getter function for the key
        createGetter = function(key) {
            return function() {
                // try to get the value for the key from the storage.
                var value = storage.get(key);
                if (!value) {
                    // if there is no value, override it to undefined and store it.
                    value = undefined;
                    var setter = api[key].setter;
                    setter(value);
                }

                return value;
            }
        },

        createAPIForKey = function(key) {
            var setter = createSetter(key);
            var getter = createGetter(key);

            api[key] = {
                setter: setter,
                getter: getter
            };
        },

        // check if key is valid and lazily create api
        checkAndCreateKey = function(key) {
            if (!key || angular.isUndefined(key)) {
                throw new Error("key [" + key + "] is not valid");
            }

            if (!api.hasOwnProperty(key)) {
                createAPIForKey(key);
            }
        };

        return {
            /**
             * returns the setter for the given key.
             * Usage will be:
             * cacheSrv.getSetter(key)(value) -> will set value to key
             * cacheSrv.getSetter(key)() -> will remove key from storage
             *
             * @param key
             * @returns {*|props.setter}
             */
            getSetter: function(key) {
                checkAndCreateKey(key);
                return api[key].setter;
            },

            /**
             * returns the getter for the given key.
             * Usage will be:
             *
             * cacheSrv.getGetter(key)() -> will return current value if it exists, undefined otherwise.
             *
             * @param key
             * @returns {*|props.getter}
             */
            getGetter: function(key) {
                checkAndCreateKey(key);
                return api[key].getter;
            }
        };

    }]);