let app = angular.module('2nft', []);

let controller = app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

  // let api_url = "http://2nft.server";
    let api_url = "http://localhost:8089";

  $scope.old_rules_changed = function(obj, $event) {
    let old_rules = obj.old_rules;

    var req = {
      method: 'POST',
      url: api_url+'/translate',
      data: old_rules
    };

    $http(req).then(function(res){
      $scope.new_rules = res.data;
      $scope.rule_id = 0; //FIXME
    }, function(){
    });
  };

  $scope.iptables_version = "xyz";
  $http({
    method: 'GET',
    url: api_url+'/version'
  }).then(function successCallback(response) {
    $scope.iptables_version = response.data;
  }, function errorCallback(response) {
  });

  $scope.app_version = "xyz";
  $http({
    method: 'GET',
    url: '/app_version'
  }).then(function successCallback(response) {
    $scope.app_version = response.data;
  }, function errorCallback(response) {
  });

  $scope.number_of_rows = function(lines) {
    var min = 10;

    if (!lines) {
      return min;
    }
    var count = lines.split("\n").length;

    if (count < min)
      count = min;

    return Math.min(count, 35);
  };
}]);
