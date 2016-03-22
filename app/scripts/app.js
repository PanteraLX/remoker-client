'use strict';

/**
 * @ngdoc overview
 * @name remoker
 * @description
 * # remoker
 *
 * Main module of the application.
 */
angular
    .module('remoker', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'pascalprecht.translate'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/user', {
                templateUrl: 'views/user.view.html',
                controller: 'UserCtrl',
                controllerAs: 'user'
            })
            .when('/room', {
                templateUrl: 'views/room.view.html',
                controller: 'RoomCtrl',
                controllerAs: 'room'
            })
            .when('/story', {
                templateUrl: 'views/story.view.html',
                controller: 'StoryCtrl',
                controllerAs: 'story'
            })
            .when('/estimation', {
                templateUrl: 'views/estimation.view.html',
                controller: 'EstimationCtrl',
                controllerAs: 'estimation'
            })
            .when('/overview', {
                templateUrl: 'views/overview.view.html',
                controller: 'OverviewCtrl',
                controllerAs: 'overview'
            })
            .when('/result', {
                templateUrl: 'views/result.view.html',
                controller: 'ResultCtrl',
                controllerAs: 'result'
            })
            .when('/room/:roomId', {
                templateUrl: 'views/user.view.html',
                controller: 'UserCtrl',
                controllerAs: 'user'
            })
            .otherwise({
                redirectTo: '/user'
            });
    }).run(function($rootScope, pubsub, $wamp) {

        /**
         * On application start, a new WAMP connection will be established
         */
        var wamp = WS.connect(pubsub.baseUrl);
        $rootScope.connectionError = false;

        wamp.on("socket/connect", function(session) {
            $rootScope.connectionError = false;
            $rootScope.$apply();
            $wamp.setWampSession(session);
            console.log(session);
        });

        /**
         * If the connection between client and and server breaks down, an error message is displayed.
         * Since AutobahnJS tries to connect to the server all 5 seconds,
         * the message will fade away if the connection can be reestablished.
         */
        wamp.on("socket/disconnect", function(error) {
            $rootScope.connectionError = true;
            $rootScope.connectionErrorMessage = error.reason;
            $rootScope.$apply();
            console.log($rootScope.connectionErrorMessage);
        })
    }).config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', {
            'create_story_desc': 'Here you can define the name of the next story you want to estimate. The name can be the identifier of the story out of Jira, Redmine etc.'
        });

        $translateProvider.translations('de', {
            'user': 'Benutzer',
            'room': 'Raum',
            'story': 'Story',
            'estimation': 'Schätzung',
            'result': 'Resultat',
            'user_name': 'Benutzername',
            'room_name': 'Raumname',
            'story_name': 'Storyname',
            'room_id': 'Raum-ID',
            'room_info': 'Rauminfo',
            'room_url': 'Raum-URL',
            'overview': 'Übersicht',
            'estimation_schema': 'Schätzschema',
            'estimation_value': 'Schätzwert',
            'developer_name': 'Entwicklername',
            'estimation_time': 'Geschätzt am',
            'remoker_intro': 'Hier kommt eine ganz awesome Beschriebung von Remoker',
            'create_user_heading': 'Neuen Benutzer erstellen',
            'create_user_desc': 'Bitte geben Sie Ihren gewünschten Benutzernamen an. Wird das Feld nicht ausgefüllt, dann nehmen Sie anonym am Schätzraum teil.',
            'create_room_heading': 'Neuen Raum erstellen',
            'create_room_desc': 'Falls Sie der Scrum-Master Ihres Scrum-Teams sind, so können Sie hier einen neuen Schätzraum erstellen, indem Sie den gewünschten Raumnamen angeben',
            'create_room_schema_desc': 'Bitte wählen Sie eine Schätzmethode aus den vorgegebenen aus',
            'create_story_heading': 'Neue Story erstellen',
            'create_story_desc': 'Hier können Sie den Namen der nächsten zu schätzenden Story definieren. Der Name kann die ID aus einem Projektmanagementtool wie Redmine oder Jira sein.',
            'create_estimation_heading': 'Neue Schätzung abgeben',
            'create_estimation_desc': 'Hier können Sie den gewünschten Schätzwert auswählen.',
            'join_room_heading': 'Bestehendem Raum beitreten',
            'join_room_desc': 'Wenn sie ein reguläres Mitglied Ihres Scrum_teams sind und Ihr Scrum-Master bereits einen Schätzraum erstellt hat, können Sie hier mit Hilfe der ID des Raumes teilnehmen.',
            'create_user_button': 'Benutzer erstellen',
            'create_room_button': 'Raum erstellen',
            'create_story_button': 'Story erstellen',
            'create_estimation_button': 'Schätzung abgeben',
            'resolve_story_button': 'Schätzungen auswerten',
            'reestimate_button': 'Story erneut schätzen',
            'new_story_button': 'Neue Story erfassen',
            'join_room_button': 'Raum beitreten',
            'invalid_name': 'Eingegebener Name ist nicht gültig!',
            'invalid_identifier': 'Die eingegebene ID ist nicht gültig!',
            'missing_roomname': 'Bitte geben Sie einen Raumnamen an',
            'missing_roomid': 'Bitte geben Sie eine gültige Raum-ID an',
            'missing_schema': 'Bitte geben Sie ein Schätzschema an',
            'missing_storyname': 'Bitte geben Sie einen Storynamen an',
            'missing_estimationvalue': 'Bitte wählen Sie einen Schätzwert',
            'name_spec': 'max. 20 alphanumerische Zeichen oder [/-]',
            'id_spec': '6 alphanumerische Zeichen',

        });

        $translateProvider.preferredLanguage('de');
    }]);

