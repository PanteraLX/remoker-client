'use strict';

/**
 * @ngdoc service
 * @name remoker.listener
 * @description
 * # listener
 * Service in remoker
 */
angular.module('remoker')
    .service('onNewDeveloper', function($rootScope, room) {
        $rootScope.$on('newDeveloper', function(event, developer) {
            var result = room.developers.filter(function(e){ return e.short_id === developer.short_id; });
            room.developers.push(developer);
            $rootScope.$apply();
        });

    });
