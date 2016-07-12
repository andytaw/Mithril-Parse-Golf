/// <reference path="../init.js" />

(function(app){

    // namespace
    app.models = app.models || {};

    // model
    app.models.round = function(course, date, players, holeScores){

        this.course = course;
        this.date = date;
        this.players = players;
        this.holeScores = holeScores;
        
    }
    
})(__ || {});