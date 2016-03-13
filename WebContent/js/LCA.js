

var LCA = angular.module('LCA',['ngRoute']);

/*Routing for the application*/

LCA.config(function($routeProvider){
	$routeProvider.
	when('/gamedetails',{
		templateUrl: 'gamedetails.html',
		controller : 'initialController'
	}).
	when('/scoresheet',{
		templateUrl : 'scoresheet.html',
		controller : 'scoresheetController'
	}).
	when('/home',{
		templateUrl: 'home.html',
		controller : 'myController'
	}).
	when('/gamestats',{
		templateUrl: 'gamestats.html',
		controller: 'gameStatController'	
	})
});


/*service for storing and getting gameID,player Names and game score*/

LCA.service('playerNameService',function(){
	var playerNames = []; 
	var gameScore = "";
	var gameId = "";
	var playercount = 0;
	
	this.addGameID = function(newObj){
		console.log("inside addnames",newObj);
		gameId = newObj;
	};
	
	this.addNames = function(newObj){
		console.log("inside addnames",newObj);
		playerNames = newObj;
	};
	
	this.addGameScore = function(newObj){
		console.log("insideGameScore",newObj)
		gameScore = newObj;
	};
	
	this.addPlayerCount = function(newObj){
		console.log("inside addPlayerCount",newObj)
		playercount = newObj;
	};
	
	this.getPlayerCount = function(){
		return playercount;
	};
	
	this.getNames = function(){
		return playerNames;
	};
	
	this.getGameScore = function(){
		return gameScore;
	};
	
	this.getGameID = function(){
		return gameId;
	};
	});




/*initial controller for the index page to start the application*/

LCA.controller('routeController',['$location',function($location){
		$location.path("/home");
}]);

/*controller for the home page which leads to the gamedetails page*/

LCA.controller('myController',['$scope','$location',function($scope,$location){
	$scope.enter = function(){
		console.log("entered the function in mycontroller");
		$scope.value="new";
		$location.path("/gamedetails");
	};
}]);

/*controller for the gamedetails page which takes playerNameService to set playerNames, player adds gamescore and no of player
and playernames*/ 

LCA.controller('initialController',['$location','$scope','$http','playerNameService',function($location,$scope,$http,playerNameService){
	  $scope.arr = [];
	$scope.playerNames = [];
	
	console.log($scope.playerNames);
	$scope.playerNumber = 0;
  
    $scope.makeArray = function () {
        $scope.arr.length = 0;
        for (var i = 0; i < parseInt($scope.playerNumber) ; i++) {
            $scope.arr.push(i);
        }
    };
	if($scope.no_of_players){
		console.log("inside nif");
	$scope.showPlayerNames = true;
	};
	
	$scope.submit = function(){
		$scope.entered=true;
		playerNameService.addNames($scope.playerNames);
		playerNameService.addGameScore($scope.game_score);
	    console.log("playerNameService",playerNameService.getNames());
		console.log("inside submit",$scope.playerNames);
		console.log($scope.no_of_players);
		console.log($scope.game_score);
		var finData = {Names : $scope.playerNames,Score : $scope.game_score};
		console.log("finData: ",JSON.stringify(finData));
		 $http({
			 url: 'rest/game/details', 
			 method: 'POST',
			  headers: { 'Content-Type': 'application/json' },
			    data: JSON.stringify(finData)
			}).then(function successCallback(response) {
			    $scope.status="we got a response from rest "+response.data;
			    console.log(response.data);
			    if(response.data.Msg === "Success"){
			    playerNameService.addGameID(response.data.Id);	
			    $location.path("/scoresheet");
			    }
			  }, function errorCallback(response) {
			    $scope.status = "we got a exception "+response.data;
			  });
	};
	$scope.hide = function(){
		if(typeof $scope.playerNames !== 'undefined')
			return false;
		return true;
	};

	}]);

	
/*this controller is for scoresheet to display player names with all the inputs as a table*/

