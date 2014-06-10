/*
 AngularJS v1.2.17-build.204+sha.ad08638
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (n, e, A) {
  'use strict';
  function x(s, g, k) {
    return {
      restrict: 'ECA',
      terminal: !0,
      priority: 400,
      transclude: 'element',
      link: function (a, c, b, f, w) {
        function y() {
          p && (p.remove(), p = null);
          h && (h.$destroy(), h = null);
          l && (k.leave(l, function () {
            p = null;
          }), p = l, l = null);
        }
        function v() {
          var b = s.current && s.current.locals;
          if (e.isDefined(b && b.$template)) {
            var b = a.$new(), d = s.current;
            l = w(b, function (d) {
              k.enter(d, null, l || c, function () {
                !e.isDefined(t) || t && !a.$eval(t) || g();
              });
              y();
            });
            h = d.scope = b;
            h.$emit('$viewContentLoaded');
            h.$eval(u);
          } else
            y();
        }
        var h, l, p, t = b.autoscroll, u = b.onload || '';
        a.$on('$routeChangeSuccess', v);
        v();
      }
    };
  }
  function z(e, g, k) {
    return {
      restrict: 'ECA',
      priority: -400,
      link: function (a, c) {
        var b = k.current, f = b.locals;
        c.html(f.$template);
        var w = e(c.contents());
        b.controller && (f.$scope = a, f = g(b.controller, f), b.controllerAs && (a[b.controllerAs] = f), c.data('$ngControllerController', f), c.children().data('$ngControllerController', f));
        w(a);
      }
    };
  }
  n = e.module('ngRoute', ['ng']).provider('$route', function () {
    function s(a, c) {
      return e.extend(new (e.extend(function () {
      }, { prototype: a }))(), c);
    }
    function g(a, e) {
      var b = e.caseInsensitiveMatch, f = {
          originalPath: a,
          regexp: a
        }, k = f.keys = [];
      a = a.replace(/([().])/g, '\\$1').replace(/(\/)?:(\w+)([\?\*])?/g, function (a, e, b, c) {
        a = '?' === c ? c : null;
        c = '*' === c ? c : null;
        k.push({
          name: b,
          optional: !!a
        });
        e = e || '';
        return '' + (a ? '' : e) + '(?:' + (a ? e : '') + (c && '(.+?)' || '([^/]+)') + (a || '') + ')' + (a || '');
      }).replace(/([\/$\*])/g, '\\$1');
      f.regexp = RegExp('^' + a + '$', b ? 'i' : '');
      return f;
    }
    var k = {};
    this.when = function (a, c) {
      k[a] = e.extend({ reloadOnSearch: !0 }, c, a && g(a, c));
      if (a) {
        var b = '/' == a[a.length - 1] ? a.substr(0, a.length - 1) : a + '/';
        k[b] = e.extend({ redirectTo: a }, g(b, c));
      }
      return this;
    };
    this.otherwise = function (a) {
      this.when(null, a);
      return this;
    };
    this.$get = [
      '$rootScope',
      '$location',
      '$routeParams',
      '$q',
      '$injector',
      '$http',
      '$templateCache',
      '$sce',
      function (a, c, b, f, g, n, v, h) {
        function l() {
          var d = p(), m = r.current;
          if (d && m && d.$$route === m.$$route && e.equals(d.pathParams, m.pathParams) && !d.reloadOnSearch && !u)
            m.params = d.params, e.copy(m.params, b), a.$broadcast('$routeUpdate', m);
          else if (d || m)
            u = !1, a.$broadcast('$routeChangeStart', d, m), (r.current = d) && d.redirectTo && (e.isString(d.redirectTo) ? c.path(t(d.redirectTo, d.params)).search(d.params).replace() : c.url(d.redirectTo(d.pathParams, c.path(), c.search())).replace()), f.when(d).then(function () {
              if (d) {
                var a = e.extend({}, d.resolve), c, b;
                e.forEach(a, function (d, c) {
                  a[c] = e.isString(d) ? g.get(d) : g.invoke(d);
                });
                e.isDefined(c = d.template) ? e.isFunction(c) && (c = c(d.params)) : e.isDefined(b = d.templateUrl) && (e.isFunction(b) && (b = b(d.params)), b = h.getTrustedResourceUrl(b), e.isDefined(b) && (d.loadedTemplateUrl = b, c = n.get(b, { cache: v }).then(function (a) {
                  return a.data;
                })));
                e.isDefined(c) && (a.$template = c);
                return f.all(a);
              }
            }).then(function (c) {
              d == r.current && (d && (d.locals = c, e.copy(d.params, b)), a.$broadcast('$routeChangeSuccess', d, m));
            }, function (c) {
              d == r.current && a.$broadcast('$routeChangeError', d, m, c);
            });
        }
        function p() {
          var a, b;
          e.forEach(k, function (f, k) {
            var q;
            if (q = !b) {
              var g = c.path();
              q = f.keys;
              var l = {};
              if (f.regexp)
                if (g = f.regexp.exec(g)) {
                  for (var h = 1, p = g.length; h < p; ++h) {
                    var n = q[h - 1], r = 'string' == typeof g[h] ? decodeURIComponent(g[h]) : g[h];
                    n && r && (l[n.name] = r);
                  }
                  q = l;
                } else
                  q = null;
              else
                q = null;
              q = a = q;
            }
            q && (b = s(f, {
              params: e.extend({}, c.search(), a),
              pathParams: a
            }), b.$$route = f);
          });
          return b || k[null] && s(k[null], {
            params: {},
            pathParams: {}
          });
        }
        function t(a, c) {
          var b = [];
          e.forEach((a || '').split(':'), function (a, d) {
            if (0 === d)
              b.push(a);
            else {
              var e = a.match(/(\w+)(.*)/), f = e[1];
              b.push(c[f]);
              b.push(e[2] || '');
              delete c[f];
            }
          });
          return b.join('');
        }
        var u = !1, r = {
            routes: k,
            reload: function () {
              u = !0;
              a.$evalAsync(l);
            }
          };
        a.$on('$locationChangeSuccess', l);
        return r;
      }
    ];
  });
  n.provider('$routeParams', function () {
    this.$get = function () {
      return {};
    };
  });
  n.directive('ngView', x);
  n.directive('ngView', z);
  x.$inject = [
    '$route',
    '$anchorScroll',
    '$animate'
  ];
  z.$inject = [
    '$compile',
    '$controller',
    '$route'
  ];
}(window, window.angular));
//# sourceMappingURL=angular-route.min.js.map
;
/**
 * Created by sefi on 5/13/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */
