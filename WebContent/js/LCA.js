

var LCA = angular.module('LCA',['ngRoute']);
LCA.config(function($routeProvider){
	$routeProvider.
	when('/main',{
		templateUrl: 'main.html',
		controller : 'initialController'
	}).
	when('/scoresheet',{
		templateUrl : 'scoresheet.html',
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
	
	this.addNames = function(newObj){
		console.log("inside addnames",newObj);
		playerNames = newObj;
	};
	
	this.getNames = function(){
		return playerNames;
	};
	
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
	    console.log("playerNameService",playerNameService.getNames());
	    /*angular.forEach($scope.playerNames, function(value, key) {
	    	  console.log(key + ': ' + value);
	    	});*/
		/*for (var i = 0; i < parseInt($scope.playerNumber) ; i++) {
            playerNameService.addNames($scope.playerNames[i]);
            console.log("playerNameService"+playerNameService.getNames);
        }*/
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


	
/*This controller is for the scoresheet page*/
LCA.controller('scoresheetController',['$scope','playerNameService',function($scope,playerNameService){
		$scope.playerNames =  [];
		$scope.playerNames = playerNameService.getNames();
		console.log("getnames in scoresheet",playerNameService.getNames());
		console.log($scope.playerNames);
	}]);
	
	
	
	
	
	
	

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


