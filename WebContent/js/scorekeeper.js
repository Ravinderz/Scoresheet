var scorekeeper = angular.module('scorekeeper',[]);
scorekeeper.controller('scoresheetController',['$scope','$http',function($scope,$http){
	var i=0;
	$scope.colArr = [];
	$scope.rowData = [];
	$scope.inputData = [];
	$scope.playerNames =  ["ravi","nishanth"];
	$scope.colArr.length = 0;
	
    for (var i = 0; i < parseInt($scope.playerNames.length)   ; i++) {
        $scope.colArr.push(i);
    }
    console.log($scope.rowArr);
    console.log($scope.colArr);
	console.log($scope.rowData);
	console.log($scope.playerNames);
	
	/* $scope.change = function(){
        var i=0;
		$scope.inputData.push($scope.rowData[i]);
		i = i +1;
		console.log(i);
	}; 
	 */
	 
	/*  function total(arr){
		 var i = 0;
		 var temp = 0;
		 var newArr = [];
		 console.log("inputdata at 0",arr[0]);
		 for(var i=0; i <=arr.length; i = i + 3 ){
			 console.log("inputdata at 0",arr[0]);
			 var p1 = [];
				 p1 = arr[i];
			 console.log("p1",p1);
			 if(i === 0){
				 console.log("in if");
			 temp =  +temp +  +arr[0];
			 }
			 else{
				 temp =  +temp +  +arr[i];
			 }
		 }
		 newArr.push(temp);
		 console.log(newArr);
		 
		 temp = 0;
		 for(var i=1; i <=arr.length; i = i + 3 ){
			  temp =  +temp + +$scope.inputData[i];
			  var p2 = [];
			  p2=arr[i];
				 console.log("p2",p2);
				 
		 }
		 newArr.push(temp);
		 console.log(newArr);
		 
		 temp = 0;
		 for(var i=2; i <=arr.length; i = i + 3 ){
			 temp =  +temp + +$scope.inputData[i];
			 var p2 = arr[i];
			 console.log("p2",p2);
		 }
		 
		 newArr.push(temp);
		 console.log(newArr);
		 
		 return newArr;
	 }*/
	 
	 function chunk(arr, size) {
		  var newArr = [];
		  for (var i=0; i<arr.length; i+=size) {
		    newArr.push(arr.slice(i, i+size));
		  }
		  return newArr;
		}
	
 	$scope.add = function(){
		 console.log("inside add");
		 console.log($scope.rowData);
	for(var j=0; j < $scope.rowData.length ; j++){
		var input = $scope.rowData[j];
		console.log(input);
		$scope.inputData.push(input);
		input = "";
		console.log($scope.inputData);
		/* if(j == 2){
			$scope.rowArr.push(i);
			i = i+1;
		} */
	}
	$scope.rowArr = chunk($scope.inputData,$scope.playerNames.length);

};
	/*$scope.scoreArr = chunk(total($scope.inputData),$scope.playerNames.length);*/ 

	
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
}]);
