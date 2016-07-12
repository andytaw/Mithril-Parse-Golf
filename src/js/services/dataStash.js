/// <reference path="../init.js" />

(function(app){    

    // namespace
    app.services = app.services || {};

    var _stash = {}

    // services
    app.services.dataStash = {

        init: function(){
            _stash = {};
        },

        stash: function(name, obj) {
            _stash[name] = obj
        },

        get: function(name){
            return _stash[name];
        }

    };
    
})(__ || {});