'use strict';
angular.module('jsBlackBelt', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angularLocalStorage',
  'ui.bootstrap',
  'pascalprecht.translate',
  'jsBlackBelt.Constants',
  'jsBlackBelt.Model',
  'jsBlackBelt.Filters',
  'jsBlackBelt.Services',
  'jsBlackBelt.Controllers',
  'jsBlackBelt.Directives'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'scripts/main.html',
      controller: 'MainCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
angular.module('jsBlackBelt.Services', [
  'ngResource',
  'angularLocalStorage'
]);
angular.module('jsBlackBelt.Directives', [
  'ui.bootstrap',
  'pascalprecht.translate'
]);
angular.module('jsBlackBelt.Controllers', ['pascalprecht.translate']);
angular.module('jsBlackBelt.Constants', []);
angular.module('jsBlackBelt.Model', []);
angular.module('jsBlackBelt.Filters', []);
;
/**
 * Created by sefi on 5/13/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */
'use strict';
angular.module('jsBlackBelt').controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
;
/**
 * Created by sefi on 4/22/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */
'use strict';
angular.module('jsBlackBelt.Directives').directive('jsbbFallbackSrc', [function () {
    /**
         * This directive serves as a fallback in case the image source wasn't found.
         * It is supposed to be placed as an attribute in an <img> tag.
         *
         * You can optionally supply a reference to a fallback image.
         * If not supplied, 'images/error.jpg' will be used.
         */
    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        var fallback = attrs.jsbbFallbackSrc;
        if (fallback === '') {
          fallback = 'images/error.jpg';
        }
        element.bind('error', function () {
          if (angular.isUndefined($scope.fallbackCount)) {
            $scope.fallbackCount = 0;
          }
          if ($scope.fallbackCount >= 1) {
            element.unbind('error');
          } else {
            element.attr('src', fallback);
            $scope.fallbackCount++;
          }
        });
      }
    };
  }]).directive('jsbbPopOverDialog', [
  '$log',
  '$document',
  function ($log, $window) {
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      templateUrl: 'scripts/common/partials/popOverDialog.tpl.html',
      scope: {
        dialogTitle: '@',
        saveCallback: '&',
        cancelCallback: '&',
        dialogStyle: '@',
        x: '@',
        y: '@',
        position: '@',
        showTitle: '@',
        showButtons: '@',
        readOnly: '='
      },
      link: function ($scope, element, attrs) {
        //remove auto center of the dialog
        var parentElem = element.parent().parent();
        parentElem.css('padding', '0px');
        var marginLeft = ($window.width() - parentElem.width()) / 2;
        //var maringLeft = parseInt(parentElem.css('margin-left'),10);
        // set default to left if position is not defined
        var position = $scope.position || 'left';
        var dialog = element;
        var top = parseInt($scope.y, 10);
        var left = parseInt($scope.x, 10) - marginLeft;
        if (angular.isUndefined($scope.showTitle) || $scope.showTitle === 'true') {
          $scope.shouldShowTitle = true;
        } else {
          $scope.shouldShowTitle = false;
        }
        if (angular.isUndefined($scope.showButtons) || $scope.showButtons === 'true') {
          $scope.shouldShowButtons = true;
        } else {
          $scope.shouldShowButtons = false;
        }
        var setDialogPos = function () {
          switch (position) {
          case 'left':
            dialog.css('top', Math.round(top - dialog.height() / 2) + 'px');
            dialog.css('left', left - dialog.width() + 'px');
            break;
          case 'right':
            dialog.css('top', Math.round(top - dialog.height() / 2) + 'px');
            dialog.css('left', left + 'px');
            break;
          case 'top':
            dialog.css('top', top - dialog.height() + 'px');
            dialog.css('left', Math.round(left - dialog.width() / 2) + 'px');
            break;
          case 'bottom':
            dialog.css('top', top + 'px');
            dialog.css('left', Math.round(left - dialog.width() / 2) + 'px');
            break;
          case 'absolute':
            dialog.css('top', top + 'px');
            dialog.css('left', left + 'px');
            break;
          default:
            break;
          }
        };
        setDialogPos();
        $scope.$watch('assignments', function (value) {
          setDialogPos();
          dialog.focus();
          var dialogZ = angular.element('.modal-backdrop').css('z-index');
          angular.element('.modal-backdrop').css('z-index', +dialogZ + 10);
        });
        $scope.onCancel = function () {
          try {
            $scope.cancelCallback();
          } catch (e) {
            $log.error(e);
          }
        };
        $scope.onSave = function () {
          try {
            $scope.saveCallback();
          } catch (e) {
            $log.error(e);
          }
        };
      }
    };
  }
]);
;
/**
 * Created by sefi on 5/21/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */
