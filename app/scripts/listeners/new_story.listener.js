'use strict';

/**
 * @ngdoc service
 * @name remoker.onNewStory
 * @description
 * # onNewStory
 * Service in remoker
 */
angular.module('remoker')
    .service('onNewStory', function($rootScope, $location, $wamp, story, user) {

        /**
         * The current modal should be hidden
         *
         * @return void
         */
        var hideModal = function () {
            angular.element('#storyModal').modal('hide');
            angular.element('body').removeClass('modal-open');
            angular.element('.modal-backdrop').remove();
        };

        /**
         * The newStory event is fired, when the master has created a new Story.
         *
         * @return void
         */
        $rootScope.$on('newStory', function (event, newStory) {
            hideModal();
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
