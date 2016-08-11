/// <reference path="../init.js" />
/// <reference path="playerList.js" />

(function(app){

    // namespace
    app.views = app.views || {};

    // view 
    app.views.round = function(controller){

        if (controller.round ===  null) {
            controller.refreshData();
        }

        var round = controller.round;
        var competition = round.competition;
        var course = competition.course;
        var dateTime = competition.dateTime || round.dateTime  || round.date || '';
        var holes = course.holes || [];
        
        // this is the list used to sort the column headings and table body columns
        var playerNames = round.team.players.map(function(player){ 
            return player.name;
        });

        var getTableHeadings = function(){
            var retval = [
                m('th', 'Hole'),
                m('th', 'Par'),
                m('th', 'SI')
            ];
            retval.push(round.team.players.map(function(player){
                return m('th', app.views.player(player, function(handicap){
                    if (typeof(controller.updateHandicap) === 'function') controller.updateHandicap(player, handicap); 
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
                return hs.hole.holeId === hole.holeId;
            });
            var teamHoleScore = 0;
            round.team.players.forEach(function(player){

                var holeScoresForPlayer = holeScores.filter(function(hs){
                    return hs.player.playerId === player.playerId;
                });
                if (holeScoresForPlayer.length === 0){

                    var updateHoleScore = function(score){
                        var hs = new app.models.holeScore(hole, player, score);
                        hs.competitionId = competition.competitionId;
                        controller.addHoleScore(hs, score);
                    }

                    retval.push(m('td.score-cell', [
                        m('input.v-small-input.score-input[type="number"]',
                        {
                            onchange: m.withAttr("value", updateHoleScore)
                        })
                    ]));

                }
                else{

                    var hs = holeScoresForPlayer[0];

                    var updateHoleScore = function(score){
                        controller.updateHoleScore(hs, score);
                    }

                    var points = hs.points();

                    var labelClass =
                        points === 0 ?
                            'danger' :
                            points === 1 ?
                                'warning' :
                                'success';
                    retval.push(m('td.score-cell', [
                        m('input.v-small-input.score-input[type="number"][min="1"][max="12"]',
                        {
                            value: hs.grossScore,
                            onchange: m.withAttr("value", updateHoleScore)
                        }),
                        m('span.label.label-default', hs.netScore()),
                        m('span.label.label-' + labelClass, points)
                    ]));
                    teamHoleScore += points;
                }
            });
            retval.push(m('td', m('span.team-score', teamHoleScore)));
            return retval;
        }

        return m('div.container', [
            m('section', [
                m('div', [
                    m('h4.competition-name', competition.name ),
                    m('h4.course-name', course.name ),
                    m('h4.round-date', dateTime.toLocaleDateString("en-GB"))
                ])
            ]),
            m('section', [
                m('table.table.table-bordered', 
                    m('thead', m('tr', getTableHeadings())),
                    m('tbody', holes.map(function(hole){
                        return m('tr', getTableCells(hole));
                    }))
                )
            ]),
        ]);
        
    }
    
})(__ || {});