'use strict';

/**
 * @ngdoc service
 * @name remoker.joinroom
 * @description
 * # joinroom
 * Service in remoker
 */
angular.module('remoker')
    .service('join', function($rootScope, $location, $wamp, rpc, user, room, story, estimation, parameters, onNewStory) {

        this.story = function() {
            console.log('helloooooo');
            if (0 === room.stories.length) {
                angular.element('#storyModal').modal('show');
            } else {
                Object.assign(story, room.stories[room.stories.length - 1]);
                story.hasEstimation = {};
                if((typeof story.result === 'undefined') || (story.result === -1)) {
                    $location.path('/estimation');
                } else {
                    $location.path('/result');
                }
                $rootScope.$apply();
            }
        };

        this.room = function() {
            $wamp.getWampSession().call(rpc.getRoom, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(room, JSON.parse(response[0]));
                    },
                    function(exception) {
                        console.log(exception);
                        $scope.creationErrorMessage = exception.desc;
                        $scope.creationError = true;
                        $scope.$apply();
                    }
                );
        };
    });
