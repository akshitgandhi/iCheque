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
    }elseif($value>=0 && $value<=90 && $row["type"]=="c"){
        $row_array['valid']=1;
        //success now process transaction
        $sql="select status,otp from cash where id=$id";
        $result2 = mysqli_query($conn, $sql) or die('die');
        if($result2){
            //means that this cheque is already requested for cash transaction
            $row2 = $result2->fetch_assoc();
            if($row2["status"]==0){
                $row_array['otp']=$row2["otp"];
            }else{
                $row_array['valid']=2;
                // meaning this cheque has already been cashed
            }
        }else{
            //new entry for database
            $otp = substr(number_format(time() * rand(),0,'',''),0,6);
            $sql="insert into cash (id,otp) values ($id,$otp)";
            $result3 = mysqli_query($conn, $sql) or die('die');
            $row_array['otp']=$otp;
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
