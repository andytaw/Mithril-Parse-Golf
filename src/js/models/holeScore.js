/// <reference path="../init.js" />
/// <reference path="../services/golfLogic.js" />

(function(app){

    // namespace
    app.models = app.models || {};

    // model
    app.models.holeScore = function(hole, player, score){

        var self = this;
        var gl = new app.services.golfLogic();

        self.hole = hole;
        self.player = player;
        self.grossScore = score;
        self.freeShots = gl.calcFreeShots(self.player.handicap, self.hole.si);
        self.netScore = gl.calcNetScore(self.grossScore, self.freeShots);
        self.points = gl.calcPoints(self.netScore, self.hole.par);

    };
    
})(__ || {});