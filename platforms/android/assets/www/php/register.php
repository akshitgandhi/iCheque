<?php
header("Access-Control-Allow-Origin: *");
$mobile=$_POST['mobile'];
$ipin=$_POST['ipin'];
// $mobile='7977713283';
// $ipin=9999;
//var_dump($mobile);
require_once('config.php');

$sql="select registered_status from customer where mobileno='$mobile'";
$result = mysqli_query($conn, $sql) or die('die');


$result_array=array();

if(mysqli_num_rows($result)==1)
{
        $row = $result->fetch_assoc();
        if($row["registered_status"]==1){
                //user already registered
        $row_array['valid']=0;
        }else{
//        echo "New password";
        $sql="update customer set ipin=$ipin, registered_status=1  where mobileno='$mobile'";
//        echo $sql;
        $result = mysqli_query($conn, $sql) or die('die');
        $row_array['hello']=1;
        }
}
else
{
     $row_array['valid']=0;
}

     array_push($result_array,$row_array);

 echo json_encode($result_array);

?>
