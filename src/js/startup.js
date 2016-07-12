/// <reference path="../../bower_components/jquery/dist/jquery.min.js" />
/// <reference path="components/round.js" />

(function(app){

    var initStash = function(){
        var dp = new app.services.dummyDataProvider();
        app.services.dataStash.init();
        app.services.dataStash.stash('round', dp.getRound());
    }

    var mountApp = function(){
        m.mount(document.body, app.components.round);
    }

    var startup = function(){
        initStash();
        mountApp();
    }

    $(startup);

})(__);