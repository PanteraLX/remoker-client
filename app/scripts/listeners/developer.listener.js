'use strict';

/**
 * @ngdoc service
 * @name remoker.listener
 * @description
 * # listener
 * Service in remoker
 */
angular.module('remoker')
    .service('onNewDeveloper', function ($rootScope, room) {

        /**
         * The newDeveloper event is fired when a new developer joined the room
         *
         * @return void
         */
        $rootScope.$on('newDeveloper', function (event, developer) {
            room.developers.push(developer);
            $rootScope.$apply();
        });
    });
