/// <reference path="../init.js" />

(function(app){

    // namespace
    app.views = app.views || {};

    // view 
    app.views.player = function(player) {
        return m('div', [
            m('span', player.name),
            m('span', ' (' + player.handicap + ')'),
        ]);
    }
    
})(__ || {});