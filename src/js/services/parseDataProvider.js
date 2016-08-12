/// <reference path="../init.js" />
/// <reference path="../models/course.js" />
/// <reference path="../models/player.js" />
/// <reference path="../models/hole.js" />
/// <reference path="../models/holeScore.js" />
/// <reference path="../models/round.js" />
/// <reference path="../../../bower_components/parse-sdk/lib/parse.min.js" />

(function(app){

    // namespace
    app.services = app.services || {};

    // services
    app.services.parseDataProvider = function(){

        var self = this;

        Parse.initialize('4861A54E256245D99F1F1565D39AC9BE', '5961A54E256245D99F1F1565D39AC9BF');
        Parse.serverURL = 'https://atl-parse-server.herokuapp.com/';

        var parseObjects = {};

        var errorHandler = function(data, error) {
            console.log(error);
            alert('An error occurred!\n\n' + error.message + '\n\n');
        }

        var initObjects = function(scope){

            scope.Round = Parse.Object.extend('round', {

                toModelObject: function(){
                    var competition = {competitionId: this.get('competition').id};
                    var team = {teamId: this.get('team').id};
                    var round = new app.models.round(competition, null, team, []);
                    round.roundId = this.id;
                    return round;
                }

            });

            scope.Player = Parse.Object.extend('player', {

                toModelObject: function(){
                    var name = this.get('name');
                    var handicap = this.get('handicap');
                    return new app.models.player(this.id, name, handicap);
                }

            });

            scope.Competition = Parse.Object.extend('competition', {

                toModelObject: function(){
                    var name = this.get('name');
                    var dateTime = this.get('dateTime');
                    var courseId = this.get('course').id;
                    var competition = {
                        name: name,
                        dateTime: dateTime,
                        course: {courseId: courseId}
                    };
                    competition.competitionId = this.id;
                    return competition;
                }

            });

            scope.Course = Parse.Object.extend('course', {

                toModelObject: function(){
                    var name = this.get('name');
                    var course = new app.models.course(name);
                    course.courseId = this.id;
                    return course;
                }

            });

            scope.Hole = Parse.Object.extend('hole', {

                toModelObject: function(){
                    var number = this.get('number');
                    var par = this.get('par');
                    var si = this.get('si');
                    return new app.models.hole(this.id, number, par, si);
                }

            });

            scope.HoleScore = Parse.Object.extend('holeScore', {

                toModelObject: function(players, holes){
                    var holeId = this.get('hole').id;
                    var playerId = this.get('player').id;
                    var competitionId = this.get('competition').id;
                    var score = this.get('score');
                    var hole = holes.filter(function(hole){
                        return hole.holeId === holeId;
                    })[0];
                    var player = players.filter(function(player){
                        return player.playerId === playerId;
                    })[0];
                    var holeScore = new app.models.holeScore(hole, player, score);
                    holeScore.holeId = holeId;
                    holeScore.playerId = playerId;
                    holeScore.competitionId = competitionId;
                    holeScore.holeScoreId = this.id;
                    return holeScore;
                }

            });

        };

        initObjects(parseObjects);

        self.getCompetition = function(competitionId, callback){

            var query = new Parse.Query(parseObjects.Competition);

            query.get(competitionId, {
                success: function(competition) {
                    if (typeof(callback) === 'function') {
                        callback(competition.toModelObject());
                    }
                },
                error: errorHandler
            });

        }

        self.getCourse = function(courseId, callback){

            var query = new Parse.Query(parseObjects.Course);

            query.get(courseId, {
                success: function(course) {
                    if (typeof(callback) === 'function') {
                        callback(course.toModelObject());
                    }
                },
                error: errorHandler
            });

        }

        self.getPlayersByTeamId = function(teamId, callback){

            var query = new Parse.Query(parseObjects.Player);
            var team = new (Parse.Object.extend('team'));
            team.id = teamId;
            query.equalTo('team', team);

            query.find({
                success: function(players) {
                    if (typeof(callback) === 'function') {
                        callback(players.map(function(player) { 
                            return player.toModelObject();
                        }));
                    }
                },
                error: errorHandler
            });

        }

        self.getHolesByCourseId = function(courseId, callback){

            var query = new Parse.Query(parseObjects.Hole);
            var course = new (Parse.Object.extend('course'));
            course.id = courseId;
            query.equalTo('course', course);

            query.find({
                success: function(holes) {
                    if (typeof(callback) === 'function') {
                        callback(holes.map(function(hole) { 
                            return hole.toModelObject();
                        }));
                    }
                },
                error: errorHandler
            });

        }

        self.addScoresToModel = function(model, callback){

            var query = new Parse.Query(parseObjects.HoleScore);
            var competition = new (Parse.Object.extend('competition'));
            competition.id = model.competition.competitionId;
            query.equalTo('competition', competition);

            query.find({
                success: function(holeScores) {
                    if (typeof(callback) === 'function') {
                        callback(holeScores.map(function(holeScore) {
                            var players = model.team.players;
                            var holes = model.competition.course.holes;
                            return holeScore.toModelObject(players, holes);
                        }));
                    }
                },
                error: errorHandler

            });

        }

        self.getRound = function(roundId, callback){

            var query = new Parse.Query(parseObjects.Round);

            query.get(roundId, {
                success: function(round) {
                    var modelObj = round.toModelObject();
                    var playersLoaded = false;
                    var holesLoaded = false;
                    var getScores = function(){
                        if (!playersLoaded || !holesLoaded) return;
                        self.addScoresToModel(modelObj, onScoresSuccess);
                    }
                    var execCallback = function(){
                        if (typeof(callback) === 'function') callback(modelObj);
                    };
                    var onPlayersSuccess = function(data){
                        modelObj.team.players = data;
                        playersLoaded = true;
                        getScores()
                    };
                    var onCompetitionSuccess = function(data){
                        modelObj.competition = data;
                        competitionLoaded = true;
                        self.getCourse(modelObj.competition.course.courseId, onCourseSuccess);
                    };
                    var onCourseSuccess = function(data){
                        modelObj.competition.course = data;
                        courseLoaded = true;
                        self.getHolesByCourseId(modelObj.competition.course.courseId, onHolesSuccess);
                    };
                    var onHolesSuccess = function(data){
                        modelObj.competition.course.holes = data;
                        holesLoaded = true;
                        getScores();
                    };
                    var onScoresSuccess = function(data){
                        modelObj.holeScores = data;
                        execCallback()
                    };
                    self.getPlayersByTeamId(modelObj.team.teamId, onPlayersSuccess);
                    self.getCompetition(modelObj.competition.competitionId, onCompetitionSuccess);
                },
                error: errorHandler
            }); 

        };

        self.updatePlayerHandicap = function(playerId, handicap){
            handicap = parseInt(handicap);
            var query = new Parse.Query(parseObjects.Player);
            query.get(playerId, {
                success: function(player) {
                    player.set('handicap', handicap);
                    player.save();
                },
                error: errorHandler
            });
        };

        self.updateHoleScore = function(round, holeScoreId, score, callback){
            score = parseInt(score);
            var query = new Parse.Query(parseObjects.HoleScore);
            query.get(holeScoreId, {
                success: function(holeScore) {
                    holeScore.set('score', score);
                    holeScore.save(null, {
                        success: function(savedHoleScore){
                            if (typeof(callback) === 'function') {
                                var players = round.team.players;
                                var holes = round.competition.course.holes;
                                var hs = savedHoleScore.toModelObject(players, holes);
                                callback(hs);
                            }
                        },
                        error: errorHandler
                    });
                },
                error: errorHandler
            });
        };

        self.addHoleScore = function(round, competitionId, holeId, playerId, score, callback){
            score = parseInt(score);
            var holeScore = new parseObjects.HoleScore;
            var competition = new parseObjects.Competition;
            var hole = new parseObjects.Hole;
            var player = new parseObjects.Player;
            competition.id = competitionId;
            hole.id = holeId;
            player.id = playerId;
            holeScore.set('competition', competition);
            holeScore.set('hole', hole);
            holeScore.set('player', player);
            holeScore.set('score', score);
            holeScore.save(null, {
                success: function(savedHoleScore){
                    if (typeof(callback) === 'function') {
                        var players = round.team.players;
                        var holes = round.competition.course.holes;
                        var hs = savedHoleScore.toModelObject(players, holes);
                        callback(hs);
                    }
                },
                error: errorHandler
            });
        };
        
        self.clearScoresForCompetition = function(competitionId, callback){
            var query = new Parse.Query(parseObjects.HoleScore);
            var competition = new (Parse.Object.extend('competition'));
            competition.id = competitionId;
            query.equalTo('competition', competition);
            query.find({
                success: function(holeScores) {
                    Parse.Object.destroyAll(holeScores)
                        .then(
                            function(success) {
                                if (typeof(callback) === 'function') callback();
                            },
                            function(error) {
                              errorHandler(null, error);
                            }
                        );
                },
                error: errorHandler
            });

        }

    }
    
})(__ || {});