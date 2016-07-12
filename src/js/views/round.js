/// <reference path="../init.js" />
/// <reference path="playerList.js" />

(function(app){

    // namespace
    app.views = app.views || {};

    // view 
    app.views.round = function(round){
        return m('div', [
            m('div', [
                m('h2', 'Details'),
                m('div', [
                    m('h3', round.course.name),
                    m('h3', round.date.toString())
                ])
            ]),
            m('div', [
                m('h2', 'Players'),
                app.views.playerList(round.players)
            ]),
        ]);
    }
    
})(__ || {});