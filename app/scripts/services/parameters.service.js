'use strict';

/**
 * @ngdoc service
 * @name remoker.parameters
 * @description
 * # parameters
 * Service in remoker
 */
angular.module('remoker')
    .service('parameters', function(estimation, story, room, user) {

        // Assignment
        var parameters = {};
        parameters.user = {};
        parameters.estimation = {};
        parameters.story = {};
        parameters.room = {};

        /**
         * Creates a JSON-string parameter
         *
         * @return string
         */
        this.getParameters = function() {
            parameters.user = user;
            parameters.estimation = estimation;
            parameters.story = story;
            parameters.room = room;
            return JSON.stringify(parameters);
        };
    });
