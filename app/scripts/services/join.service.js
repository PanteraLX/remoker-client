'use strict';

/**
 * @ngdoc service
 * @name remoker.joinroom
 * @description
 * # joinroom
 * Is called to check for available stories
 */
angular.module('remoker')
    .service('join', function ($rootScope, $location, room, story, onNewStory) {

        /**
         * Checks if there is any story in the current room object.
         *
         * 1. If there is no story available, a model will pop up and the developer will be transferred
         *    when the master created a story
         *
         * 2. If there is a story available, the story object of the room will be extracted to a separate object
         *    and the developer will be transferred to a different location.
         *    If the developer joins the story after its resolution, he will be forwarded directly to the result view.
         *    Otherwise he will have the possibility to create an estimation in the estimation view
         *
         * @return void
         */
        this.story = function () {
            if (0 === room.stories.length) {
                angular.element('#storyModal').modal('show');
            } else {
                Object.assign(story, room.stories[room.stories.length - 1]);
                story.hasEstimation = {};
                if ((typeof story.result === 'undefined') || (story.result === -1)) {
                    $location.path('/estimation');
                } else {
                    $location.path('/result');
                }
                $rootScope.$apply();
            }
        };


    });
