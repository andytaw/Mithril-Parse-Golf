/// <reference path="../init.js" />
/// <reference path="playerList.js" />

(function(app){

    // namespace
    app.views = app.views || {};

    // view 
    app.views.round = function(controller, eventHandlers){

        var round = controller.round;
        var eventHandlers = controller.eventHandlers || {};

        var getTableHeadings = function(){
            var retval = [
                m('th', 'Hole'),
                m('th', 'Par'),
                m('th', 'SI')
            ];
            retval.push(round.players.map(function(player){
                return m('th', app.views.player(player, function(handicap){
                    if (typeof(eventHandlers.updateHandicap) === 'function') eventHandlers.updateHandicap(player, handicap); 
                }));
            }));
            retval.push(m('th', 'Team Score'))
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
            var teamHoleScore = 0;
            holeScores.forEach(function(hs){
                var labelClass =
                    hs.points === 0 ?
                        'danger' :
                        hs.points === 1 ?
                            'warning' :
                            'success'
                retval.push(m('td.score-cell', [
                    m('input.v-small-input.score-input[type="number"][value="' + hs.grossScore + '"]'),
                    m('span.label.label-default', hs.netScore()),
                    m('span.label.label-' + labelClass, hs.points())
                ]));
                teamHoleScore += hs.points();
            });
            if (holeScores.length > 0) retval.push(m('td', m('span.team-score', teamHoleScore)));
            return retval;
        }

        return m('div.container', [
            m('section', [
                m('div', [
                    m('h4', round.course.name),
                    m('h4', round.date.toString())
                ])
            ]),
            m('section', [
                m('table.table.table-bordered', 
                    m('thead', m('tr', getTableHeadings())),
                    m('tbody', round.course.holes.map(function(hole){
                        return m('tr', getTableCells(hole));
                    }))
                )
            ]),
        ]);
    }
    
})(__ || {});