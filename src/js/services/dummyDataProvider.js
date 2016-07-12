/// <reference path="../init.js" />
/// <reference path="../models/cource.js" />
/// <reference path="../models/player.js" />
/// <reference path="../models/hole.js" />
/// <reference path="../models/holeScore.js" />
/// <reference path="../models/round.js" />

(function(app){

    // namespace
    app.services = app.services || {};

    // services
    app.services.dummyDataProvider = function(){

        var allPlayers = [
            new app.models.player('Andy', 22),
            new app.models.player('Kevin', 28),
            new app.models.player('Rob', 20)
        ]

        var allHoles = [
            new app.models.hole(1, 4, 4),
            new app.models.hole(2, 3, 1),
            new app.models.hole(3, 5, 2),
            new app.models.hole(4, 4, 3),
        ]

        var allCourses = [
            new app.models.course('Southwick', allHoles)
        ];

        var allRounds = [
            new app.models.round(allCourses[0], new Date(2016, 8, 10), allPlayers, [])
        ];

        this.getRound = function(){

            return allRounds[0];

        }

    }
    
})(__ || {});