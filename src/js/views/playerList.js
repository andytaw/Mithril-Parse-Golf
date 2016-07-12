/// <reference path="../init.js" />
/// <reference path="player.js" />

(function(app){

    // namespace
    app.views = app.views || {};

    // view 
    app.views.playerList = function(players) {
        return m('div', players.map(function(player){ 
            return app.views.player(player); 
        }));
    }
    
})(__ || {});