<?php
header("Access-Control-Allow-Origin: *");
$mobile=$_POST['mobile'];
$type=$_POST['type'];
$date=$_POST['date'];
$amount=$_POST['amount'];
$remarks=$_POST['remarks'];
$sendervpa=$_POST['sendervpa'];
// $mobile='7977713283';
// $ipin=9999;
//var_dump($mobile);
require_once('config.php');

$sql="insert into cheque (type,date,sendervpa,receiver,amount,remarks) values ('$type','$date','$sendervpa','$mobile','$amount','$remarks')";
$result = mysqli_query($conn, $sql) or die('die');
$sql="select id from cheque where type='$type' and date='$date' and sendervpa='$sendervpa' and receiver='$mobile' and amount='$amount' and remarks='$remarks'";
$result = mysqli_query($conn, $sql) or die('die');
$result_array=array();

if(mysqli_num_rows($result)==1)
{
        $row_array['valid']=1;
        $row = $result->fetch_assoc();
        $row_array['id']=$row["id"];
}
else
{
     $row_array['valid']=0;
}

     array_push($result_array,$row_array);

 echo json_encode($result_array);

?>