LCA.controller('scoresheetController',['$location','$scope','$http','playerNameService',function($location,$scope,$http,playerNameService){
	var i=0;
	$scope.gameScore = playerNameService.getGameScore();
	console.log("game score from service",$scope.gameScore);
	$scope.colArr = [];
	$scope.totalScores = [];
	$scope.scoreArr = [];
	$scope.rowData = [];
	$scope.inputData = [];
	$scope.playerNames = playerNameService.getNames();
	console.log("######",$scope.playerNames);
	$scope.colArr.length = 0;

	for (var i = 0; i < parseInt($scope.playerNames.length)   ; i++) {
		$scope.colArr.push(i);
	}
	console.log($scope.rowArr);
	console.log($scope.colArr);
	console.log($scope.rowData);
	console.log($scope.playerNames);

	function chunk(arr, size) {
		var newArr = [];
		for (var i=0; i<arr.length; i+=size) {
			newArr.push(arr.slice(i, i+size));
		}
		return newArr;
	}

	$scope.playerSet = [];

	$scope.add = function(){
		for(var j=0; j < $scope.rowData.length ; j++){
			var input = "";
			if($scope.rowData[j] === ""){
				input = "NA";
			}else{
			 input = $scope.rowData[j];
			}
			$scope.rowData[j] = "";
			console.log(input);
			$scope.inputData.push(input);
			if($scope.playerSet.length < $scope.playerNames.length){
				$scope.playerSet.push({Name : $scope.playerNames[j],Scores:[input]});
			}else{
				$scope.playerSet[j].Scores.push(input); 
			}
			console.log("json playerSet",JSON.stringify($scope.playerSet));

		}
		
		$scope.rowArr = chunk($scope.inputData,$scope.playerNames.length);
		$scope.totalScores = totals();
		console.log("totals",$scope.totalScores);
		$scope.scoreArr = chunk($scope.totalScores,$scope.playerNames.length);
		maxScore();
		gameOver();
		console.log($scope.scoreArr);

	};



	$scope.printJSON = function(){
		var scores = {scores : $scope.inputData};
		console.log(JSON.stringify(scores));
		$http({
			url: 'rest/user/printJSON', 
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			data: JSON.stringify(scores)
		}).then(function successCallback(response) {
			$scope.status="we got a response from rest "+response.data;
		}, function errorCallback(response) {
			$scope.status = "we got a exception "+response.data;
		});

	};
	
	function maxScore(){
		var index = 0;
		var maxScore = $scope.totalScores[0];
		for(var i=0; i < $scope.totalScores.length ; i++){
			console.log("inside loop maxNumber",maxScore);
			console.log("totalScores",$scope.totalScores[i]);
			if(maxScore < parseInt($scope.totalScores[i])){
				console.log("if maxScore",maxScore);
				console.log("if totalScores",$scope.totalScores[i]);
				maxScore = $scope.totalScores[i];
				index = i;
				
			}
		}
		var tdID = "#" + "cell" + index;
		console.log(tdID);
		//var addclass = document.getElementById(tdID);
		//addclass += "danger";
		$(tdID).addClass("danger");
		return maxScore;
	}
	
	function gameOver(){
		console.log("inside gameover method")
		var gameScore = $scope.gameScore;
		var fieldID = "";
		var playerIndex = "";
		var gameOverPlayersList = [];
		for(var i = 0 ; i < $scope.totalScores.length ; i++){
			if($scope.totalScores[i] >= gameScore){
				console.log(gameScore ,"inside if " ,$scope.totalScores[i]);
				if(gameOverPlayersList[i] === $scope.playerNames[i]){
					//just not to add the same player
				}else{
				gameOverPlayersList.push($scope.playerNames[i]);
				}
				fieldID = "#" + "col" + i;
				tdID = "#" + "cell" + i;
				playerIndex = i;
				console.log(fieldID);
				$(fieldID).attr("disabled","disabled");
				//for(var i=0; i < $scope.playerSet[i].Scores.length;i++ ){
				$(tdID).addClass("danger");
			//	}
				console.log("Game over for",$scope.playerNames[i]);
			}
		}
		if($scope.playerNames.length - gameOverPlayersList.length === 1){
			winner();
		}
	}
	
	function winner(){
		$scope.winner = "";
		var index = 0;
		var minNumber = 0;
		minNumber= $scope.totalScores[0];
		console.log("minNumber",minNumber);
		console.log("totalScores",$scope.totalScores);
			for(var i=0; i < $scope.totalScores.length ; i++){
				console.log("inside loop minNumber",minNumber);
				console.log("totalScores",$scope.totalScores[i]);
				if(minNumber > parseInt($scope.totalScores[i])){
					console.log("if minNumber",minNumber);
					console.log("if totalScores",$scope.totalScores[i]);
					minNumber = $scope.totalScores[i];
					index = i;
				}
			}
			
	$scope.winner = $scope.playerNames[index];
	console.log("winner",$scope.winner);
	scorecard();
	return $scope.winner;
	};
	
	function scorecard(){
		$scope.scoreCard = [];
		$scope.details = [];
		for(var i = 0; i < $scope.playerSet.length;i++){
			var playerObj = $scope.playerSet[i];
			var fullCount = 0;  
			var showCount = 0;
			//$Scope.details.push({Name : playerObj.Name,})
			for(j=0;j < playerObj.Scores.length;j++){
				if(playerObj.Scores[j] === "40")
				fullCount++;
				if(playerObj.Scores[j] === "XX" || playerObj.Scores[j] === "xx")
				showCount++;
			}
			$scope.details.push({Name : playerObj.Name, FullCount : fullCount, Shows : showCount});
		}
		$scope.scoreCard.push({Details : $scope.details , GameId : playerNameService.getGameID, Winner : $scope.winner});
		var scorecard = {Details : $scope.details , GameId : playerNameService.getGameID(), Winner : $scope.winner};
		console.log("scorecard",JSON.stringify(scorecard));
		$http({
			url: 'rest/game/scorecard', 
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			data: JSON.stringify(scorecard)
		}).then(function successCallback(response) {
			$scope.status="we got a response from rest "+response.data;
		}, function errorCallback(response) {
			$scope.status = "we got a exception "+response.data;
		});

	};
	
	
	
	$scope.stop = function(){
		console.log("winner",winner());
	};

	function totals(){
		var total = [];
		for(var i = 0 ; i < $scope.playerSet.length ; i++){
			var score = [];
			var temp = 0;
			for(var j=0 ; j < $scope.playerSet[i].Scores.length ; j++){
				score = $scope.playerSet[i].Scores[j];
				if(score === "NA" || score === "XX" || score === "xx"){
					console.log("in totals before XX",score);
					score = 0;
					console.log(JSON.stringify($scope.playerSet));
				temp = +temp + +score;
				}else{
					temp = +temp + +score;
				}
					
			}
			total.push(temp);
		}
		return total;
	};

	$scope.stats = function(){
		$location.path("/gamestats");
	};
	
}]);

