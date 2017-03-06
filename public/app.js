let app = angular.module('2nft', []);

let controller = app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
  $scope.old_rules_changed = function(obj, $event) {
    let old_rules = obj.old_rules;
    console.log(old_rules);

    var req = {
      method: 'POST',
      url: '/translate',
      headers: {
	'Content-Type': 'application/json'
      },
      data: { old_rules: old_rules }
    }
    $http(req).then(function(res){
      console.log('new'+res.data);
      $scope.new_rules = res.data;
    }, function(){
    });
  };

  $scope.iptables_version = "xyz";
  $http({
    method: 'GET',
    url: '/version'
  }).then(function successCallback(response) {
    $scope.iptables_version = response.data;
  }, function errorCallback(response) {
  });
}]);
