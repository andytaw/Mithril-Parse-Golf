/// <reference path="../init.js" />

(function(app){

    // namespace
    app.controllers = app.controllers || {};

    // controllers
    app.controllers.round = function(){        
       
        var self = this;

        self.round = app.model.round || null;

        self.updateHandicap = function(player, handicap){
            
            player.updateHandicap(handicap);

            app.serviceContainer.dataProvider.updatePlayerHandicap(player.playerId, handicap);

        }

        self.updateHoleScore = function(holeScore, score){

            m.startComputation();

            app.serviceContainer.dataProvider.updateHoleScore(
                self.round,
                holeScore.holeScoreId,
                score,
                function(){
                    holeScore.updateScore(score);
                    m.endComputation();
                });

        }

        self.addHoleScore = function(holeScore, score){

            m.startComputation();

            app.serviceContainer.dataProvider.addHoleScore(
                self.round,
                holeScore.competitionId,
                holeScore.hole.holeId,
                holeScore.player.playerId,
                score,
                function(holeScore){
                    // after save push the holeScore into the Model
                    self.round.holeScores.push(holeScore);
                    m.endComputation();
                }
            );

        }

    }
    
})(__ || {});