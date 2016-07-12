/// <reference path="../init.js" />

(function(app){

    // namespace
    app.models = app.models || {};

    // model
    app.models.player = function(name, handicap){

        var self = this;

        self.name = name;
        self.handicap = handicap;

        self.updateHandicap = function(handicap){
            self.handicap = handicap;
        }
        
    }
    
})(__ || {});