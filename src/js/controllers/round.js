/// <reference path="../init.js" />
/// <reference path="../services/dummyDataProvider.js" />

(function(app){

    // namespace
    app.controllers = app.controllers || {};

    // controllers
    app.controllers.round = function(){
        var dp = new app.services.dummyDataProvider();
        var data = dp.getRound();
        return data;
    }
    
})(__ || {});