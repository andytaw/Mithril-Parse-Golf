/// <reference path="../init.js" />

(function(app){

    // namespace
    app.models = app.models || {};

    // model
    app.models.course = function(name, holes){

        this.name = name;
        this.holes = holes || [];
        
    }
    
})(__ || {});