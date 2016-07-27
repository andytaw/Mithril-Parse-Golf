/// <reference path="../../bower_components/jquery/dist/jquery.min.js" />
/// <reference path="./init.js" />
/// <reference path="./services/dummyDataProvider.js" />
/// <reference path="./components/round.js" />

(function(app){

    // use app.services as a IOC container
    // configure services to us, e.g. switch between real and dummy data providers
    var registerServices = function(){
        var s = app.serviceContainer = {};
        s.dataProvider = new app.services.dummyDataProvider();
        //s.dataProvider = new app.services.parseDataProvider();
    }

    var mountApp = function(){
        m.mount(document.getElementById('appContainer'), app.components.round);
    }

    var startup = function(){
        registerServices();
        mountApp();
    }

    $(startup);

})(__ || {});