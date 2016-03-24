'use strict';

/**
 * @ngdoc service
 * @name remoker.rpc
 * @description
 * # rpc
 * Constants for all RP-calls url
 */
angular.module('remoker').constant('rpc', {
    createUser: "userRPC/create_user_action",
    getUser: "userRPC/get_user_action",

    createRoom: "roomRPC/create_room_action",
    getRoom: "roomRPC/get_room_action",
    addDeveloper: "roomRPC/add_developer_action",

    createStory: "storyRPC/create_story_action",
    getStory: "storyRPC/get_story_action",
    setResult: "storyRPC/set_result_action",
    deleteEstimations: "storyRPC/delete_estimations_action",

    createEstimation: "estimationRPC/create_estimation_action",
    getEstimation: "estimationRPC/get_estimation_action"
});