'use strict';

/**
 * @ngdoc service
 * @name remoker.wamp
 * @description
 * # wamp
 * Service in remoker.
 */
angular.module('remoker')
    .service('$wamp', function() {

        var wampSession;

        /**
         * @param session
         * @returns {*}
         */
        this.setWampSession = function(session) {
            wampSession = session;
            return wampSession;
        };

        /**
         * @returns {*}
         */
        this.getWampSession = function() {
            return wampSession;
        };

        /**
         * Subscribes to a channel
         */
        this.subscribe = function(shortId) {
            wampSession.subscribe("remoker/" + shortId, function(uri, payload) {
                console.log(payload);
            });
        };

    });
