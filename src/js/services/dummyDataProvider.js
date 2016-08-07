/// <reference path="../init.js" />
/// <reference path="../models/course.js" />
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
            new app.models.player('1', 'Andy', 22),
            new app.models.player('2', 'Kevin', 28),
            new app.models.player('3', 'Rob', 20)
        ];

        var allHoles = [
            new app.models.hole('1', 1, 4, 4),
            new app.models.hole('2', 2, 3, 1),
            new app.models.hole('3', 3, 5, 2),
            new app.models.hole('4', 4, 4, 3),
            new app.models.hole('5', 5, 4, 8),
            new app.models.hole('6', 6, 3, 7),
            new app.models.hole('7', 7, 5, 6),
            new app.models.hole('8', 8, 4, 5),
        ];

        var allCourses = [
            new app.models.course('Southwick', allHoles)
        ];

        var allHoleScores = [
            new app.models.holeScore(allHoles[0], allPlayers[0], 5),
            new app.models.holeScore(allHoles[0], allPlayers[1], 4),
            new app.models.holeScore(allHoles[0], allPlayers[2], 6),
            new app.models.holeScore(allHoles[1], allPlayers[0], 3),
            new app.models.holeScore(allHoles[1], allPlayers[1], 7),
            new app.models.holeScore(allHoles[1], allPlayers[2], 4)
        ]

        var allRounds = [
            new app.models.round({course: allCourses[0]}, new Date(2016, 8, 10), {players: allPlayers}, allHoleScores)
        ];

        this.getRound = function(callback){
            var data = allRounds[0];
            if (typeof(callback) === 'function') callback(data);
        }

    }
    
})(__ || {});