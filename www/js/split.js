var app=angular.module('splitApp',[]);
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
app.controller('splitController',function($scope,$http,$window)
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
      var payee1=jQuery.trim($('#textfield-MobileNo1').val());
      var payee2=jQuery.trim($('#textfield-MobileNo2').val());
      var amt1=jQuery.trim($('#textfield-ConfAmount1').val());
      var amt2=jQuery.trim($('#textfield-ConfAmount2').val());
      var chqno = 2100;
      var amt = amt1+amt2;
			document.getElementById('heading').innerHTML='Successful';
      document.getElementById('plswait').innerHTML='Congratulations, the  Transaction was successful and please note the Cheque number for Payee1:-<strong>'+chqno+'</strong> Amount is:-<strong>'+amt1+'</strong><br>and details for Payee2 Cheque No:-<strong>'+(chqno+1)+'</strong> and Amount is:-<strong>'+amt2+'</strong>';
      document.getElementById('circle').style.display='none';
		}
		else{
			document.getElementById('heading').innerHTML='Unsuccessful';
  			document.getElementById('plswait').innerHTML="There's a problem with the data you've entered please try again";
  			document.getElementById('circle').style.display='none';
  			document.getElementById('share').style.display='none';
		}
	}
});