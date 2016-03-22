'use strict';

/**
 * @ngdoc service
 * @name remoker.onNewStory
 * @description
 * # onNewStory
 * Service in remoker
 */
angular.module('remoker')
    .service('onNewStory', function($rootScope, $location, story, user) {

        $rootScope.$on('newStory', function(event, newStory) {
            if (user.is_master) {
                $location.path('/overview');
            } else {
                Object.assign(story, newStory);
                $location.path('/estimation');
            }
            $rootScope.$apply();
        });
    });
