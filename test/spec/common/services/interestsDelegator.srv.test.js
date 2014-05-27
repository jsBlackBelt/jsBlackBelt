/**
 * Created by sefi on 5/26/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

describe('interestsDelegatorSrv: ', function () {
    var injector;
    var interestsDelegatorSrv;
    var Interest;

    var handlers;
    var updateTypes;
    var data;

    describe('setUp', function () {
        it('Setting up the suite', function () {
            module('jsBlackBelt.Services');
            module('jsBlackBelt.Model');

            inject(function ($injector) {
                injector = $injector;
                interestsDelegatorSrv = injector.get('InterestsDelegatorSrv');
                Interest = injector.get('Interest');
            });

            data = {
                data1: null,
                data2: null
            };

            handlers = {
                handler1: function (data1) {
                    data.data1 = data1;
                },
                handler2: function (data2) {
                    data.data2 = data2;
                }
            };

            updateTypes = {
                type1: "type1",
                type2: "type2"
            };
        });
    });

    describe('tests', function () {

        beforeEach(function () {
            spyOn(handlers, 'handler1').and.callThrough();
            spyOn(handlers, 'handler2').and.callThrough();
        });

        it('sanity', function () {

            expect(interestsDelegatorSrv).not.toBeUndefined;
            expect(Interest).not.toBeUndefined;

            expect(handlers.handler1).not.toBeUndefined;
            expect(handlers.handler2).not.toBeUndefined;
            expect(updateTypes).not.toBeUndefined;
            expect(data).not.toBeUndefined;

        });

        it('should register and notify handler1', function () {
            var interest;

            // local sanity
            expect(handlers.handler1.calls.any()).toEqual(false);

            // register interest
            interest = new Interest(updateTypes.type1, handlers.handler1);
            interestsDelegatorSrv.registerInterest(interest);

            // notify
            interestsDelegatorSrv.notifyRegistrars(updateTypes.type1, {});

            // and make sure only handler1 was notified
            expect(handlers.handler1.calls.any()).toEqual(true);
            expect(handlers.handler2.calls.any()).toEqual(false);
            expect(handlers.handler1.calls.count()).toEqual(1);
            expect(handlers.handler2.calls.count()).toEqual(0);
            expect(handlers.handler1).toHaveBeenCalled();
            expect(handlers.handler2).not.toHaveBeenCalled();
            expect(handlers.handler1).toHaveBeenCalledWith(jasmine.any(Object));

        });

        it('should register two handlers for the same type and invoke both', function () {

            var interest1, interest2;

            // local sanity
            expect(handlers.handler1.calls.any()).toEqual(false);
            expect(handlers.handler2.calls.any()).toEqual(false);

            // register interests
            interest1 = new Interest(updateTypes.type1, handlers.handler1);
            interest2 = new Interest(updateTypes.type1, handlers.handler2);
            interestsDelegatorSrv.registerInterests([interest1, interest2]);

            // notify
            interestsDelegatorSrv.notifyRegistrars(updateTypes.type1, {});

            // and make sure both handlers were notified
            expect(handlers.handler1.calls.any()).toEqual(true);
            expect(handlers.handler2.calls.any()).toEqual(true);
            expect(handlers.handler1.calls.count()).toEqual(1);
            expect(handlers.handler2.calls.count()).toEqual(1);
            expect(handlers.handler1).toHaveBeenCalled();
            expect(handlers.handler2).toHaveBeenCalled();
            expect(handlers.handler1).toHaveBeenCalledWith(jasmine.any(Object));
            expect(handlers.handler2).toHaveBeenCalledWith(jasmine.any(Object));

        });

        it('should register two handlers for different types and invoke one then the other', function () {

            var interest1, interest2;

            // local sanity
            expect(handlers.handler1.calls.any()).toEqual(false);
            expect(handlers.handler2.calls.any()).toEqual(false);

            // register interests
            interest1 = new Interest(updateTypes.type1, handlers.handler1);
            interest2 = new Interest(updateTypes.type2, handlers.handler2);
            interestsDelegatorSrv.registerInterests([interest1, interest2]);

            // notify type1
            interestsDelegatorSrv.notifyRegistrars(updateTypes.type1, {});

            // and make sure only handler1 was notified
            expect(handlers.handler1.calls.any()).toEqual(true);
            expect(handlers.handler2.calls.any()).toEqual(false);
            expect(handlers.handler1.calls.count()).toEqual(1);
            expect(handlers.handler2.calls.count()).toEqual(0);
            expect(handlers.handler1).toHaveBeenCalled();
            expect(handlers.handler2).not.toHaveBeenCalled();
            expect(handlers.handler1).toHaveBeenCalledWith(jasmine.any(Object));

            // notify type2
            interestsDelegatorSrv.notifyRegistrars(updateTypes.type2, {});

            // and make sure only handler2 was notified now
            expect(handlers.handler1.calls.any()).toEqual(true);
            expect(handlers.handler2.calls.any()).toEqual(true);
            expect(handlers.handler1.calls.count()).toEqual(1);
            expect(handlers.handler2.calls.count()).toEqual(1);
            expect(handlers.handler1).toHaveBeenCalled();
            expect(handlers.handler2).toHaveBeenCalled();
            expect(handlers.handler1).toHaveBeenCalledWith(jasmine.any(Object));
            expect(handlers.handler2).toHaveBeenCalledWith(jasmine.any(Object));

        });

        it('should register and unregister interests', function () {
            var interest1, interest2;

            // local sanity
            expect(handlers.handler1.calls.any()).toEqual(false);
            expect(handlers.handler2.calls.any()).toEqual(false);

            // register and unregister interests
            interest1 = new Interest(updateTypes.type1, handlers.handler1);
            interest2 = new Interest(updateTypes.type2, handlers.handler2);
            interestsDelegatorSrv.registerInterests([interest1, interest2]);
            interestsDelegatorSrv.unregisterInterests([interest1, interest2]);

            // notify
            interestsDelegatorSrv.notifyRegistrars(updateTypes.type1, {});
            interestsDelegatorSrv.notifyRegistrars(updateTypes.type2, {});

            // and make sure none were notified - indeed unregistered.
            expect(handlers.handler1.calls.any()).toEqual(false);
            expect(handlers.handler2.calls.any()).toEqual(false);
            expect(handlers.handler1.calls.count()).toEqual(0);
            expect(handlers.handler2.calls.count()).toEqual(0);
            expect(handlers.handler1).not.toHaveBeenCalled();
            expect(handlers.handler2).not.toHaveBeenCalled();
        });
    });
});