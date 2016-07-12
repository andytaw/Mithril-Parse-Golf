/// <reference path="../init.js" />

(function(app){

    // namespace
    app.services = app.services || {};

    // services
    app.services.golfLogic = function(){

        var self = this;

        self.calcFreeShots = function(hc, si){
            var retval = 0;
            while (hc >= si){
                retval++;
                hc -= 18;
            }
            return retval;
        }

        self.calcNetScore = function(gross, shots){
            return gross - shots;
        }

        self.calcPoints = function(net, par){
            var s = 2 + (par - net);
            return s < 0 ? 0 : s;
        }

    }
    
})(__ || {});