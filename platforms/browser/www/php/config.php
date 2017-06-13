<?php


//FOR connecting with database
$mysql_host = 'localhost';
$mysql_user ='root';
$mysql_pass = 'thephenominal';
$mysql_database = 'icici';
$conn_error = "could not connect";

$conn = mysqli_connect($mysql_host,$mysql_user,$mysql_pass);
if(@!mysqli_connect($mysql_host,$mysql_user,$mysql_pass)||@!mysqli_select_db($conn,$mysql_database))
   die($conn_error);


?>