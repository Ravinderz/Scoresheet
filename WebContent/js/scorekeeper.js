var scorekeeper = angular.module('scorekeeper',[]);
scorekeeper.controller('scoresheetController',['$scope','$http',function($scope,$http){
	var i=0;
	$scope.gameScore = 100;
	$scope.colArr = [];
	$scope.totalScores = [];
	$scope.scoreArr = [];
	$scope.rowData = [];
	$scope.inputData = [];
	$scope.playerNames =  ["ravi","nishanth","Karthik"];
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
			var input = $scope.rowData[j];
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
		gameOver();
		$scope.scoreArr = chunk($scope.totalScores,$scope.playerNames.length);

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
		var maxScore = $scope.totalScores[0];
		for(var i=0; i < $scope.totalScores.length ; i++){
			console.log("inside loop minNumber",minNumber);
			console.log("totalScores",$scope.totalScores[i]);
			if(maxScore < parseInt($scope.totalScores[i])){
				console.log("if minNumber",maxScore);
				console.log("if totalScores",$scope.totalScores[i]);
				maxScore = $scope.totalScores[i];
				index = i;
			}
		}
		return maxScore;
	}
	
	function gameOver(){
		console.log("inside gameover method")
		var gameScore = $scope.gameScore;
		var gameOverPlayersList = [];
		for(var i = 0 ; i < $scope.totalScores.length ; i++){
			if($scope.totalScores[i] >= gameScore){
				console.log(gameScore ,"inside if " ,$scope.totalScores[i]);
				gameOverPlayersList.push($scope.playerNames[i]);
				console.log("Game over for",$scope.playerNames[i]);
			}
		}
	}

	function winner(){
		var winner ="";
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
	winner = $scope.playerNames[index];		
	return winner;
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
				temp = +temp + +score[j];
			}
			total.push(temp);
		}
		return total;
	};


}]);
