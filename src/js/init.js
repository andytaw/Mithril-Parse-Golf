// application namespace
var __ = {};

// sub namespaces
__.model = {};
__.framework = {};

// framework
(function(fw, app){

    fw.appContainer = document.getElementById('appContainer');

    fw.startApp = function(){
        
        // use app.services as a IOC container
        // configure services to us, e.g. switch between real and dummy data providers
        var registerServices = function(){
            var s = app.serviceContainer = {};
            //s.dataProvider = new app.services.dummyDataProvider();
            s.dataProvider = new app.services.parseDataProvider();
        }

        var mountApp = function(){
            m.mount(appContainer, app.components.round);
        }

        registerServices();
        fw.refresh();

    }

    fw.refresh = function(){

        m.startComputation();

        var renderRound = function(data){
            app.model.round = data;
            m.mount(fw.appContainer, app.components.round);
            m.endComputation();
        }

        app.serviceContainer.dataProvider.getRound(renderRound);

    }

})(__.framework, __);