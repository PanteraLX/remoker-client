'use strict';

/**
 * @ngdoc service
 * @name remoker.wamp
 * @description
 * # wamp
 * Constant in remoker.
 */
angular.module('remoker').constant('wamp', {
    baseUrl: "ws://127.0.0.1:1337",
    roomChannelBaseUrl: "room/"
});