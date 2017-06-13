<?php
$mobile=$_POST['mobile'];
$ipin=$_POST['ipin'];

// $mobile='7777777777';
// $ipin=0000;
//var_dump($mobile);
require_once('config.php');

$sql="select mobileno,ipin from customer where mobileno='$mobile' and ipin=$ipin";
$result = mysqli_query($conn, $sql) or die('die');


$result_array=array();

if(mysqli_num_rows($result)==1)
{
	$row_array['valid']=1;
    
    
}
else
{
     $row_array['valid']=0;
}
     
     array_push($result_array,$row_array);

 echo json_encode($result_array);

?>