/*controller for showing graphs */


LCA.controller('gameStatController',['$http','$scope','playerNameService',function($http,$scope,playerNameService) {

	/*$scope.myData = [
	                 {name: 'AngularJS', count: 300},
	                 {name: 'D3.JS', count: 150},
	                 {name: 'jQuery', count: 400},
	                 {name: 'Backbone.js', count: 300},
	                 {name: 'Ember.js', count: 100}
	             ];
	*/
	
		console.log("entereed stats");
	var gameId= playerNameService.getGameID();
	$http({
		 url: 'rest/game/gameStats', 
		 method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		//  var gameId = "15";
		    data: JSON.stringify(gameId)
		}).then(function successCallback(response) {
		    $scope.status="we got a response from rest "+response.data.Shows;
		    console.log("yyy : ",response.data);
		    $scope.showsData = response.data.Shows;
		    $scope.fullCountData = response.data.FullCount;
		    $scope.playerCount = response.data.PlayerCount;
		    console.log("iiiiii",$scope.playerCount);
		    playerNameService.addPlayerCount($scope.playerCount);
		  //  var pCount = $scope.playerCount;
		   // if(response.data.Msg === "Success"){
		    //	 playerNameService.addGameID(response.data.Id);
		    //$location.path("/scoresheet");
		  //  }
		    //window.location = "scoresheet.html";
		  }, function errorCallback(response) {
		    $scope.status = "we got a exception "+response.data;
		  });

	
	}]);


/*directive to show the graphs in the game stats page*/
/*LCA.directive( 'crD3Bars', ['playerNameService',function (data,playerNameService) {*/
LCA.directive( 'crD3Bars',[function (data) {
                              return {
                                restrict: 'E',
                                scope: {
                                  data: '='
                                },
                                link: function (scope, element,data) {
                                  var margin = {top: 20, right: 20, bottom: 30, left: 40},
                                    width = (7*100) - margin.left - margin.right,
                                    height = 360 - margin.top - margin.bottom;
                                  var svg = d3.select(element[0])
                                    .append("svg")
                                    .attr('width', width + margin.left + margin.right)
                                    .attr('height', height + margin.top + margin.bottom)
                                    .append("g")
                                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                                  var x = d3.scale.ordinal().rangeRoundBands([0, width], .7);
                                  var y = d3.scale.linear().range([height, 0]);

                                  var xAxis = d3.svg.axis()
                                      .scale(x)
                                      .orient("bottom");

                                  var yAxis = d3.svg.axis()
                                      .scale(y)
                                      .orient("left")
                                      .ticks(10);

                                  //Render graph based on 'data'
                                  scope.render = function(data) {
                                    //Set our scale's domains
                                    x.domain(data.map(function(d) { return d.name; }));
                                    y.domain([0, d3.max(data, function(d) { return d.count; })]);
                                    
                                    //Redraw the axes
                                    svg.selectAll('g.axis').remove();
                                    //X axis
                                    svg.append("g")
                                        .attr("class", "x axis")
                                        .attr("transform", "translate(0," + height + ")")
                                        .call(xAxis);
                                        
                                    //Y axis
                                    svg.append("g")
                                        .attr("class", "y axis")
                                        .call(yAxis)
                                      .append("text")
                                        .attr("transform", "rotate(-90)")
                                        .attr("y", 6);
                                      //  .style("text-anchor", "end")
                                       // .text("count");
                                        
                                    var bars = svg.selectAll(".bar").data(data);
                                    bars.enter()
                                      .append("rect")
                                      .attr("class", "bar")
                                      .attr("x", function(d) { return x(d.name); })
                                      .attr("width", x.rangeBand());

                                    //Animate bars
                                    bars
                                        .transition()
                                        .duration(1000)
                                        .attr('height', function(d) { return height - y(d.count); })
                                        .attr("y", function(d) { return y(d.count); })
                                  };

                                   //Watch 'data' and run scope.render(newVal) whenever it changes
                                   //Use true for 'objectEquality' property so comparisons are done on equality and not reference
                                    scope.$watch('data', function(){
                                        scope.render(scope.data);
                                    }, true);  
                                  }
                              };
                            }
]);
/*End of File*/
