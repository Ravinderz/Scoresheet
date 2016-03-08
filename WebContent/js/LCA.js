var LCA = angular.module('LCA',['ngRoute']);
LCA.config(function($routeProvider){
	$routeProvider.
	when('/main',{
		templateUrl: 'main.html',
		controller : 'initialController'
	}).
	when('/scoresheet',{
		templateUrl : 'scorekeeper.html',
		controller : 'scoresheetController'
	}).
	when('/page',{
		templateUrl: 'page.html',
		controller : 'myController'
	})
});

LCA.controller('routeController',['$location',function($location){
		$location.path("/page");
}]);

LCA.controller('myController',['$scope','$location',function($scope,$location){
	$scope.enter = function(){
		console.log("entered the function in mycontroller");
		$scope.value="new";
		$location.path("/main");
	};
}]);

LCA.service('playerNameService',function(){
	var playerNames = []; 
	var gameScore = "";
	
	this.addNames = function(newObj){
		console.log("inside addnames",newObj);
		playerNames = newObj;
	};
	
	this.addGameScore = function(newObj){
		console.log("insideGameScore",newObj)
		gameScore = newObj;
	};
	
	this.getNames = function(){
		return playerNames;
	};
	
	this.getGameScore = function(){
		return gameScore;
	}
	});


/*var LCA = angular.module('LCA',[]);
LCA.factory('playerNameService',function(){
	var Names = {};
	var playerNames = []; 
	
	function addNames(newObj){
		console.log("inside addnames",newObj);
		playerNames = newObj;
	};
	
	function getNames(){
		return playerNames;
	};
	
	return{
		addNames: addNames,
		getNames: getNames
		};
	});*/

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
	
	/*playerNameService.addNames($scope.playerNames);*/
	
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
			 url: 'rest/user/register', 
			 method: 'POST',
			  headers: { 'Content-Type': 'application/json' },
			    data: JSON.stringify(finData)
			}).then(function successCallback(response) {
			    $scope.status="we got a response from rest "+response.data;
			    $location.path("/scoresheet");
			    //window.location = "scoresheet.html";
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


	
/*This controller is for the scoresheet page
LCA.controller('scoresheetController',['$scope','playerNameService',function($scope,playerNameService){
		$scope.playerNames =  ["ravi","nishanth","jayanth"];
		$scope.playerNames = playerNameService.getNames();
		console.log("getnames in scoresheet",playerNameService.getNames());
		console.log($scope.playerNames);
	}]);
	
*/	
	
	
	
	
	

/*This will be used for the navigation between pages*/
angular.module('test',
		[ 'ui.router', 'angularUtils.directives.uiBreadcrumbs' ])

.config(function($stateProvider) {
	$stateProvider.state('user', {
		url : '^',
		views : {
			'main@' : {
				templateUrl : 'main.html',
			}
		},
		data : {
			displayName : 'Home',
		}
	})
	});

LCA.controller('scoresheetController',['$scope','$http','playerNameService',function($scope,$http,playerNameService){
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
		console.log("totals",totals());
		$scope.rowArr = chunk($scope.inputData,$scope.playerNames.length);
		$scope.totalScores = totals();
		maxScore();
		gameOver();
		$scope.scoreArr = chunk($scope.totalScores,$scope.playerNames.length);
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
	return $scope.winner;
	};
	
	$scope.stop = function(){
		console.log("winner",winner());
	/*	var winner ="";
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
	console.log("winner",$scope.playerNames[index]);*/
	};

	function totals(){
		var total = [];
		for(var i = 0 ; i < $scope.playerSet.length ; i++){
			var score = []
			score = $scope.playerSet[i].Scores;
			var temp = 0;
			for(var j=0 ; j < score.length ; j++){
				if(score[j] === "NA"){
					score[j] = 0;
				temp = +temp + +score[j];
				}else{
					temp = +temp + +score[j];
				}
					
			}
			total.push(temp);
		}
		return total;
	};


}]);

