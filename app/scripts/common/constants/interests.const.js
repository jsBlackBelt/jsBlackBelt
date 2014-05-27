/**
 * Created by sefi on 5/21/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

angular.module('jsBlackBelt.Constants')
    .value('InterestContexts', {
        // This is a configuration of interest types per context/view.
        // Each view should register to the interestTypes configured for it's context.
        sampleView1: ['type1', 'type2'],
        sampleView2: ['type3']
    })
    .value('InterestTypes', {
        // this is the dictionary of interests
        TYPE1: 'type1',
        TYPE2: 'type2',
        TYPE3: 'type3'
    });