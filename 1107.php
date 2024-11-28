<?php
echo "兩參數相加 ，使用include引入 <br/>";
include("add.php");
echo 5," + ",3," = ",add(5,3),"<br />";

echo "兩參數相減 ，使用require引入 <br/>";
require("sub.php");
echo 8," - ",5," = ",sub(8,5);
?>