'use strict';
angular.module('jsBlackBelt.Constants').value('InterestContexts', {
  sampleView1: [
    'type1',
    'type2'
  ],
  sampleView2: ['type3']
}).value('InterestTypes', {
  TYPE1: 'type1',
  TYPE2: 'type2',
  TYPE3: 'type3'
});
;
/**
 * Created by sefi on 5/19/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */
'use strict';
angular.module('jsBlackBelt.Model').factory('Interest', [function () {
    /**
         * Constructor, with class name
         */
    function Interest(updateType, handler) {
      this.updateType = updateType;
      this.handler = handler;
    }
    Interest.prototype.updateType = undefined;
    Interest.prototype.handler = undefined;
    return Interest;
  }]);
;
/**
 * Created by sefi on 5/14/14.
 *
 * related post:
 * http://ajsblackbelt.wordpress.com/2014/05/27/local-storage-cache-service/
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */
'use strict';
angular.module('jsBlackBelt.Services').factory('CacheSrv', [
  'storage',
  '$log',
  function (storage, $log) {
    var api = {};
    // the api map
    // create a setter function for the key
    var createSetter = function (key) {
        return function (value) {
          // if value are valid
          if (angular.isDefined(value)) {
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
      createGetter = function (key) {
        return function () {
          // try to get the value for the key from the storage.
          var value = storage.get(key);
          if (value === null) {
            // if there is no value, override it to undefined and store it.
            value = undefined;
            var setter = api[key].setter;
            setter(value);
          }
          return value;
        };
      }, createAPIForKey = function (key) {
        var setter = createSetter(key);
        var getter = createGetter(key);
        api[key] = {
          setter: setter,
          getter: getter
        };
      },
      // check if key is valid and lazily create API
      verifyKey = function (key) {
        if (!key || angular.isUndefined(key)) {
          throw new Error('key [' + key + '] is not valid');
        }
        if (!api.hasOwnProperty(key)) {
          createAPIForKey(key);
        }
      };
    return {
      getSetter: function (key) {
        verifyKey(key);
        return api[key].setter;
      },
      getGetter: function (key) {
        verifyKey(key);
        return api[key].getter;
      }
    };
  }
]);
;
/**
 * Created by sefi on 5/19/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */
'use strict';
angular.module('jsBlackBelt.Services').factory('InterestsDelegatorSrv', [function () {
    // This is a registry of updateTypes, each key points to an array of handlers
    var registry = {};
    var service = {
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
        registerInterests: function (interests) {
          angular.forEach(interests, function (interest) {
            service.registerInterest(interest);
          });
        },
        unregisterInterest: function (interest) {
          var typeRegistry = registry[interest.updateType], handler;
          for (var i = 0; i < typeRegistry.length; i++) {
            handler = typeRegistry[i];
            if (handler === interest.handler) {
              typeRegistry.splice(i, 1);
              break;
            }
          }
        },
        unregisterInterests: function (interests) {
          angular.forEach(interests, function (interest) {
            service.unregisterInterest(interest);
          });
        },
        notifyRegistrars: function (updateType, data) {
          var typeRegistry = registry[updateType];
          angular.forEach(typeRegistry, function (handler) {
            handler(data);
          });
        }
      };
    return service;
  }]);
;
/**
 * Created by sefi on 5/13/14.
 *
 * related post:
 * http://ajsblackbelt.wordpress.com/2014/05/13/timing-service/
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */
'use strict';
angular.module('jsBlackBelt.Services').factory('TimingSrv', [
  '$interval',
  function ($interval) {
    var registrants = {}, internalInterval = 1000;
    var start = function () {
      $interval(service.tick, internalInterval);
      service.tick();
    };
    var service = {
        register: function (id, tickHandler, interval, delay) {
          registrants[id] = {
            tick: tickHandler,
            interval: interval,
            delay: delay
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
  }
]);
;
/**
 * Created by sefi on 6/5/14.
 */
'use strict';
angular.module('jsBlackBelt.Services').service('ImageSrv', [function () {
    return {
      getImageUrlFromId: function (id) {
        return 'images/portfolio/' + id + '.jpg';
      },
      getThumbUrlFromId: function (id) {
        return 'images/portfolio/' + id + '_thumb.jpg';
      }
    };
  }]);
;
/**
 * Created by sefi on 6/3/14.
 *
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */
'use strict';
angular.module('jsBlackBelt.Directives').directive('jsbbAdvancedImg', [
  '$state',
  '$timeout',
  'ImageSrv',
  function ($state, $timeout, imageSrv) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'scripts/widgets/advancedImg/advancedImg.tpl.html',
      scope: {
        imageId: '@',
        fallback: '@',
        imageTitle: '@'
      },
      link: function ($scope, element, attrs) {
        // add random delay for extra dynamic UI.
        var delay = Math.floor(Math.random() * 1000);
        $timeout(function () {
          $scope.imageSrc = imageSrv.getThumbUrlFromId($scope.imageId);
        }, delay);
        $scope.openImage = function () {
          $state.go('image', { imageId: $scope.imageId });
        };
      }
    };
  }
]);;angular.module('jsBlackBelt', [
  'scripts/common/partials/popOverDialog.tpl.html',
  'scripts/main.html',
  'scripts/widgets/advancedImg/advancedImg.tpl.html'
]);
angular.module('scripts/common/partials/popOverDialog.tpl.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('scripts/common/partials/popOverDialog.tpl.html', '<div class="popOverDialog" id="{{popupId}}" ng-class="dialogStyle" tabindex="0"><h3 ng-if="shouldShowTitle">{{ dialogTitle }}</h3><div ng-transclude></div><div class="btns-area" ng-if="shouldShowButtons"><button ng-show="!readOnly" ng-click="onSave()">Save</button> <a ng-click="onCancel()" class="cancel">Cancel</a></div></div>');
  }
]);
angular.module('scripts/main.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('scripts/main.html', '<div jsbb-advanced-img class="thumb" image-src="images/concerts/20140531-SEFI1305_thumb.jpg" image-title="Marina"></div>');
  }
]);
angular.module('scripts/widgets/advancedImg/advancedImg.tpl.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('scripts/widgets/advancedImg/advancedImg.tpl.html', '<div class="advancedImg bgColor thumb" ng-click="openImage()" title="{{imageTitle}}"><img ng-src="{{imageSrc}}" jsbb-fallback-src="{{fallback}}"> </div>');
  }
]);