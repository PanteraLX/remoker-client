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

        this.room = function() {
            $wamp.getWampSession().call(rpc.getRoom, parameters.getParameters())
                .then(
                    function(response) {
                        Object.assign(room, JSON.parse(response[0]));
                        $wamp.subscribe(room.short_id);
                        $wamp.publish({user: user});
                    },
                    function(exception) {
                        console.log(exception);
                        $scope.creationErrorMessage = exception.desc;
                        $scope.creationError = true;
                        $scope.$apply();
                    }
                );
        }
    });
