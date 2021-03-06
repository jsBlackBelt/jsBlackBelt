/**
 * Created by sefi on 5/15/14.
 *
 * related post:
 * http://ajsblackbelt.wordpress.com/2014/05/27/local-storage-cache-service/
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

describe('cacheSrv: ', function () {
    var injector;
    var cacheSrv;
    var storage;
    var $translate;

    describe('setUp', function () {
        it('Setting up the suite', function () {
            // we need to include the root module here because we rely on it's config for storage and translate.
            module('jsBlackBelt');

            inject(function ($injector) {
                injector = $injector;
                cacheSrv = injector.get('CacheSrv');
                storage = injector.get('storage');
                $translate = injector.get('$translate');
            });
        });
    });

    describe('tests', function () {
        beforeEach(function () {
            storage.clearAll();
        });

        it('sanity', function () {
            expect(storage).not.toBeUndefined;
            expect(cacheSrv).not.toBeUndefined;
            expect($translate).not.toBeUndefined;
        });

        it('should not allow null, empty string or undefined key', function () {
            var key;

            // test undefined
            expect(key).toBeUndefined;
            expect(function () {
                cacheSrv.getGetter(key);
            }).toThrow();

            // test empty string
            key = "";
            expect(key).toEqual("");
            expect(function () {
                cacheSrv.getGetter(key);
            }).toThrow();

            // test null
            key = null;
            expect(key).toEqual(null);
            expect(function () {
                cacheSrv.getGetter(key);
            }).toThrow();

        });

        it('should return undefined as default value', function () {
            var value = cacheSrv.getGetter("key")();
            expect(value).toBeUndefined;

            value = storage.get("key");
            expect(value).toBeUndefined;
        });

        it('should return correct value', function () {
            var key = "key",
                value = "value",
                value2 = "value2",
                returnedValue;

            cacheSrv.getSetter(key)(value);
            returnedValue = cacheSrv.getGetter(key)();
            expect(returnedValue).toEqual(value);
            returnedValue = storage.get(key);
            expect(returnedValue).toEqual(value);

            cacheSrv.getSetter(key)(value2);
            returnedValue = cacheSrv.getGetter(key)();
            expect(returnedValue).toEqual(value2);

        });

        it('should remove key from storage', function () {
            var returnedValue,
                key = "key",
                value = "value";

            cacheSrv.getSetter(key)(value);
            returnedValue = cacheSrv.getGetter(key)();
            expect(returnedValue).toEqual(value);

            cacheSrv.getSetter(key)();
            returnedValue = storage.get(key);
            expect(returnedValue).toBeUndefined;
        });

        it('should not store invalid value', function () {
            var returnedValue,
                key = "key",
                value;

            value = "";
            cacheSrv.getSetter(key)(value);
            returnedValue = cacheSrv.getGetter(key)();
            expect(returnedValue).toEqual('');

            value = 0;
            cacheSrv.getSetter(key)(value);
            returnedValue = cacheSrv.getGetter(key)();
            expect(returnedValue).toEqual(0);

            cacheSrv.getSetter(key)();
            returnedValue = cacheSrv.getGetter(key)();
            expect(returnedValue).toBeUndefined;
        });
    });
});