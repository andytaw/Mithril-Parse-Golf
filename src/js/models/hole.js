/// <reference path="../init.js" />

(function(app){

    // namespace
    app.models = app.models || {};

    // model
    app.models.hole = function(holeId, number, par, si){

        this.holeId = holeId;
        this.number = number;
        this.par = par;
        this.si = si;
        
    }
    
})(__ || {});