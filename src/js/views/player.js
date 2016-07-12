/// <reference path="../init.js" />

(function(app){

    // namespace
    app.views = app.views || {};

    // view 
    app.views.player = function(player, onUpdateHandicap) {
        return m('div', [
            m('span', player.name),
            m(
                'input.v-small-input[type="number"]',
                {
                    value: player.handicap,
                    onchange: m.withAttr("value", onUpdateHandicap)
                }
            ),
        ]);
    }
    
})(__ || {});