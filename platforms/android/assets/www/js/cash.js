var app=angular.module('cashApp',[]);
function isValidMobileNumber(number)
{
	var mobileRegex=/^[789]\d{9}$/;
	return mobileRegex.test(number);
}

function isValidAmount(amount,confamount)
{	if(amount>0){
	return amount==confamount;
}else{
	return false;
}
}
app.controller('cashController',function($scope,$http,$window)
{
	//window.alert('HI');
	$scope.cashCode=function()
	{	//added for animation
		document.getElementById('id01').style.display='block';
		var mobile=jQuery.trim($('#textfield-MobileNo').val());
		//alert(mobile);
		var chequeno=jQuery.trim($('#textfield-ChequeNo').val());
		//alert(amount);
		var storage1 = window.localStorage;
      	var sendervpa = storage1.getItem("vpa");
		var valid=true;
		//alert(sendervpa+sendervpa.includes(mobile));
		if(mobile=='' || chequeno=='')
		{
			//---
			valid=false;
		}
		if(sendervpa.includes(mobile)==false){
			valid=false;
			//alert("fail");
		}
		else
		{
			valid=true;
			//alert("pass");
			var a=isValidMobileNumber(mobile);
		if(a==true)
		{
			valid=true;
		}
		else
		{
			valid=false;
		}
		}
		
		if(valid==true)
		{
			 //window.alert("Posting Data");
			 //window.alert(ipin);
			$http({
          method  : 'POST',
          url     : 'http://139.59.79.171/icici/web_cash.php',
          data    :$.param({'c_no':chequeno,'receiver':mobile,'receivervpa':sendervpa}), //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
       .then(function (response) {
       	var aaa=(JSON.stringify(response.data));
       	//alert(aaa);
  			if(response.data[0].valid=="0")
  			{
  				//window.alert('unsuccessful');
  				document.getElementById('heading').innerHTML='Transaction Failed';
  				document.getElementById('plswait').innerHTML="Sorry the cheque number you've entered seems expired or you are not authorised to deposit this cheque in your account";
  				document.getElementById('circle').style.display='none';
  				document.getElementById('share').style.display='none';
  				//$('.incorrect').removeClass('display');
  			}
  			else if(response.data[0].valid=="1")
  			{
  				//window.alert('Successful');
  				$('.circle-loader').toggleClass('load-complete');
  				$('.checkmark').toggle();

  				document.getElementById('heading').innerHTML='Successful';
  				document.getElementById('plswait').innerHTML='Congratulations, the  Transaction was successful and please note the Code:-<strong>'+response.data[0].otp+'</strong><br>Note: You can oly withdraw upto INR 1 Lakh using this code';
  				document.getElementById('circle').style.display='none';
  				//$window.location.href='./Homepage.php';
  			}else if(response.data[0].valid=="2")
  			{
  				//window.alert('Successful');
  				$('.circle-loader').toggleClass('load-complete');
  				$('.checkmark').toggle();

  				document.getElementById('heading').innerHTML='Transaction Failed';
  				document.getElementById('plswait').innerHTML='The transaction was unsuccessful because this cheque has already been cashed';
  				document.getElementById('circle').style.display='none';
  				//$window.location.href='./Homepage.php';
  			}
  			else if(response.data[0].valid=="3")
  			{
  				//window.alert('unsuccessful');
  				document.getElementById('heading').innerHTML='Transaction Failed';
  				document.getElementById('plswait').innerHTML="Sorry the cheque number you've entered is already processed";
  				document.getElementById('circle').style.display='none';
  				document.getElementById('share').style.display='none';
  				//$('.incorrect').removeClass('display');
  			}
  			else if(response.data[0].valid=="4")
  			{
  				//window.alert('unsuccessful');
  				document.getElementById('heading').innerHTML='Transaction Failed';
  				document.getElementById('plswait').innerHTML="Sorry the cheque number you've entered is not a bearer cheque";
  				document.getElementById('circle').style.display='none';
  				document.getElementById('share').style.display='none';
  				//$('.incorrect').removeClass('display');
  			}
  		}); 
		}
		else{
			document.getElementById('heading').innerHTML='Unsuccessful';
  			document.getElementById('plswait').innerHTML="There's a problem with the data you've entered please try again";
  			document.getElementById('circle').style.display='none';
  			document.getElementById('share').style.display='none';
		}
	}
});