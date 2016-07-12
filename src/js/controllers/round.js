/// <reference path="../init.js" />
/// <reference path="../services/dataStash.js" />

(function(app){

    // namespace
    app.controllers = app.controllers || {};

    // controllers
    app.controllers.round = function(){

        return {

            round: app.services.dataStash.get('round'),

            eventHandlers: {

                updateHandicap: function(player, handicap){
                    player.updateHandicap(handicap);
                }

            }
        };
    }
    
})(__ || {});