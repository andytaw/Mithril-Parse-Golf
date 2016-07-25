var __={};(function(app){app.models=app.models||{};app.models.course=function(name,holes){this.name=name;this.holes=holes}})(__||{});(function(app){app.models=app.models||{};app.models.hole=function(number,par,si){this.number=number;this.par=par;this.si=si}})(__||{});(function(app){app.models=app.models||{};app.models.holeScore=function(hole,player,score){var self=this;var gl=new app.services.golfLogic;self.hole=hole;self.player=player;self.grossScore=score;self.freeShots=function(){return gl.calcFreeShots(self.player.handicap,self.hole.si)};self.netScore=function(){return gl.calcNetScore(self.grossScore,self.freeShots())};self.points=function(){return gl.calcPoints(self.netScore(),self.hole.par)}}})(__||{});(function(app){app.models=app.models||{};app.models.player=function(name,handicap){var self=this;self.name=name;self.handicap=handicap;self.updateHandicap=function(handicap){self.handicap=handicap}}})(__||{});(function(app){app.models=app.models||{};app.models.round=function(competition,date,team,holeScores){this.competition=competition;this.date=date;this.team=team;this.holeScores=holeScores}})(__||{});(function(app){app.services=app.services||{};app.services.dummyDataProvider=function(){var allPlayers=[new app.models.player("Andy",22),new app.models.player("Kevin",28),new app.models.player("Rob",20)];var allHoles=[new app.models.hole(1,4,4),new app.models.hole(2,3,1),new app.models.hole(3,5,2),new app.models.hole(4,4,3)];var allCourses=[new app.models.course("Southwick",allHoles)];var allHoleScores=[new app.models.holeScore(allHoles[0],allPlayers[0],5),new app.models.holeScore(allHoles[0],allPlayers[1],4),new app.models.holeScore(allHoles[0],allPlayers[2],6),new app.models.holeScore(allHoles[1],allPlayers[0],3),new app.models.holeScore(allHoles[1],allPlayers[1],7),new app.models.holeScore(allHoles[1],allPlayers[2],4)];var allRounds=[new app.models.round(allCourses[0],new Date(2016,8,10),allPlayers,allHoleScores)];this.getRound=function(){return allRounds[0]}}})(__||{});(function(app){app.services=app.services||{};app.services.golfLogic=function(){var self=this;self.calcFreeShots=function(hc,si){var retval=0;while(hc>=si){retval++;hc-=18}return retval};self.calcNetScore=function(gross,shots){return gross-shots};self.calcPoints=function(net,par){var s=2+(par-net);return s<0?0:s}}})(__||{});(function(app){app.services=app.services||{};app.services.parseDataProvider=function(){Parse.initialize("4861A54E256245D99F1F1565D39AC9BE","5961A54E256245D99F1F1565D39AC9BF");Parse.serverURL="https://atl-parse-server.herokuapp.com/";var parseObjects={};var initObjects=function(scope){scope.Round=Parse.Object.extend("round",{toModelObject:function(){var competition=this.get("competition");var date=this.get("date");var team=this.get("team");var holeScores=this.get("holeScores");return new app.models.round(competition,date,team,holeScores)}})};initObjects(parseObjects);this.getRound=function(callback){var query=new Parse.Query(parseObjects.Round);query.get("6uGG6NYMwR",{success:function(round){if(typeof callback==="function")callback(round.toModelObject())},error:function(error){console.log(error)}})}}})(__||{});(function(app){app.controllers=app.controllers||{};app.controllers.round=function(){m.startComputation();var deferred=m.deferred();app.serviceContainer.dataProvider.getRound(function(round){var retval={round:round,eventHandlers:{updateHandicap:function(player,handicap){player.updateHandicap(handicap)},updateHoleScore:function(holeScore,score){holeScore.grossScore=score}}};m.endComputation();deferred.resolve(retval)});return deferred.promise}})(__||{});(function(app){app.views=app.views||{};app.views.player=function(player,onUpdateHandicap){return m("div",[m("span",player.name),m('input.v-small-input[type="number"]',{value:player.handicap,onchange:m.withAttr("value",onUpdateHandicap)})])}})(__||{});(function(app){app.views=app.views||{};app.views.playerList=function(players){return m("div",players.map(function(player){return app.views.player(player)}))}})(__||{});(function(app){app.views=app.views||{};app.views.round=function(controller,eventHandlers){var round=controller.round;var eventHandlers=controller.eventHandlers||{};var playerNames=round.team.players.map(function(player){return player.name});var getTableHeadings=function(){var retval=[m("th","Hole"),m("th","Par"),m("th","SI")];retval.push(round.team.players.map(function(player){return m("th",app.views.player(player,function(handicap){if(typeof eventHandlers.updateHandicap==="function")eventHandlers.updateHandicap(player,handicap)}))}));retval.push(m("th","Team Score"));return retval};var getTableCells=function(hole){var retval=[m("td",hole.number),m("td",hole.par),m("td",hole.si)];var holeScores=round.holeScores.filter(function(hs){return hs.hole.number==hole.number});var teamHoleScore=0;round.team.players.forEach(function(player){var holeScoresForPlayer=holeScores.filter(function(hs){return hs.player.name===player.name});if(holeScoresForPlayer.length===0){var updateHoleScore=function(score){var hs=new app.models.holeScore(hole,player,score);round.holeScores.push(hs)};retval.push(m("td.score-cell",[m('input.v-small-input.score-input[type="number"]',{onchange:m.withAttr("value",updateHoleScore)})]))}else{var hs=holeScoresForPlayer[0];var updateHoleScore=function(score){hs.grossScore=score};var points=hs.points();var labelClass=points===0?"danger":points===1?"warning":"success";retval.push(m("td.score-cell",[m('input.v-small-input.score-input[type="number"]',{value:hs.grossScore,onchange:m.withAttr("value",updateHoleScore)}),m("span.label.label-default",hs.netScore()),m("span.label.label-"+labelClass,points)]));teamHoleScore+=points}});retval.push(m("td",m("span.team-score",teamHoleScore)));return retval};return m("div.container",[m("section",[m("div",[m("h4",round.course.name),m("h4",round.date.toString())])]),m("section",[m("table.table.table-bordered",m("thead",m("tr",getTableHeadings())),m("tbody",round.course.holes.map(function(hole){return m("tr",getTableCells(hole))})))])])}})(__||{});(function(app){app.components=app.components||{};app.components.round={controller:app.controllers.round,view:app.views.round}})(__||{});(function(app){var registerServices=function(){var s=app.serviceContainer={};s.dataProvider=new app.services.parseDataProvider};var mountApp=function(){m.mount(document.getElementById("appContainer"),app.components.round)};var startup=function(){registerServices();mountApp()};$(startup)})(__||{});