<?php 

	echo "圓面積:";
	define("PI",3.14);
	$r = 10;
	$circle_area = $r*$r*PI;
	echo $circle_area;
	echo '<br>'; 

    echo "目前系統php版本: ";
    echo PHP_VERSION; 
    echo '<br>'; 

    echo "目前server os版本: ";
    echo PHP_OS; 
    echo '<br>'; 

    echo "目前執行檔案的路徑: ";
    echo $_SERVER['SCRIPT_FILENAME']; 
    echo '<br>'; 

    echo "目前網頁的虛擬路徑: ";
    echo $_SERVER['PHP_SELF'];
    echo '<br>';

    echo "目前網頁的server位置: ";
    echo $_SERVER['HTTP_HOST'];

?>