'use strict';

/**
 * @ngdoc service
 * @name remoker.parameters
 * @description
 * # parameters
 * Value in remoker
 */
angular.module('remoker')
    .service('parameters', function(estimation, story, room, user) {
        var parameters = {};
        parameters.user = {};
        parameters.estimation = {};
        parameters.story = {};
        parameters.room = {};

        this.getParameters = function() {
            parameters.user = user;
            parameters.estimation = estimation;
            parameters.story = story;
            parameters.room = room;
            return JSON.stringify(parameters);
        };
    });
