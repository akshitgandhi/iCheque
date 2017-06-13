<?php
header("Access-Control-Allow-Origin: *");
$mobile=$_POST['receiver'];
$receivervpa=$_POST['receivervpa'];//receiver data
$id=$_POST['c_no'];     //cheque id
$date=date("Y/m/d");

require_once('config.php');

$sql="select sendervpa,amount,receiver,date,status,type,remarks from cheque where id=$id and receiver='$mobile'";
$result = mysqli_query($conn, $sql) or die('die');


$result_array=array();


if(mysqli_num_rows($result)==1)
{
        $row = $result->fetch_assoc();
        $value = (((strtotime($date)-strtotime($row["date"]))/(60*60*24)));
//      echo $value;
//      echo ($value>=0&&$value<=90);
    if($row["status"]==1){
//      echo "here";
        $row_array['valid']=0;
    }elseif($value>=0 && $value<=90){
        $row_array['valid']=1;
        //success now process transaction
        $sendervpa=$row["sendervpa"];
        $sql="select custid from customer where vpa='$sendervpa'";
        $result1 = mysqli_query($conn, $sql) or die('die');
        $row1 = $result1->fetch_assoc();
//      echo "python vpa_transfer.py ".$row1["custid"]." ".$sendervpa." ".$receivervpa." ".$row["amount"]." ".$row["remarks"];
        $output = exec("python vpa_transfer.py ".$row1["custid"]." ".$sendervpa." ".$receivervpa." ".$row["amount"]." ".$row["remarks"]);
//      echo "output of python: ".$output;
        if(strcmp($output,"Error")==0){
        $row_array['transaction_id']=2;
        }else{
        $row_array['transaction_id']=$output;
        $sql="update cheque set status=1 where id=$id and receiver='$mobile'";
        $result = mysqli_query($conn, $sql) or die('die');
//      echo "Transaction done";
        }
    }else{
//      echo "here1";
        $row_array['valid']=0;
    }
}
else
{
//      echo "here2";
     $row_array['valid']=0;
}

     array_push($result_array,$row_array);

echo json_encode($result_array);

?>
