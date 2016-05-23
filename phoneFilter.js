angular.module('telFormat').filter('tel', function () {
    return function (tel, scope) {
        if (!tel) { return ''; }
       
        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;
        
        if (typeof scope.countryCode == "undefined" || scope.countryCode == "" || scope.countryCode == "+1") {
          
          switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
          }

          number = number.slice(0, 3) + '-' + number.slice(3);
  
          return (country + " (" + city + ") " + number).trim();
            
        }
        else if (scope.countryCode == "+91") {
          switch(value.length) {
            case 7: 
              country = "91";
              city = value.slice(0,3);
              number = value.slice(3);
              break;
            case 9:
              country = value.slice(0,2)
              city = value.slice(2,5);
              number = value.slice(5);
              break;
            case 10: 
              country = "91";
              city = value.slice(0,4);
              number = value.slice(4,7) + "-" + value.slice(7);
              break;
            case 12: 
              country = value.slice(0,2)
              city = value.slice(2,6)
              number = value.slice(6,9) + "-" + value.slice(9);
              break;
            default:
              return tel;
          }
          
          return country + " " + city + "-" + number;
        }
        else if(scope.countryCode == "+61") {
          switch(value.length) {
            case 8: 
              country = "61";
              number = value.slice(0,4) + " " + value.slice(4);
              break;
            case 10: 
              country = "61";
              number = value.slice(0,4) + " " + value.slice(4,7) + " " + value.slice(7);
              break;
            default: 
              return tel;
          }
          return country + " " + number;
        }
        else if(scope.countryCode == "+65") {
          switch(value.length) {
            case 8: 
              country = "65";
              number = value.slice(0,4) + " " + value.slice(4);
              break;
            default:
              return tel;
          }
          return country + " " + number;
        }
        else if(scope.countryCode == "+33") {
          switch(value.length) { 
            case 10:
              country = "33";
              number = value.slice(0,1) + " " + value.slice(1,4) + " " + value.slice(4,6) + " " + value.slice(6,8) + " " + value.slice(8);
              break;
            default:
              return tel;
          }
          return country + " " + number;
        }
    };
});
