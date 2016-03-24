'use strict';

/**
 * @ngdoc service
 * @name remoker.wamp
 * @description
 * # wamp
 * WAMP service for handling the WAMP session and Pub/Sub messaging
 */
angular.module('remoker')
    .service('$wamp', function($rootScope, $location, story, room) {

        var wampSession;

        /**
         * Getter and setter for the WAMP session
         *
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
         * Subscribes to the remoker channel.
         * The channel is identified with the ID of the room object
         *
         * Form now on, all send events in that channel will call the anonymous callback function.
         * That callback function itself will call a method to diverse between different payloads.
         */
        this.subscribe = function(id) {
            wampSession.subscribe("remoker/" + id, function(uri, payload) {
                handlePublish(payload);
            });
        };

        /**
         * Published an event/message to the remoker channel
         */
        this.publish = function(message) {
            wampSession.publish("remoker/" + room.id, message);
        };

        /**
         * There are six possible publish events.
         *
         * This handler sends Angular broadcasts, which will be registered by different broadcast listeners
         *
         * @param payload
         */
        var handlePublish = function(payload) {
            if (typeof payload.story !== 'undefined') {
                $rootScope.$broadcast('newStory', payload.story);
            } else if (typeof payload.estimation !== 'undefined') {
                $rootScope.$broadcast('newEstimation', payload.estimation);
            } else if (typeof payload.user !== 'undefined') {
                    $rootScope.$broadcast('newDeveloper', payload.user);
            } else if (typeof payload.hasEstimation !== 'undefined') {
                $rootScope.$broadcast('hasEstimation', payload.hasEstimation);
            } else if (payload.resolution) {
                $rootScope.$broadcast('resolution');
            } else if (payload.reestimation) {
                $rootScope.$broadcast('reestimation');
            }
        };

    });
