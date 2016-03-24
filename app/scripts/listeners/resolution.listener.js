'use strict';

/**
 * @ngdoc service
 * @name remoker.onResolution
 * @description
 * # onResolution
 * Service in remoker
 */
angular.module('remoker')
    .service('onResolution', function ($rootScope, $wamp, $location, parameters, rpc, story) {

        /**
         * The resolution event is fired, when the master wants to leave the overview view
         * and see the resulting estimation value of the story.
         *
         * Developer and master will load the Story object with the result out of the backend
         *
         * @return void
         */
        $rootScope.$on('resolution', function () {
            $wamp.getWampSession().call(rpc.getStory, parameters.getParameters())
                .then(
                    function (response) {
                        Object.assign(story, JSON.parse(response[0]));
                        $location.path('/result');
                        $rootScope.$apply();
                    },
                    function (exception) {
                        console.log(exception);
                    }
                );
        });
    });
