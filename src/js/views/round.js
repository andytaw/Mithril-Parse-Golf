/// <reference path="../init.js" />
/// <reference path="playerList.js" />

(function(app){

    // namespace
    app.views = app.views || {};

    // view 
    app.views.round = function(round){


        var getTableHeadings = function(){
            var retval = [
                m('th', '#'),
                m('th', 'Par'),
                m('th', 'SI')
            ];
            retval.push(round.players.map(function(player){
                return m('th', player.name);
            }));
            return retval;
        }

        var getTableCells = function(hole){
            var retval = [
                m('td', hole.number),
                m('td', hole.par),
                m('td', hole.si)
            ];
            var holeScores = round.holeScores.filter(function(hs){
                return hs.hole.number == hole.number;
            });
            holeScores.forEach(function(hs){
                retval.push(m('td', hs.grossScore + ' (' + hs.netScore + ') [' + hs.points + ']'));
            });
            return retval;
        }

        return m('div', [
            m('section', [
                m('h3', 'Details'),
                m('div', [
                    m('h4', round.course.name),
                    m('h4', round.date.toString())
                ])
            ]),
            m('section', [
                m('h3', 'Players'),
                app.views.playerList(round.players)
            ]),,
            m('section', [
                m('h3', 'Scores'),
                m('table', 
                    m('thead', m('tr', getTableHeadings())),
                    m('tbody', round.course.holes.map(function(hole){
                        return m('tr', getTableCells(hole));
                    }))
                )
            ]),
        ]);
    }
    
})(__ || {});