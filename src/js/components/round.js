/// <reference path="../init.js" />
/// <reference path="../controllers/round.js" />
/// <reference path="../views/round.js" />

(function(app){

    // namespace
    app.components = app.components || {};

    // component
    app.components.round = {
        controller: app.controllers.round,
        view: app.views.round
    }
    
})(__ || {});