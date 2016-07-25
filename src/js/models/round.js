/// <reference path="../init.js" />

(function(app){

    // namespace
    app.models = app.models || {};

    // model
    app.models.round = function(competition, date, team, holeScores){

        this.competition = competition;
        this.date = date;
        this.team = team;
        this.holeScores = holeScores;
        
    }
    
})(__ || {});