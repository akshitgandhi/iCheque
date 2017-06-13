var app=angular.module('generateChequeApp',[]);
function isValidMobileNumber(number)
{
	var mobileRegex=/^[789]\d{9}$/;
	return mobileRegex.test(number);
}

function isValidAmount(amount,confamount)
{	if(amount>=0){
	return amount==confamount;
}else{
	return false;
}
}
app.controller('generateChequeController',function($scope,$http,$window)
{
	//window.alert('HI');
	$scope.generate=function()
	{	//added for animation
		document.getElementById('id01').style.display='block';
		var $radio = $('input[name=c_type]:checked');
		var radio_value = $radio.val();
		//alert(radio_value);
		var date=jQuery.trim($('#date_cheque').val());
		//alert(date);
		var mobile=jQuery.trim($('#textfield-MobileNo').val());
		//alert(mobile);
		var amount=jQuery.trim($('#textfield-Amount').val());
		//alert(amount);
		var confamount=jQuery.trim($('#textfield-ConfAmount').val());
		//alert(confamount);
		var remarks=jQuery.trim($('#textfield-Remarks').val());
		//alert(remarks);
		var storage1 = window.localStorage;
      	var sendervpa = storage1.getItem("vpa");
		var valid=true;
		if(mobile=='' || amount=='' || radio_value=='' || date=='' || confamount=='' || remarks=="")
		{
			//---
			valid=false;
		}
		else
		{
			valid=true;
		}
		var a=isValidMobileNumber(mobile);
		var b=isValidAmount(amount,confamount);
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
			 //window.alert("Posting Data");
			 //window.alert(ipin);
			$http({
          method  : 'POST',
          url     : 'http://139.59.79.171/icici/web_cheque.php',
          data    :$.param({'type':radio_value,'date':date,'mobile':mobile,'amount':amount,'remarks':remarks,'sendervpa':sendervpa}), //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
       .then(function (response) {
       	var aaa=(JSON.stringify(response.data));
       	//alert(aaa);
  			if(response.data[0].valid=="0")
  			{
  				//window.alert('unsuccessful');
  				var i=0;
  				while(i<10000000){
  					i++;
  				}
  				document.getElementById('heading').innerHTML='Unsuccessful';
  				document.getElementById('plswait').innerHTML='Sorry there was some problem, please try again later';
  				document.getElementById('circle').style.display='none';
  				document.getElementById('share').style.display='none';
  				//$('.incorrect').removeClass('display');
  			}
  			else if(response.data[0].valid=="1")
  			{
  				//window.alert('Successful');
  				var i=0;
  				while(i<10000000){
  					i++;
  				}
  				$('.circle-loader').toggleClass('load-complete');
  				$('.checkmark').toggle();
  				var mobileno = response.data[0].receiver;
  				
  				document.getElementById('heading').innerHTML='Transaction Successful';
  				document.getElementById('plswait').innerHTML='Congratulations, the generated cheque number is:-<strong>'+response.data[0].id+'</strong>'+' for Amount of:-<strong>'+response.data[0].amount+'</strong> <br>'+" The Payee mobile number registered with us is:"+"xxxxxx"+mobileno.substring(6,10)+'<br>You will shortly receive an SMS regarding the same, now you can share this cheque with the recipient!';
  				document.getElementById('circle').style.display='none';
  				var result = encodeURI("Hi, here's your cheque for INR:"+response.data[0].amount+" and the Cheque No. is:"+response.data[0].id+" The Payee mobile number registered with us is:"+"xxxxxx"+mobileno.substring(6,10)+" You can use either iCheque App/Website/go to ATM to withdraw cash or go to your bank Branch! Download iCheque App now!");
  				result = "whatsapp://send?text="+result;
  				document.getElementById('whatsapp').href=result;
  				//$window.location.href='./Homepage.php';
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