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

        registerServices();
    
        m.route(fw.appContainer, "/", {
            "/": {controller: fw.refresh},
            "/round/:roundId": {controller: fw.refresh}
        });
        
        //fw.refresh();

    }

    fw.refresh = function(roundId){
        
        roundId = roundId || m.route.param().roundId || '6uGG6NYMwR';
        
        $('body').removeClass('app-ready');
        m.render(fw.appContainer, m('div.loader'));

        m.startComputation();

        var renderRound = function(data){
            $('body').addClass('app-ready');
            app.model.round = data;
            m.mount(fw.appContainer, app.components.round);
            m.endComputation();
        }

        app.serviceContainer.dataProvider.getRound(roundId, renderRound);

    }

})(__.framework, __);