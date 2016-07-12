/// <reference path="../init.js" />

(function(app){

    // namespace
    app.models = app.models || {};

    // model
    app.models.player = function(name, handicap){

        this.name = name;
        this.handicap = handicap;
        
    }
    
})(__ || {});