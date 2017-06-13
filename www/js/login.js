var app=angular.module('loginApp',[]);
function isValidMobileNumber(number)
{
	var mobileRegex=/^[789]\d{9}$/;
	return mobileRegex.test(number);
}

function isValidipin(ipin)
{
	var ipinRegex=/^\d{4}$/;
	return ipinRegex.test(ipin);
}
app.controller('loginController',function($scope,$http,$window)
{
	//window.alert('HI');
	$scope.login=function()
	{	
		document.getElementById("loginbutton").disabled = true;
		var mobile=jQuery.trim($('#sample1').val());
		var ipin=jQuery.trim($('#sample2').val());
		var valid=true;
		if(mobile=='' || ipin=='')
		{
			//---
			valid=false;
		}
		else
		{
			valid=true;
		}
		var a=isValidMobileNumber(mobile);
		var b=isValidipin(ipin);
		if(a==true && b==true)
		{
			valid=true;
		}
		else
		{
			valid=false;
		}
		if(valid==true)
		{
			 //window.alert(mobile);
			 //window.alert(ipin);
			$http({
          method  : 'POST',
          url     : 'http://139.59.79.171/icici/web_login.php',
          data    :$.param({'mobile':mobile,'ipin':ipin}), //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
       .then(function (response) {
       	var aaa=(JSON.stringify(response.data));
       	//alert(aaa);
  			if(response.data[0].valid=="0")
  			{
  				window.alert('unsuccessful');
  				document.getElementById("loginbutton").disabled = false;
  				//$('.incorrect').removeClass('display');
  			}
  			else if(response.data[0].valid=="1")
  			{
  				var storage = window.localStorage;
  				storage.setItem("Loggedin", "1")
  				//window.alert('Successful');
  				storage.setItem("vpa",response.data[0].mobileno);
  				window.location="homepage.html";
  				//$window.location.href='./Homepage.php';
  			}
  		}); 
		}else{
			document.getElementById("loginbutton").disabled = false;
		}
	}
});