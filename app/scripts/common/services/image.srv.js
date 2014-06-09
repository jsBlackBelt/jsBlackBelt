/**
 * Created by sefi on 6/5/14.
 */

'use strict';

angular.module('elniniophotoApp.Services')
    .service('ImageSrv', [function () {
        return {
            getImageUrlFromId: function (id) {
                return "images/portfolio/" + id + ".jpg";
            },

            getThumbUrlFromId: function (id) {
                return "images/portfolio/" + id + "_thumb.jpg";
            }
        };
    }]);
