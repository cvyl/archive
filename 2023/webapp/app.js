var app = angular.module("deviceInfoApp", []);
app.controller("deviceInfoCtrl", function($scope) {
    $scope.screenWidth = screen.width;
    $scope.screenHeight = screen.height;
    $scope.devicePixelRatio = window.devicePixelRatio;
    $scope.cpuArchitecture = navigator.cpuClass;
    $scope.ipv4 = "Loading...";
    $scope.ipv6 = "Loading...";
    $scope.geolocation = "Loading...";
    $scope.battery = "Loading...";
    $scope.memory = "Loading...";
    $scope.storage = "Loading...";
    $scope.userAgent = navigator.userAgent;
    $scope.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  var userAgent = navigator.userAgent;
  if (userAgent.match(/Android/i)) {
    $scope.deviceType = "Mobile";
    $scope.operatingSystem = "Android";
  } else if (userAgent.match(/iPhone/i) || userAgent.match(/iPad/i)) {
    $scope.deviceType = "Mobile";
    $scope.operatingSystem = "iOS";
  } else {
    $scope.deviceType = "Desktop";
    if (navigator.oscpu) {
      $scope.operatingSystem = navigator.oscpu;
    } else {
      $scope.operatingSystem = "Unknown";
    }
  }
  $scope.navigatorLanguage = navigator.language;
  $scope.browserName = navigator.appName;
  $scope.browserVersion = navigator.appVersion;

  $.getJSON("https://ipapi.co/json/", function(data) {
    $scope.$apply(function() {
      $scope.ipv4 = data.ip;
      $scope.ipv6 = data.ipv6;
      $scope.geolocation = data.city + ", " + data.region + ", " + data.country_name;
    });
  });


// code to get the IP addresses
if (window.RTCPeerConnection) {
    var pc = new RTCPeerConnection({ iceServers: [] });
    pc.createDataChannel("");
    pc.createOffer().then(function (sdp) {
      pc.setLocalDescription(sdp);
    }, function onerror() { });
    pc.onicecandidate = function (ice) {
        if (ice && ice.candidate && ice.candidate.candidate) {
            var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate);
            if(myIP){
                myIP = myIP[1];
                if(myIP.includes(":")){
                  $scope.$apply(function() {
                    $scope.ipv6 = myIP;
                  });
                }
                else {
                  $scope.$apply(function() {
                    $scope.ipv4 = myIP;
                  });
                }
            }
            pc.onicecandidate = null;
            pc.close();
            pc = null;
          }
        
    };
  }
  // code to get the geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      $scope.geolocation = position.coords.latitude + ", " + position.coords.longitude;
    });
  }
  //code to get the battery status
  if (navigator.getBattery) {
    navigator.getBattery().then(function (battery) {
      $scope.battery = battery.level * 100 + "%";
    });
  }
  //code to get the memory status
  if (navigator.deviceMemory) {
    $scope.memory = navigator.deviceMemory + "GB";
  }
  //code to get the storage status
  if (navigator.storage) {
    navigator.storage.estimate().then(function (estimate) {
      var storage = estimate.usage / (1024 * 1024 * 1024);
      $scope.storage = storage.toFixed(2) + "GB";
    });
  }


});
