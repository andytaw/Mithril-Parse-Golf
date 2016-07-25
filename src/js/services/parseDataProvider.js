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

        Parse.initialize('4861A54E256245D99F1F1565D39AC9BE', '5961A54E256245D99F1F1565D39AC9BF');
        Parse.serverURL = 'https://atl-parse-server.herokuapp.com/';

        var parseObjects = {};

        var initObjects = function(scope){

            scope.Round = Parse.Object.extend('round', {

                toModelObject: function(){
                    var competition = this.get('competition');
                    var date = this.get('date');
                    var team = this.get('team');
                    var holeScores = this.get('holeScores');
                    return new app.models.round(competition, date, team, holeScores);
                }

            });

        };

        initObjects(parseObjects);

        this.getRound = function(callback){

            var query = new Parse.Query(parseObjects.Round);

            query.get('6uGG6NYMwR', {
                success: function(round) {
                    if (typeof(callback) === 'function') callback(round.toModelObject());
                },
                error: function(error) {
                    console.log(error);
                }
            });           
            

        };

    }
    
})(__ || {});