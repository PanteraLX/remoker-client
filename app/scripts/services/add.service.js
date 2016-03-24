'use strict';

/**
 * @ngdoc service
 * @name remoker.add
 * @description
 * # add
 * This service is called to add Developer to the Room object
 */
angular.module('remoker')
    .service('add', function($rootScope, $location, $wamp, rpc, user, room, story, join, parameters, onNewStory) {

        /**
         * This method adds a Developer to the Room object via a RPC
         *
         * @return void
         */
        this.developer = function() {
            $wamp.getWampSession().call(rpc.addDeveloper, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(room, JSON.parse(response[0]));
                        $wamp.subscribe(room.id);
                        $wamp.publish({user: user});
                        join.story();
                    },
                    function(exception) {
                        console.log(exception);
                    }
                );
        };
    });
