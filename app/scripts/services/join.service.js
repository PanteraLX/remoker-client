'use strict';

/**
 * @ngdoc service
 * @name remoker.joinroom
 * @description
 * # joinroom
 * Service in remoker
 */
angular.module('remoker')
    .service('join', function($rootScope, $location, $wamp, user, room, story, estimation, onNewStory) {

        this.story = function() {
            if(0 === room.stories.length) {
                alert('waiting for estimation');
            } else {
                Object.assign(story, room.stories[room.stories.length - 1]);
                if((typeof story.result === 'undefined') || (story.result === -1)) {
                    $location.path('/estimation');
                } else {
                    $location.path('/result');
                }
                $rootScope.$apply();
            }
        };
    });
