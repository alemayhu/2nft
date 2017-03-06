angular.module('2nft', [])
  .controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.iptables_version = "xyz";
    $http({
      method: 'GET',
      url: '/version'
    }).then(function successCallback(response) {
	$scope.iptables_version = response.data;
    }, function errorCallback(response) {
    });
  }]);
