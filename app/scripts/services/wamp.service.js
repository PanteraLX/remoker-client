'use strict';

/**
 * @ngdoc service
 * @name remoker.wamp
 * @description
 * # wamp
 * Service in remoker.
 */
angular.module('remoker')
    .service('$wamp', function($rootScope, $location, story, room, rpc, parameters) {

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
                handlePublish(payload);
            });
        };

        /**
         * Subscribes to a channel
         */
        this.publish = function(message) {
            wampSession.publish("remoker/" + room.short_id, message);
        };

        /**
         *
         * @param payload
         */
        var handlePublish = function(payload) {
            if (typeof payload.story !== 'undefined') {
                $rootScope.$broadcast('newStory', payload.story);
            } else if (typeof payload.estimation !== 'undefined') {
                $rootScope.$broadcast('newEstimation', payload.estimation);
            } else if (payload.resolution) {
                $rootScope.$broadcast('resolution');
            } else if (payload.reestimation) {
                $rootScope.$broadcast('reestimation');
            }
        };

    });
