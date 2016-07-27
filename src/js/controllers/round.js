/// <reference path="../init.js" />

(function(app){

    // namespace
    app.controllers = app.controllers || {};

    // controllers
    app.controllers.round = function(){
        
        
        var round = app.serviceContainer.dataProvider.getRound();
        
        return {

            round: round,

            eventHandlers: {

                updateHandicap: function(player, handicap){
                    player.updateHandicap(handicap);
                },

                updateHoleScore: function(holeScore, score){
                    holeScore.grossScore = score;
                }

            }
        };
        
        
        
        
        

        m.startComputation();

        var deferred = m.deferred();

        app.serviceContainer.dataProvider.getRound(function(round){

            var retval = {

                round: round,

                eventHandlers: {

                    updateHandicap: function(player, handicap){
                        player.updateHandicap(handicap);
                    },

                    updateHoleScore: function(holeScore, score){
                        holeScore.grossScore = score;
                    }

                }
            };

            m.endComputation();

            deferred.resolve(retval);

        });

        return deferred.promise;

    }
    
})(__ || {});