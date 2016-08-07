/// <reference path="../init.js" />

(function(app){

    // namespace
    app.models = app.models || {};

    // model
    app.models.player = function(playerId, name, handicap){

        var self = this;

        self.playerId = playerId;
        self.name = name;
        self.handicap = handicap;

        self.updateHandicap = function(handicap){
            self.handicap = handicap;
        }
        
    }
    
})(__ || {});