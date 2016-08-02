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

            holeScore.updateScore(score);

            app.serviceContainer.dataProvider.updateHoleScore(holeScore.holeScoreId, score);

        }

        self.addHoleScore = function(holeScore, score){

            self.round.holeScores.push(holeScore);

            var onSave = function(holeScore){
                console.log(holeScore);
            }

            app.serviceContainer.dataProvider.addHoleScore(
                holeScore.competitionId,
                holeScore.hole.holeId,
                holeScore.player.playerId,
                score,
                onSave
            );

        }

    }
    
})(__ || {});