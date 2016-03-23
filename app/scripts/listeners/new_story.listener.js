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
            angular.element('#storyModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            console.log(story.hasEstimation);
            if (user.is_master) {
                $location.path('/overview');
            } else {
                Object.assign(story, newStory);
                story.hasEstimation = {};
                $location.path('/estimation');
            }
            $rootScope.$apply();
        });
    });
